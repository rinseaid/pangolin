import Redis, { RedisOptions } from "ioredis";
import logger from "@server/logger";
import config from "@server/lib/config";
import { build } from "@server/build";

class RedisManager {
    public client: Redis | null = null;
    private subscriber: Redis | null = null;
    private publisher: Redis | null = null;
    private isEnabled: boolean = false;
    private isHealthy: boolean = true;
    private lastHealthCheck: number = 0;
    private healthCheckInterval: number = 30000; // 30 seconds
    private subscribers: Map<
        string,
        Set<(channel: string, message: string) => void>
    > = new Map();

    constructor() {
        if (build == "oss") {
            this.isEnabled = false;
        } else {
            this.isEnabled = config.getRawConfig().flags?.enable_redis || false;
        }
        if (this.isEnabled) {
            this.initializeClients();
        }
    }

    private getRedisConfig(): RedisOptions {
        const redisConfig = config.getRawConfig().redis!;
        const opts: RedisOptions = {
            host: redisConfig.host!,
            port: redisConfig.port!,
            password: redisConfig.password,
            db: redisConfig.db,
            // tls: {
            //     rejectUnauthorized:
            //         redisConfig.tls?.reject_unauthorized || false
            // }
        };
        return opts;
    }

    // Add reconnection logic in initializeClients
    private initializeClients(): void {
        const config = this.getRedisConfig();

        try {
            this.client = new Redis({
                ...config,
                enableReadyCheck: false,
                maxRetriesPerRequest: 3,
                keepAlive: 30000,
                connectTimeout: 10000, // 10 seconds
                commandTimeout: 5000,  // 5 seconds
            });

            this.publisher = new Redis({
                ...config,
                enableReadyCheck: false,
                maxRetriesPerRequest: 3,
                keepAlive: 30000,
                connectTimeout: 10000, // 10 seconds
                commandTimeout: 5000,  // 5 seconds
            });

            this.subscriber = new Redis({
                ...config,
                enableReadyCheck: false,
                maxRetriesPerRequest: 3,
                keepAlive: 30000,
                connectTimeout: 10000, // 10 seconds
                commandTimeout: 5000,  // 5 seconds
            });

            // Add reconnection handlers
            this.client.on("error", (err) => {
                logger.error("Redis client error:", err);
                this.isHealthy = false;
            });

            this.client.on("reconnecting", () => {
                logger.info("Redis client reconnecting...");
                this.isHealthy = false;
            });

            this.client.on("ready", () => {
                logger.info("Redis client ready");
                this.isHealthy = true;
            });

            this.publisher.on("error", (err) => {
                logger.error("Redis publisher error:", err);
                this.isHealthy = false;
            });

            this.publisher.on("ready", () => {
                logger.info("Redis publisher ready");
            });

            this.subscriber.on("error", (err) => {
                logger.error("Redis subscriber error:", err);
                this.isHealthy = false;
            });

            this.subscriber.on("ready", () => {
                logger.info("Redis subscriber ready");
            });

            // Set up connection handlers
            this.client.on("connect", () => {
                logger.info("Redis client connected");
            });

            this.publisher.on("connect", () => {
                logger.info("Redis publisher connected");
            });

            this.subscriber.on("connect", () => {
                logger.info("Redis subscriber connected");
            });

            // Set up message handler for subscriber
            this.subscriber.on(
                "message",
                (channel: string, message: string) => {
                    const channelSubscribers = this.subscribers.get(channel);
                    if (channelSubscribers) {
                        channelSubscribers.forEach((callback) => {
                            try {
                                callback(channel, message);
                            } catch (error) {
                                logger.error(
                                    `Error in subscriber callback for channel ${channel}:`,
                                    error
                                );
                            }
                        });
                    }
                }
            );

            logger.info("Redis clients initialized successfully");

            // Start periodic health monitoring
            this.startHealthMonitoring();
        } catch (error) {
            logger.error("Failed to initialize Redis clients:", error);
            this.isEnabled = false;
        }
    }

    private startHealthMonitoring(): void {
        if (!this.isEnabled) return;
        
        // Check health every 30 seconds
        setInterval(async () => {
            try {
                await this.checkRedisHealth();
            } catch (error) {
                logger.error("Error during Redis health monitoring:", error);
            }
        }, this.healthCheckInterval);
    }

    public isRedisEnabled(): boolean {
        return this.isEnabled && this.client !== null && this.isHealthy;
    }

    private async checkRedisHealth(): Promise<boolean> {
        const now = Date.now();
        
        // Only check health every 30 seconds
        if (now - this.lastHealthCheck < this.healthCheckInterval) {
            return this.isHealthy;
        }

        this.lastHealthCheck = now;

        if (!this.client) {
            this.isHealthy = false;
            return false;
        }

        try {
            await Promise.race([
                this.client.ping(),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Health check timeout')), 2000)
                )
            ]);
            this.isHealthy = true;
            return true;
        } catch (error) {
            logger.error("Redis health check failed:", error);
            this.isHealthy = false;
            return false;
        }
    }

    public getClient(): Redis {
        return this.client!;
    }

    public async set(
        key: string,
        value: string,
        ttl?: number
    ): Promise<boolean> {
        if (!this.isRedisEnabled() || !this.client) return false;

        try {
            if (ttl) {
                await this.client.setex(key, ttl, value);
            } else {
                await this.client.set(key, value);
            }
            return true;
        } catch (error) {
            logger.error("Redis SET error:", error);
            return false;
        }
    }

    public async get(key: string): Promise<string | null> {
        if (!this.isRedisEnabled() || !this.client) return null;

        try {
            return await this.client.get(key);
        } catch (error) {
            logger.error("Redis GET error:", error);
            return null;
        }
    }

    public async del(key: string): Promise<boolean> {
        if (!this.isRedisEnabled() || !this.client) return false;

        try {
            await this.client.del(key);
            return true;
        } catch (error) {
            logger.error("Redis DEL error:", error);
            return false;
        }
    }

    public async sadd(key: string, member: string): Promise<boolean> {
        if (!this.isRedisEnabled() || !this.client) return false;

        try {
            await this.client.sadd(key, member);
            return true;
        } catch (error) {
            logger.error("Redis SADD error:", error);
            return false;
        }
    }

    public async srem(key: string, member: string): Promise<boolean> {
        if (!this.isRedisEnabled() || !this.client) return false;

        try {
            await this.client.srem(key, member);
            return true;
        } catch (error) {
            logger.error("Redis SREM error:", error);
            return false;
        }
    }

    public async smembers(key: string): Promise<string[]> {
        if (!this.isRedisEnabled() || !this.client) return [];

        try {
            return await this.client.smembers(key);
        } catch (error) {
            logger.error("Redis SMEMBERS error:", error);
            return [];
        }
    }

    public async hset(
        key: string,
        field: string,
        value: string
    ): Promise<boolean> {
        if (!this.isRedisEnabled() || !this.client) return false;

        try {
            await this.client.hset(key, field, value);
            return true;
        } catch (error) {
            logger.error("Redis HSET error:", error);
            return false;
        }
    }

    public async hget(key: string, field: string): Promise<string | null> {
        if (!this.isRedisEnabled() || !this.client) return null;

        try {
            return await this.client.hget(key, field);
        } catch (error) {
            logger.error("Redis HGET error:", error);
            return null;
        }
    }

    public async hdel(key: string, field: string): Promise<boolean> {
        if (!this.isRedisEnabled() || !this.client) return false;

        try {
            await this.client.hdel(key, field);
            return true;
        } catch (error) {
            logger.error("Redis HDEL error:", error);
            return false;
        }
    }

    public async hgetall(key: string): Promise<Record<string, string>> {
        if (!this.isRedisEnabled() || !this.client) return {};

        try {
            return await this.client.hgetall(key);
        } catch (error) {
            logger.error("Redis HGETALL error:", error);
            return {};
        }
    }

    public async publish(channel: string, message: string): Promise<boolean> {
        if (!this.isRedisEnabled() || !this.publisher) return false;

        // Quick health check before attempting to publish
        const isHealthy = await this.checkRedisHealth();
        if (!isHealthy) {
            logger.warn("Skipping Redis publish due to unhealthy connection");
            return false;
        }

        try {
            // Add timeout to prevent hanging
            await Promise.race([
                this.publisher.publish(channel, message),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Redis publish timeout')), 3000)
                )
            ]);
            return true;
        } catch (error) {
            logger.error("Redis PUBLISH error:", error);
            this.isHealthy = false; // Mark as unhealthy on error
            return false;
        }
    }

    public async subscribe(
        channel: string,
        callback: (channel: string, message: string) => void
    ): Promise<boolean> {
        if (!this.isRedisEnabled() || !this.subscriber) return false;

        try {
            // Add callback to subscribers map
            if (!this.subscribers.has(channel)) {
                this.subscribers.set(channel, new Set());
                // Only subscribe to the channel if it's the first subscriber
                await Promise.race([
                    this.subscriber.subscribe(channel),
                    new Promise((_, reject) => 
                        setTimeout(() => reject(new Error('Redis subscribe timeout')), 5000)
                    )
                ]);
            }

            this.subscribers.get(channel)!.add(callback);
            return true;
        } catch (error) {
            logger.error("Redis SUBSCRIBE error:", error);
            this.isHealthy = false;
            return false;
        }
    }

    public async unsubscribe(
        channel: string,
        callback?: (channel: string, message: string) => void
    ): Promise<boolean> {
        if (!this.isRedisEnabled() || !this.subscriber) return false;

        try {
            const channelSubscribers = this.subscribers.get(channel);
            if (!channelSubscribers) return true;

            if (callback) {
                // Remove specific callback
                channelSubscribers.delete(callback);
                if (channelSubscribers.size === 0) {
                    this.subscribers.delete(channel);
                    await this.subscriber.unsubscribe(channel);
                }
            } else {
                // Remove all callbacks for this channel
                this.subscribers.delete(channel);
                await this.subscriber.unsubscribe(channel);
            }

            return true;
        } catch (error) {
            logger.error("Redis UNSUBSCRIBE error:", error);
            return false;
        }
    }

    public async disconnect(): Promise<void> {
        try {
            if (this.client) {
                await this.client.quit();
                this.client = null;
            }
            if (this.publisher) {
                await this.publisher.quit();
                this.publisher = null;
            }
            if (this.subscriber) {
                await this.subscriber.quit();
                this.subscriber = null;
            }
            this.subscribers.clear();
            logger.info("Redis clients disconnected");
        } catch (error) {
            logger.error("Error disconnecting Redis clients:", error);
        }
    }
}

export const redisManager = new RedisManager();
export const redis = redisManager.getClient();
export default redisManager;

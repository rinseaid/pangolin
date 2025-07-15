import { MemoryStore, Store } from "express-rate-limit";
import config from "./config";
import redisManager from "@server/db/redis";
import { RedisStore } from "rate-limit-redis";

export function createStore(): Store {
    let rateLimitStore: Store = new MemoryStore();
    if (config.getRawConfig().flags?.enable_redis) {
        const client = redisManager.client!;
        rateLimitStore = new RedisStore({
            sendCommand: async (command: string, ...args: string[]) =>
                (await client.call(command, args)) as any
        });
    }
    return rateLimitStore;
}

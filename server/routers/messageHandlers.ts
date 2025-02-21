import { handleRegisterMessage } from "./newt";
import { handleGetConfigMessage } from "./newt/handleGetConfigMessage";
import { MessageHandler } from "./ws";

export const messageHandlers: Record<string, MessageHandler> = {
    "newt/wg/register": handleRegisterMessage,
    "newt/wg/get-config": handleGetConfigMessage,
};

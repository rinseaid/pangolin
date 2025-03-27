import { handleNewtRegisterMessage, handleReceiveBandwidthMessage } from "./newt";
import { handleOlmRegisterMessage } from "./olm";
import { handleGetConfigMessage } from "./newt/handleGetConfigMessage";
import { MessageHandler } from "./ws";

export const messageHandlers: Record<string, MessageHandler> = {
    "newt/wg/register": handleNewtRegisterMessage,
    "olm/wg/register": handleOlmRegisterMessage,
    "newt/wg/get-config": handleGetConfigMessage,
    "newt/receive-bandwidth": handleReceiveBandwidthMessage
};

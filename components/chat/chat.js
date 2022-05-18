import { Component, type } from "can";
import chatStache from "./chat.stache";

const Chat = Component.extend({
	tag: "shipments-chat",
	view: chatStache
});

export default Chat;

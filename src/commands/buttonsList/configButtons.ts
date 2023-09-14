import { ButtonInteraction } from "discord.js";
import BaseButtons from "../baseButtons";

export default class ConfigButtons extends BaseButtons{
    public readonly name = "config";
    public async execute(command: ButtonInteraction){
        command.channel?.send("config")
    }
}
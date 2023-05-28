import BaseCommand from "../baseCommands";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";


export default class Ping extends BaseCommand {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("renvoie pong")
   

  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    await command.reply("Pong !")
  }

}
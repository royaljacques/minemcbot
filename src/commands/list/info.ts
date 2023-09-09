import BaseCommand from "../baseCommands";
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandsType } from "../baseCommands";
import { getLanguage } from "../../util/language";
import Index from "../../minemc";
import { Guild } from "discord.js";
export default class Ping extends BaseCommand {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("info")
    .setDescription("bot info");
  
  public readonly help = {
    "name": "info",
    "description": "bot info", 
    "category": CommandsType.MISC
  }
  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    
  }
}


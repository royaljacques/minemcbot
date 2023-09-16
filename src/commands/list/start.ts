import BaseCommand from "../baseCommands";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandsType } from "../baseCommands";

export default class Ping extends BaseCommand {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("start")
    .setDescription("start the adventure");

  public readonly help = {
    "name": "start",
    "description": "start adventure",
    "category": CommandsType.GAMEPLAY
  }
  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    await command.reply("pong");
  }
}
/**
 * 
const item = await prisma.tools.create({
      data: {
        type: ToolType.PICKAXE
      }
    })
 */
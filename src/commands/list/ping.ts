import BaseCommand from "../baseCommands";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandsType } from "../baseCommands";

export default class Ping extends BaseCommand {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("renvoie pong");

  public readonly help = {
    "name": "ping",
    "description": "renvoie pong",
    "category": CommandsType.FUN
  }
  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    await command.reply({ content: "Pong !", ephemeral: true })
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
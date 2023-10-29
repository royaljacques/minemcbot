import BaseCommand from "../baseCommands";
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandsType } from "../baseCommands";
import Index from "../../minemc";

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
    command.reply('pinging').then(m => {
      const embed = new EmbedBuilder()
        .setTitle("bot latency")
        .setFields({
          name: "latency",
          value: `${m.createdTimestamp - command.createdTimestamp}ms`,
        }, {
          name: "api latency",
          value: `${Math.round(Index.instance.ws.ping)}ms`,
        });
      m.edit({ embeds: [embed] });
    });
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
import BaseCommand from "../baseCommands";
import { APIActionRowComponent, ActionRowBuilder, AnyComponentBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandsType } from "../baseCommands";

export default class Ping extends BaseCommand {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("test")
    .setDescription("simple commande pour tester");

  public readonly help = {
    "name": "test",
    "description": "simple commande pour tester",
    "category": CommandsType.MODERATION
  }
  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    const button: ButtonBuilder = new ButtonBuilder()
        .setCustomId("config")
        .setLabel("config")
        .setStyle(ButtonStyle.Danger);
    const row = new ActionRowBuilder().addComponents(button);
    await command.reply(
        {content: "test", components: [row]
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
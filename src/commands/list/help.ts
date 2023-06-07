import BaseCommand from "../baseCommands";
import { ActionRowBuilder, ChatInputCommandInteraction, Collection, Colors, ComponentType, EmbedBuilder, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { CommandsType } from "../baseCommands";
import CommandLoader from "../commandLoader";

export default class Help extends BaseCommand {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("help")
    .setDescription("see all commands");
  public readonly help = {
    "name": "help",
    "description": "see all commands", 
    "category": CommandsType.MISC
  }
  public async execute(command: ChatInputCommandInteraction) : Promise<void> {

    const select = new StringSelectMenuBuilder()
			.setCustomId('starter')
			.setPlaceholder('Make a selection!')
			.addOptions(
				Array.from(CommandLoader.helpCommandStorages.entries()).map(([key]) => {
          return new StringSelectMenuOptionBuilder()
          .setLabel(key)
          .setValue(key)
        })
          
			);
		const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);

		const response = await command.reply({
			content: 'Choose your starter!',
			components: [row],
      ephemeral: true
		});
    const collectorFilter = (i: {user: {id: string}}) => i.user.id === command.user.id;
    try {
      const confirmation = response.createMessageComponentCollector({ filter: collectorFilter, time: 60000 , componentType: ComponentType.StringSelect});
     confirmation.on('collect', async i => {
        const value = i.values[0];
        const newEmebed = new EmbedBuilder()
          .setTitle("Help **" + value + "**")
          .setColor(Colors.Green)
          .setDescription(
            (CommandLoader.helpCommandStorages.get(value) ?? new Collection<string, string>())
              .map((value: string, key: string) => `**${key}** : ${value}`)
              .join("\n")
          );
        command.editReply({ embeds: [newEmebed], components: [] });
     });
    } catch (e) {
      await command.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
    }
  }
}
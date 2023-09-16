import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType } from "discord.js";
import BaseButtons from "../baseButtons";
import { sendSetupOnlyChannel } from "../../util/configServer";


export default class ConfigButtons extends BaseButtons{
    public readonly name = "config";
    public async execute(command: ButtonInteraction){

        const success: ButtonBuilder = new ButtonBuilder()
            .setCustomId("config:yes")
            .setLabel("yes")
            .setStyle(ButtonStyle.Success);
            
        const no: ButtonBuilder = new ButtonBuilder()
            .setCustomId("config:no")
            .setLabel("no")
            .setStyle(ButtonStyle.Danger);

        const row: any = new ActionRowBuilder<ButtonBuilder>().addComponents(success, no);
        

        command.reply({content: "do you would like to configure your server ?", ephemeral: true, components: [row], fetchReply: true}).then(() => {
            command.channel?.awaitMessageComponent({
                filter: (i) => i.user.id === command.user.id && (i.isButton()),
                time: 60000
              }).then((interaction) => {
                if (interaction.isButton()) {
                  if (interaction.customId === 'config:yes') {
                    sendSetupOnlyChannel(interaction);
                  } else {
                    command.followUp({ content: 'no', ephemeral: true });
                  }
                } 
              });
        });
    }
}
import { BaseSelectMenuBuilder, ButtonInteraction, ChannelType, Collector, Message, StringSelectMenuBuilder, TextChannel } from 'discord.js';
import Index, { prisma } from "../minemc"
import { ActionRowBuilder, ButtonBuilder,ButtonStyle } from "discord.js";
import { serverConfig } from "@prisma/client";
import { ErrorLineMessages, ErrorMessages } from "./function";
export const sendSetupOnlyChannel  = async (interaction: ButtonInteraction) =>{
    prisma.serverConfig.findFirst({where: {serverId: interaction.guildId?.toString()}}).then(async (config) => {
        let conf: serverConfig | null = null;
        if(config === null){
            if(interaction.guildId === null){
                return;
            }
            conf = await prisma.serverConfig.create({
                data: {
                    serverId: interaction.guildId.toString(),
                }
            })
        }else{
            conf = await prisma.serverConfig.findUnique({where: {serverId: interaction.guildId?.toString()}})
            
        }
        const TextChannel: {name: string, id: string}[] | undefined= interaction.guild?.channels.cache.filter((channel) => channel.type === ChannelType.GuildText).map((channel) => {
            return {
                name: channel.name,
                id: channel.id
            } as {name: string, id: string}
        });
        if(TextChannel === undefined){
            return;
        }
        
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("config:listchannel")
            .setPlaceholder("Selectionner un channel");
        TextChannel.forEach((channel) => {
                selectMenu.addOptions({label: channel.name, value: channel.id});
            });
        const actionRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents([selectMenu])
        interaction.reply({content: "Selectionner un channel", components: [actionRow]}).then(() => {
            interaction.channel?.awaitMessageComponent({
                filter: (i) => i.user.id === interaction.user.id && (i.isAnySelectMenu()),
                time: 60000
                }).then(async (interaction) => {
                    if (interaction.isAnySelectMenu()) {
                        const channel = interaction.values[0];
                        if(channel === undefined){
                            return;
                        }
                        const channelName = interaction.guild?.channels.cache.get(channel)?.name;
                        if(channelName === undefined){
                            return;
                        }
                        await prisma.serverConfig.update({
                            where: {
                                serverId: interaction.guildId?.toString()
                            },
                            data: {
                                channel: channel,
                                onlyChannel: true
                            }
                        })
                        interaction.reply({content: `the  channel ${channelName} have been selectionned`, ephemeral: true});
                    } 
                });
            });
        }
    )
}

  /*
     console.log(ia)
        const err =  new Error();
        (await Index.instance.getLoggerChannel()).send({embeds: [ErrorLineMessages(err, "problème")]});
        */
    
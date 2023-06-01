import BaseCommand from "../baseCommands";
import { ActionRowBuilder, ChatInputCommandInteraction, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { CommandsType } from "../baseCommands";
import { prisma } from "../..";
import { EmbedErrorLogger, ErrorMessages } from "../../util/function";
import { Prisma } from "@prisma/client";

export default class Start extends BaseCommand {

    public readonly slashCommand = new SlashCommandBuilder()
        .setName("start")
        .setDescription("starts the game");

    public readonly help = {
        "name": "start",
        "description": "starts the game",
        "category": CommandsType.GAMEPLAY
    }

    public async execute(command: ChatInputCommandInteraction): Promise<void> {
        const player = await prisma.player.findUnique({
            where: {
                discordId: command.user.id
            }
        })
        if (player === null) {
            const modal = new ModalBuilder()
                .setCustomId('myModal')
                .setTitle('My Modal');
            const favoriteColorInput = new TextInputBuilder()
                .setCustomId('game:start:pseudo')
                .setLabel("what nickname would you like to have?")
                .setStyle(TextInputStyle.Short);
            await command.showModal(modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(favoriteColorInput)));
            const submitted = await command.awaitModalSubmit({
                time: 60000,
                filter: i => i.user.id === command.user.id,
            }).catch(() => {
                command.channel?.send({ embeds: [ErrorMessages("You took too long, please try again")] });
                return null
            })
            if (submitted) {
                const pseudo = submitted.fields.getTextInputValue('game:start:pseudo');
                try {
                    const newplayer = await prisma.player.create({
                        data: {
                            discordId: command.user.id,
                            pseudo: pseudo,
                            language: "EN_en",
                            mana: 20,
                            manaMax: 20,
                            xp: 0,
                            xpMax: 100,
                            level: 1,
                            health: 50,
                            healthMax: 50,
                            power: 10,
                            maxPower: 10
                        }
                        
                    });
                    const inventoryPlayer = await prisma.inventory.create({
                        data: {
                            discordID: command.user.id
                        }
                    });
                    console.log(newplayer, "\n", inventoryPlayer, "\n")
                    if (!newplayer || !inventoryPlayer) {
                        
                        await submitted.reply({ embeds: [ErrorMessages("An error occured while creating your account, please try again later.")] })
                        return;
                    } else {
                        await submitted.reply({ content: "Your account has been created successfully!\nWelcome **" + pseudo + "**" })
                        return;
                    }
                } catch (e) {
                    if (e instanceof Prisma.PrismaClientKnownRequestError) EmbedErrorLogger(e.message);
                    await submitted.reply({ embeds: [ErrorMessages("An error occured while creating your account, please try again later.")] })
                    return;
                }
            }
        } else {
            await command.reply({ embeds: [ErrorMessages("You already have an account!")] })
            return;
        }
    }
}
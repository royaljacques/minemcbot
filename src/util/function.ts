import { Colors, EmbedBuilder } from "discord.js"
import Index, { prisma } from "..";
import Profil from "../minemc/profil";

export const ErrorMessages = (message: string): EmbedBuilder => {
    const embed = new EmbedBuilder()
    .setTitle("Error")
    .setDescription(message)
    .setColor(Colors.Red);
    return embed;
}


export const EmbedErrorLogger = (message: string): void => {
    const embed = new EmbedBuilder()
    .setTitle("Error")
    .setDescription(message)
    .setColor(Colors.Red)
    Index.instance.getLoggerChannel().then(channel => {
        channel.send({embeds: [embed]});
    }).catch((error) => {
        console.error(error);
    })
}

export const getUser = async(discordId: string): Promise<Profil | null>  => {
    const prismaUser = await prisma.player.findUnique({
        where: {
            discordId: discordId
        }
    });
    if (prismaUser == null) {
        return null;
    }
    return new Profil(prismaUser.discordId, prismaUser.mana, prismaUser.manaMax, prismaUser.xp, prismaUser.level, prismaUser.health, prismaUser.power, prismaUser.maxPower, prismaUser.language);
}
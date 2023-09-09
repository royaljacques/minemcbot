import { Colors, EmbedBuilder } from "discord.js"
import Index, { prisma } from "../minemc";
import { addRoundedRectangleToBuffer, addServerLogo,  generateDarkBackround, resizeAndRoundImage } from "./canvas";

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
        channel.send({ embeds: [embed] });
    }).catch((error) => {
        console.error(error);
    })
}

export const createPickaxe = async (discordId: string): Promise<{ id: number, type: string, level: number, discordId: string }> => {
    const pickaxe = await prisma.item.create({
        data: {
            type: "PICKAXE",
            discordId: discordId
        }
    })
    console.log(pickaxe);
    return pickaxe;
}

export async function generateImage(guildName: string, avatar: string | null, type = "New Discord !!"): Promise<Buffer> {
    
    console.log(avatar)
    const a = await resizeAndRoundImage(avatar ? avatar : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" );
    const pp = await addRoundedRectangleToBuffer(await addServerLogo(await generateDarkBackround(), a), guildName)
    return pp;
}

export function generateRandomNumber(min: number, max: number): number {
    if (min >= max) {
        throw new Error("La valeur minimale doit être inférieure à la valeur maximale.");
    }

    const randomNumber = Math.random() * (max - min) + min;
    return Math.floor(randomNumber);
}

export function replaceAll(text: string, balise: string[], value: string[]): string {
    let newText = text;
    for (let i = 0; i < balise.length; i++) {
        newText = newText.replace(balise[i], value[i]);
    }
    return newText;
}

import { Colors, EmbedBuilder } from "discord.js"
import Index, { prisma } from "..";
import Profil from "../minemc/profil";
import { createCanvas, loadImage, CanvasRenderingContext2D, Image } from 'canvas';
import path from "path";
import { fillTextWithTwemoji } from 'node-canvas-with-twemoji-and-discord-emoji';

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

export const getUser = async (discordId: string): Promise<Profil | null> => {
    const prismaUser = await prisma.player.findUnique({
        where: {
            discordId: discordId
        }
    });
    if (prismaUser == null) {
        return null;
    }
    return new Profil(prismaUser.discordId, prismaUser.mana, prismaUser.manaMax, prismaUser.xp, prismaUser.level, prismaUser.health, prismaUser.power, prismaUser.maxPower, prismaUser.language, prismaUser.itemInHand ?? null, prismaUser.pseudo, prismaUser.health, prismaUser.healthMax, prismaUser.vote);
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

export async function generateImage(pseudo: string, nomServeur: string, nombreMembres: number, type = "New Discord !!"): Promise<Buffer> {
    const canvas = createCanvas(800, 400);
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    // Charger l'image de fond
    const base: Image = await loadImage(path.join(__dirname, '..', 'assets', 'img', 'backround.png'));
    ctx?.drawImage(base, 0, 0, canvas.width, canvas.height);
    const fontSize = 40;
    const lineHeight = 40;
    const textX: number = canvas.width / 2;
    const textY: number = canvas.height / 2 - ((3 - 1) * lineHeight) / 2;
   
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const textLines: string[] = ['Owner: ' + pseudo, 'Server: ' + nomServeur, 'Member: ' + nombreMembres];
    ctx.font = `50px Arial`;
    //text color 
    ctx.fillStyle = 'black';
    await fillTextWithTwemoji(ctx, type, textX - 5, textY - lineHeight - 20);
    ctx.font = `${fontSize}px Arial-BoldMT`;
    ctx.fillStyle = 'white';
    for (const line of textLines) {
        const lineY: number = textY + textLines.indexOf(line) * lineHeight;
        await fillTextWithTwemoji(ctx, line, textX, lineY);
    }
    return canvas.toBuffer('image/png');
}

export function generateRandomNumber(min: number, max: number): number {
    if (min >= max) {
      throw new Error("La valeur minimale doit être inférieure à la valeur maximale.");
    }
  
    const randomNumber = Math.random() * (max - min) + min;
    return Math.floor(randomNumber);
  }

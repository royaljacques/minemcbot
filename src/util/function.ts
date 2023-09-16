import { Colors, EmbedBuilder, GuildMember } from "discord.js"
import Index, { prisma } from "../minemc";
import { addRoundedRectangleToBuffer, addServerLogo,  generateDarkBackround, resizeAndRoundImage } from "./canvas";

export const ErrorMessages = (message: string): EmbedBuilder => {
    const embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(message)
        .setColor(Colors.Red);
    return embed;
}

export const ErrorLineMessages = (error: Error, message: string): EmbedBuilder => {
    const embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(error.stack?.split("\n\n")[1] +"\n"+message)
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

export const getuserById = async (id: string): Promise<GuildMember | null> => {
    let memberFound: GuildMember | null = null; // Variable pour suivre si le membre a été trouvé

    const test = await Index.instance.guilds.cache;
    test.forEach(async (guild) => {
      try {
        if (memberFound) return; // Si le membre a déjà été trouvé, sortir de la boucle
        // Récupération de tous les membres du serveur (non-bots)
        const allMembers = (await guild.members.fetch()).filter(member => !member.user.bot);
        
        // Recherche du membre avec l'ID spécifique
        const memberIdToFind = '883693434693619732';
        const foundMember = allMembers.find(member => member.user.id === memberIdToFind);
        
        if (foundMember) {
          memberFound = foundMember; // Stocker le membre trouvé
          console.log(`Membre trouvé dans le serveur ${guild.name}: ${foundMember.user.tag}`);
          // Vous pouvez maintenant utiliser "foundMember" pour accéder aux informations du membre trouvé.
        } else {
         console.log(`Membre non trouvé dans le serveur ${guild.name}`);
        }
      } catch (error: any) {
         console.error(error.message);
      }
    });
    return memberFound;
}
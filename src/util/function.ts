import { Colors, EmbedBuilder } from "discord.js"
import Index from "..";

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
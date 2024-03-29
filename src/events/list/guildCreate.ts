import { Guild, TextChannel, GuildChannelManager, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import Index from "../../minemc";
import Event from "../Event";
import { generateImage } from "../../util/function";

export default class Ready extends Event {
  public readonly name = "guildCreate";

  async execute(guild: Guild): Promise<void> {
    // Trouver le premier salon textuel parmi "general", "chat" ou "global"
    const generalChannel = this.findChannelByName(guild.channels, "general");
    const chatChannel = this.findChannelByName(guild.channels, "chat");
    const globalChannel = this.findChannelByName(guild.channels, "global");

    const firstAvailableChannel = generalChannel || chatChannel || globalChannel;

    if (!firstAvailableChannel) {
      const textChannels = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText);
      if (textChannels.size > 0) {
        const firstTextChannel = textChannels.first();
      } else {
        // Aucun salon textuel n'est disponible, vous pouvez gérer cela comme vous le souhaitez
        console.log("Aucun salon textuel disponible trouvé.");
        return;
      }
      return;
    }
    const channel = await Index.instance.channels.fetch(firstAvailableChannel.id) as TextChannel;


    const button: ButtonBuilder = new ButtonBuilder()
        .setCustomId("config")
        .setLabel("config")
        .setStyle(ButtonStyle.Danger);
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);
    channel.send({
      content: "Thank you for inviting me to your server! I'm here to assist and make your Discord experience better. If you have any questions or need help, feel free to ask. Let's make this server awesome together!",
      components: [row]
    });

    const channels = await Index.instance.channels.fetch("1115606253603926046") as TextChannel;
    generateImage(guild.name, await guild.iconURL({"extension": "png"})).then((buffer) => {
      channels.send({files: [buffer]});
    })
  }

  // Fonction pour trouver un salon par nom
  private findChannelByName(channelManager: GuildChannelManager, channelName: string): TextChannel | null {
    const lowercaseChannelName = channelName.toLowerCase();
  
    // Itérer sur les canaux et vérifier leur type
    for (const [_, channel] of channelManager.cache) {
      if (channel.type === ChannelType.GuildText && channel.name.toLowerCase() === lowercaseChannelName) {
        return channel as TextChannel;
      }
    }
  
    // Aucun salon trouvé
    return null;
  }
}

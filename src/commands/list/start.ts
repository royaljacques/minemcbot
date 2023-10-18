import BaseCommand from "../baseCommands";
import { ActionRowBuilder, ChatInputCommandInteraction, ModalActionRowComponentBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { CommandsType } from "../baseCommands";
import Index, { prisma } from "../../minemc";

export default class Ping extends BaseCommand {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("start")
    .setDescription("start the adventure");

  public readonly help = {
    "name": "start",
    "description": "start adventure",
    "category": CommandsType.GAMEPLAY
  }
  public async execute(command: ChatInputCommandInteraction): Promise<void> {

    const collectorFilter = (i: any) => {
      i.deferUpdate();
      return i.user.id === command.user.id;
    };

    prisma.player.findUnique({ where: { discordId: command.user.id.toString() } }).then(async (player) => {
      console.log(player);
      if (player === null) {
        const modal: ModalBuilder = new ModalBuilder()
          .setCustomId("start:modal")
          .setTitle("start")

        const pseudo = new TextInputBuilder()
          .setCustomId("start:pseudo")
          .setPlaceholder("pseudo")
          .setLabel("what is your pseudo ?")
          .setStyle(TextInputStyle.Short)
        const row = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(pseudo);
        modal.addComponents(row);
        await command.showModal(modal).then(async () => {
          try {
            command.awaitModalSubmit({ time: 60000, filter: collectorFilter }).then(async (modalCollector) => {
              command.user.id
              const newPlayer = await prisma.player.create({
                "data": {
                  "discordId": command.user.id.toString(),
                  "pseudo": modalCollector.fields.getTextInputValue("start:pseudo"),
                }
              });
              if(!newPlayer){
                await command.reply("an error has occurred");
                return;
              }else{
                Index.instance.getProfils().addUser(command.user.id.toString());
                command.channel?.send("you are ready to start the adventure `" + modalCollector.fields.getTextInputValue("start:pseudo") + "`");

              }

            });
          } catch (e) {
            console.log(e);
          }
        });
      } else {
        await command.reply("you have already start the adventure");
      }
    });
  }
}
/**
 * 
const item = await prisma.tools.create({
      data: {
        type: ToolType.PICKAXE
      }
    })
 */
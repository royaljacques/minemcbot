import BaseCommand from "../baseCommands";
import { ActionRowBuilder, ChatInputCommandInteraction, ModalActionRowComponentBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { CommandsType } from "../baseCommands";
import { prisma } from "../../minemc";

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
   
    prisma.player.findUnique({where: {discordId: command.user.id.toString()}}).then(async (player) => {
      if(player === null){
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
        await command.showModal(modal).then(async() => {
         command.awaitModalSubmit({time: 60000, filter: collectorFilter}).then(async (modalCollector) => {
          command.channel?.send("you are ready to start the adventure `" + modalCollector.fields.getTextInputValue("start:pseudo") + "`");
          console.log();
         });
        });
       }else{
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
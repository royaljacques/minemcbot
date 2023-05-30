import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";


export const CommandsType = {
  MODERATION: "moderation",
  GAMEPLAY: "gameplay",
  FUN: "fun",
  GAME: "game",
  MISC: "misc"
}
export default abstract class BaseCommand {

    public abstract readonly slashCommand: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;

    get name(): string {
      return this.slashCommand.name;
    }
    public abstract help: {name: string, description: string, category: string} ;
    
   
    get description(): string {
      return this.slashCommand.description;
    }

    public abstract execute(command: ChatInputCommandInteraction): void;

}
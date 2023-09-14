import { ButtonInteraction, ChatInputCommandInteraction} from "discord.js";



export default abstract class BaseButtons {

    public abstract readonly name: string;

    getname(): string {
      return this.name;
    }
   
    public abstract execute(command: ButtonInteraction): void;

}
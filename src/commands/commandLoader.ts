import { Collection} from "discord.js";
import { readdirSync } from "fs";
import BaseCommand from "./baseCommands";
import Index from "..";

export default class CommandLoader {

  public readonly commands: Collection<string, BaseCommand> = new Collection();

  constructor() {
    this.load().then(() => this.listener());
  }

  private async load() : Promise<void> {
    const files = readdirSync(`${__dirname}/list`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

    let i = 0;
    for (const file of files) {
      const dynamicImport = await import(`./list/${file}`);
      const command: BaseCommand = new dynamicImport.default();
      this.commands.set(command.name, command);
      i++;
    }

    console.info(`${i} commands loaded`);
  }

  private async listener() : Promise<void> {
    Index.instance.on("interactionCreate", async interaction => {
      if (!interaction.isChatInputCommand()) return;

      const command = this.commands.get(interaction.commandName);

      if (command) command.execute(interaction);
    });
  }

  /**
     * Register the slash commands (use it when the client is ready)
     */
  public async register() : Promise<void> {
    await (await Index.instance.getGuild()).commands.set(
      this.commands.map(command => command.slashCommand.toJSON())
    );
  }
   


}
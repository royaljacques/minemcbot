import { Collection, Routes} from "discord.js";
import { readdirSync } from "fs";
import BaseCommand from "./baseCommands";
import Index, { prisma } from "../minemc";

export default class CommandLoader {

  public readonly commands: Collection<string, BaseCommand> = new Collection();
  public static helpCommandStorages: Collection<string, Collection<string, string> >= new Collection();
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
      console.info(`[✅] command ${command.name} `);
      
      const collection = CommandLoader.helpCommandStorages.get(command.help.category);
      if(collection === undefined){ 
        CommandLoader.helpCommandStorages.set(command.help.category, new Collection<string, string>().set(command.help.name, command.help.description));
      }else{
        const help =Array.from(collection);
        help.push([command.help.name, command.help.description]);
       
        const col = new Collection<string, string>();
        help.map((value) => {
          col.set(value[0], value[1])
        });
        CommandLoader.helpCommandStorages.set(command.help.category, col);
      }
      ++i;
    }
    console.info(`${i} commands loaded`);
  }

  private async listener() : Promise<void> {
    Index.instance.on("interactionCreate", async interaction => {
      if (!interaction.isChatInputCommand()) return;
      const command = this.commands.get(interaction.commandName);
      prisma.serverConfig.findUnique({where: {serverId: interaction.guildId?.toString()}}).then(async (config) => {
        if(config === null){
          if (command) command.execute(interaction);
        }else{
          if(config.channel === interaction.channel?.id.toString()){
            if (command) command.execute(interaction);
          }else{
            interaction.reply({content: "you don't use this command on this channel ", ephemeral: true})
          }
        }
      });
    });
  }

  /**
     * Register the slash commands (use it when the client is ready)
     */
  public async register() : Promise<void> {
    
    if(Index.instance.user === null) throw new Error("Client is not ready");
    await Index.instance.rest.put(Routes.applicationCommands(
      Index.instance.user.id), 
      { 
        body: this.commands.map(command => command.slashCommand.toJSON()) 
      }
    );
  
  }
   


}
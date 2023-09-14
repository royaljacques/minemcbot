import { Collection } from "discord.js";
import { readdirSync } from "fs";
import BaseButtons from "./baseButtons";
import Index from "../minemc";

 
export default class ButtonLoader {
    public readonly buttons: Collection<string, BaseButtons> = new Collection();
    constructor() {
        this.load().then(() => this.listener());
    }
    async load(){
        const files = readdirSync(`${__dirname}/buttonsList`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
        let i = 0;
        for (const file of files) {
            const dynamicImport = await import(`./buttonsList/${file}`);
            const button = new dynamicImport.default();
            this.buttons.set(button.name, button);
            console.info(`[✅] button ${button.name} `);
            ++i;
        }
        console.info(`${i} buttons loaded`);

    }
    async listener(){
        Index.instance.on("interactionCreate", async interaction => {
            if (!interaction.isButton()) return;
            const button = this.buttons.get(interaction.customId);
            if (button) button.execute(interaction);
        });
    }
}

import { readdirSync } from "node:fs";
import Index from "../minemc";
import Event from "./Event";
export default class EventManager {
  constructor() {
    this.load();
  }
  private async load() : Promise<void> {
    const files = readdirSync(`${__dirname}/list`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
    for (const file of files) {
      const dynamicImport = await import(`./list/${file}`);
      const event: Event = new dynamicImport.default();
      Index.instance[event.once ? "once" : "on"](event.name, (...args) => event.execute(...args));
    }
  }
}
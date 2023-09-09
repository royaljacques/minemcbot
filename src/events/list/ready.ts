import Index from "../../minemc";
import fs from "fs";
import Event from "../Event";
import { Collection, TextChannel } from "discord.js";

export default class Ready extends Event {
  public readonly name = "ready";

  public async execute(): Promise<void> {
    console.log("Ready!");
  }
}

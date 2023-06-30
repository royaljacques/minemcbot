import Index from "../../minemc";
import Event from "../Event";

export default class Ready extends Event {

    public readonly name = "ready";

    public execute() : void {
        Index.instance.commandManager.register();
        console.log("Ready !");
        //console.log(Index.instance.emojis.cache)
    }
}
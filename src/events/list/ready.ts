import Index from "../..";
import Event from "../Event";

export default class Ready extends Event {

    public readonly name = "ready";

    public readonly enabledInDev = false;

    public execute() : void {
        Index.instance.commandManager.register();
        console.log("Ready !");
    }
}
import { BaseTool } from "../baseTool"
import { pickaxeId } from "../itemIds";
import { ToolId } from "../types";

export default class WoodenPickaxe extends BaseTool {
    constructor(){
        super("Wooden Pickaxe",ToolId.pickaxe, pickaxeId.wooden_pickaxe);
    }
}
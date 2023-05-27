import { pickaxeId } from "../itemIds";
import { ToolId } from "../types";
import BasePickaxe from "./basePickaxe";

export default class WoodenPickaxe extends BasePickaxe {
    constructor(){
        super("Wooden Pickaxe",ToolId.pickaxe, pickaxeId.wooden_pickaxe);
        this.efficiency = 1;
    }
}
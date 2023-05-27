import { BaseTool } from "../baseTool";

export default class BasePickaxe extends BaseTool{
    
    constructor(name: string, type: number, id: number){
        super(name, type, id);
        this.xp = 0;
    }
}
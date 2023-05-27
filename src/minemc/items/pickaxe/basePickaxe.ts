import { BaseTool } from "../baseTool";

export default class BasePickaxe extends BaseTool{
    
    efficiency: number;
    constructor(name: string, type: number, id: number){
        super(name, type, id);
        this.xp = 0;
        this.efficiency = 1;
    }

    getEfficiency(): number{
        return this.efficiency + this.level;
    }

    setEfficiency(efficiency: number): void{
        this.efficiency = efficiency;
    }
    
}
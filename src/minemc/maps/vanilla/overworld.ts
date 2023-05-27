import { BaseWorld } from "../baseWorld";

export default class OverWorld extends BaseWorld {
    
    constructor() {
        super();
        console.log("OverWorld");
    }

    getBlockProperties(playerLevel: number): {[key: string]: number} | null{
        if(playerLevel < 5){
            return {
                'minecraft:dirt': 5,
                'minecraft:stone': 7,
            }
        }
        return null;
    }
}
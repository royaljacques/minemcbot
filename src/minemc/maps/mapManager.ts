//permet de savoir quelle est la map qu'as selectionné le joueur par default: overworld
// Path: src\minemc\maps\vanilla\overworld.ts

import Player from "../players/player";
import OverWorld from "./vanilla/overworld";


export default class MapManager {
    player: Player;
    constructor(player: Player){
        this.player = player;
    }

    getPlayerMap(): OverWorld | undefined{

        switch(this.player.map_name){
            case "overworld":
                return new OverWorld();
                break;
            case "nether": 
                //return new Nether();
                break;
            default: 
            return new OverWorld();
        }
       
    }
}
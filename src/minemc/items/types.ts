export enum ToolId{
    pickaxe=  0,
}
export function getTypesString(type: number): string  {
    let name: string;
    switch(type){
        case ToolId.pickaxe:
            name = "Pickaxe";
            break;
        case 1:
            name = "Axe";
            break;
        case 3:
            name = "Shovel";
            break;
            
        default: name = "Unknown"
    }
    return name;
}
import { readFileSync } from "fs"
import { EmbedErrorLogger } from "./function";
import path from "path";

export const getLanguage = (key: string, language: string): string => {
    try{
        const file = readFileSync(path.join(__dirname, "langs", language + ".json"));
        const json = JSON.parse(file.toString());
        return json[key];
    }catch(e ){
        if(e instanceof Error){
            EmbedErrorLogger(e.message);
        }else{
            console.log(e);
        }
    }
    return "undefined"
}
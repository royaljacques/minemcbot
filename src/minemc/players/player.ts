export default class Player {
    pseudo: string;
    discordId: string;
    lang: string;
    xp: number;
    level: number;
    map_name: string;
    itemInHand: number | null
    constructor(
        pseudo: string,
        discordId: string,
        lang: string,
        xp = 0,
        level = 1,
        map_name = "overworld"
    ) {
        this.pseudo = pseudo;
        this.discordId = discordId;
        this.lang = lang;
        this.xp = xp;
        this.level = level;
        this.map_name = map_name;
        this.itemInHand = null;
    }
    getLevel() {
        return this.level;
    }
    getXp() {
        return this.xp;
    }
    getMapName() {
        return this.map_name;
    }
    getLang() {
        return this.lang;
    }
    getPseudo() {
        return this.pseudo;
    }
    getDiscordId() {
        return this.discordId;
    }
    setLevel(level: number) {
        this.level = level;
    }
    setXp(xp: number) {
        this.xp = xp;
    }
    setMapName(map_name: string) {
        this.map_name = map_name;
    }
    setLang(lang: string) {
        this.lang = lang;
    }
    setPseudo(pseudo: string) {
        this.pseudo = pseudo;
    }
    setDiscordId(discordId: string) {
        this.discordId = discordId;
    }
    setItemInHand(itemInHand: number) {
        this.itemInHand = itemInHand;
    }
    getItemInHand(): number | null {
        return this.itemInHand;
    }
}
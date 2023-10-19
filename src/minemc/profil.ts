import { log } from 'node:console';
import Index, { prisma } from '../minemc';
import User from './user/user';
import ChestInventory from './user/inventory/chestInventory';
export default class Profil {
    public user: User[] = [];
   
    constructor() {
        this.databaseLoader();
    }
    public async databaseLoader(): Promise<void> {
        const prismaRequest = await prisma.player.findMany();
        prismaRequest.forEach((user) => {
            this.user.push(new User(
                user.discordId,
                user.pseudo,
                user.language,
                user.mana,
                user.manaMax,
                user.xp,
                user.xpMax,
                user.level,
                user.health,
                user.healthMax,
                user.power,
                user.maxPower,
                user.itemInHand,
                user.manaTimer
            ));
        })
    }
    public async addUser(id: string): Promise<void> {
        const user = await prisma.player.findUnique({ where: { discordId: id } });
        if (user === null) {
            Index.instance.getLoggerChannel().then(channel => {
                channel.send("new user: " + id);
            })
            return;
        }
        this.user.push(new User(
            user.discordId,
            user.pseudo,
            user.language,
            user.mana,
            user.manaMax,
            user.xp,
            user.xpMax,
            user.level,
            user.health,
            user.healthMax,
            user.power,
            user.maxPower,
            user.itemInHand,
            user.manaTimer
        ));

    }
    getUser(id: string): User | undefined {

        return this.user.find((user) => user.getDiscordId() === id);
    }
    
}
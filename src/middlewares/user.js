import { createUser, findByUser } from "../repository/db.js";

export const acessUserMiddleware = async (ctx, next) => {

    try {
        const id_user_telegram = ctx.update.message.from.id;
        const username = ctx.update.message.from.first_name;

        const usuario = await findByUser(id_user_telegram);

        if (!usuario) {
            const create = await createUser({ username, id_user_telegram });
        }
        next();
    } catch (error) {
        await ctx.reply(error.message);
    }
};
import { Scenes, Markup } from 'telegraf';
import { backButton } from '../buttons.js';
import { getRuasPerigosas } from '../repository/db.js';

export const listRuasPerigosasScene = new Scenes.BaseScene('list_ruas_perigosas');
listRuasPerigosasScene.enter(async ctx => {
    
    await ctx.reply('Infome a cidade: ');
});

listRuasPerigosasScene.leave(async ctx => {
    await ctx.reply('saindo');
    // await ctx.reply('🏃‍♂Retornando. . .', Markup.removeKeyboard());
    // await ctx.reply('Selecione uma opção', buttonsMainMenu);
});

listRuasPerigosasScene.on('text', async ctx => {
    const cidade = ctx.update.message.text;

    const res = await getRuasPerigosas(cidade);
    console.log(res.length);
    await ctx.reply(`Na cidade de ${cidade} Já houveram ${res.length} ocorrências`);
});
import 'dotenv/config';
import { Telegraf, Scenes, session, Markup } from 'telegraf';
import { buttonsMainMenu } from './buttons.js';
import { acessUserMiddleware } from './middlewares/user.js';
import { infoOcorrenciaScene } from './useCases/insertOcorrencia.js';
import { listRuasPerigosasScene } from './useCases/ListRuasPerigosas.js';
import { listOcorrenciaScene } from './useCases/ListarOcorrencias.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(acessUserMiddleware, async ctx => {
  const username = ctx.update.message.from.first_name;
  
  console.log(`Usuário ${username} acessou!!!`);
  await ctx.reply(`\\{^_^}/ - Olá ${username}, seja bem vindo(a)!`);
  await ctx.reply('Eu sou bot security');
  await ctx.reply('Selecione uma opção', buttonsMainMenu);
});

const stage = new Scenes.Stage([
  infoOcorrenciaScene,
  listRuasPerigosasScene,
  listOcorrenciaScene
]);

bot.use(session());
bot.use(stage.middleware());

bot.action('info_event', async ctx => ctx.scene.enter('inserir_ocorrencia'))
bot.action('dang_streets', async ctx => ctx.scene.enter('list_ruas_perigosas'))
bot.action('list_event', async ctx => ctx.scene.enter('list_ocorrencias_usuario'))

//bot.startPolling();

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
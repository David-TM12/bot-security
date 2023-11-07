import { Scenes, Markup } from 'telegraf';
import {
    backButton,
    backButtonKeyBoard,
    buttonEnviarSolicitacao,
    buttonsCategories,
    buttonsMainMenu,
    confirmButton,
    confirmButtonConsumado,
    infoOcorrenciaButton
} from '../buttons.js';
import { consultaApiViaCep } from '../services/viacep.js';
import { createOcorrencia, findByUser, getCategorias } from '../repository/db.js';

let descricao = '';
let cep = ''
let consumado = '';
let categoria = '';
let confirmation = false;
let id_usuario = '';
let id_categoria = '';

export const infoOcorrenciaScene = new Scenes.BaseScene('inserir_ocorrencia');
infoOcorrenciaScene.enter(async ctx => {
    const id_user_telegram = ctx.update.callback_query.from.id;
    const usuario = await findByUser(id_user_telegram);
    if (usuario) {
        id_usuario = usuario.id;
    }
    ctx.session.field = '';
    ctx.session.dados = {};
    await ctx.reply('Selecione a opção e insira os dados', infoOcorrenciaButton);
});

infoOcorrenciaScene.leave(async ctx => {
    descricao = '';
    cep = ''
    consumado = '';
    categoria = '';
    confirmation = false;
    id_categoria = '';
    ctx.session.dados = {};

    await ctx.reply('🏃‍♂Retornando. . .', Markup.removeKeyboard());
    await ctx.reply('Selecione uma opção', buttonsMainMenu);
});

infoOcorrenciaScene.hears(/cep/gi, async ctx => {
    await ctx.replyWithHTML(`<b>Informe o cep 0000-000</b>:`);
    ctx.session.field = ctx.update.message.text;
});

infoOcorrenciaScene.hears(/descricao/gi, async ctx => {
    await ctx.replyWithHTML(`Descreva o que aconteceu:`);
    ctx.session.field = ctx.update.message.text;
});

infoOcorrenciaScene.hears(/categorias/gi, async ctx => {
    const categorias = await getCategorias();
    await ctx.replyWithHTML('<b>selecione a categoria:</b>');
    for (const categoria of categorias) {
        await ctx.reply('-', await buttonsCategories(categoria));
    }
});

infoOcorrenciaScene.hears(/consumado/gi, async ctx => {
    await ctx.replyWithHTML(`O Ocorrido foi consumado? `, confirmButtonConsumado);
    ctx.session.field = ctx.update.message.text;
});

infoOcorrenciaScene.action(/add (.+)/, async ctx => {
    const id_cat = ctx.match[1]
    categoria = 'Categorias'
    id_categoria = id_cat;

    if (cep != '' && descricao != '' && consumado != '' && categoria != '') {
        await ctx.reply('dados completos: ', buttonEnviarSolicitacao);
    } else {
        await ctx.reply('informe o proximo campo: ', infoOcorrenciaButton);
    }
});

infoOcorrenciaScene.on('text', async ctx => {
    try {
        const msg = ctx.update.message.text;
        confirmation = false;

        if (ctx.session.field === 'CEP') {
            await ctx.reply('Aguarde, buscando dados...');
            const cepRegex = /(\d{5}-\d{3})/;
            if (cepRegex.test(msg)) {
                cep = msg;
                const res = await consultaApiViaCep(cep);
                ctx.session.dados = res;
                
                const message = `
        cep: ${res.cep},
        logradouro: ${res.logradouro},
        bairro: ${res.bairro},
        localidade: ${res.localidade},
        uf: ${res.uf}
        ddd: ${res.ddd}
      `;

                await ctx.replyWithHTML('<b>Os dados estão corretos?</b>');
                confirmation = true;
                await ctx.reply(message, confirmButton);
            } else {
                await ctx.reply(`CEP esta no formato inválido \nformato aceito 0000-000 \ninforme o CEP: `);
                return;
            }

        } else if (ctx.session.field === 'Descricao') {
            descricao = msg;
        } else if (ctx.session.field === 'Categorias') {
            categoria = msg;
        } else if (ctx.session.field === 'Consumado') {
            consumado = msg;
        } else {
            await ctx.reply('Campo invalido!!!');
        }

        if (!confirmation) {
            if (cep != '' && descricao != '' && consumado != '' && categoria != '') {
                await ctx.reply('dados completos: ', buttonEnviarSolicitacao);
            } else {
                await ctx.reply('informe o proximo campo: ', infoOcorrenciaButton);
            }
        }
    } catch (error) {
        await ctx.reply('<b>Houve um erro: </b>', error);
    }
});

infoOcorrenciaScene.action(/consumado-yes/, async ctx => {
    consumado = 'yes';
    if (cep != '' && descricao != '' && consumado != '' && categoria != '') {
        await ctx.reply('dados completos: ', buttonEnviarSolicitacao);
    } else {
        await ctx.reply('informe o proximo campo: ', infoOcorrenciaButton);
    }
});

infoOcorrenciaScene.action(/consumado-no/, async ctx => {
    consumado = 'no';
    if (cep != '' && descricao != '' && consumado != '' && categoria != '') {
        await ctx.reply('dados completos: ', buttonEnviarSolicitacao);
    } else {
        await ctx.reply('informe o proximo campo: ', infoOcorrenciaButton);
    }
});

infoOcorrenciaScene.action(/yes/, async ctx => {
    confirmation = false;
    if (cep != '' && descricao != '' && consumado != '' && categoria != '') {
        await ctx.reply('dados completos: ', buttonEnviarSolicitacao);
    } else {
        await ctx.reply('informe o proximo campo: ', infoOcorrenciaButton);
    }
});

infoOcorrenciaScene.action(/no/, async ctx => {
    ctx.session.dados = {};
    confirmation = false;
    ctx.session.field = 'CEP';
    if (cep != '' && descricao != '' && consumado != '' && categoria != '') {
        await ctx.reply('dados completos: ', buttonEnviarSolicitacao);
    } else {
        await ctx.reply('informe outro CEP ', infoOcorrenciaButton);
    }
});

infoOcorrenciaScene.action(/enviar/gi, async ctx => {

    try {
        const object = {
            ...ctx.session.dados,
            id_usuario,
            descricao,
            cep,
            consumado,
            id_categoria
        }
        const res = await createOcorrencia(object);

        if (res) {
            await ctx.reply('Ocorrencia inserida com sucesso!!!', backButton);
        } else {
            throw new Error('Erro ao inserir a ocorrência!!!!')
        }
    } catch (error) {
        await ctx.reply(error.message, backButton);
    }
});

infoOcorrenciaScene.hears(/voltar/gi, async ctx => {
    await ctx.scene.leave();
});

infoOcorrenciaScene.action(/voltar/gi, async ctx => {
    await ctx.scene.leave();
});

infoOcorrenciaScene.on('message', async ctx => {
    await ctx.replyWithHTML('<b>Cep no formato invalido</b>');
    await ctx.reply('Exemplo de formato válido: 00000-000');
    await ctx.reply('informe o CEP: 00000-000', backButtonKeyBoard);
});
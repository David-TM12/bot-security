import { Scenes } from 'telegraf';
import { backButton, buttonsMainMenu, filterButtonInlineKeyBoard } from '../buttons.js';
import { getRuasPerigosasPorBairro, getRuasPerigosasPorCidade, getRuasPerigosasPorUF } from '../repository/db.js';

let porEstado = false;
let porCidade = false;
let porBairro = false;

export const listRuasPerigosasScene = new Scenes.BaseScene('list_ruas_perigosas');
listRuasPerigosasScene.enter(async ctx => {
	await ctx.reply('Informe uma opção: ', filterButtonInlineKeyBoard);
});

listRuasPerigosasScene.leave(async ctx => {
	await ctx.reply('🏃‍♂Retornando. . .');
	await ctx.reply('Selecione uma opção', buttonsMainMenu);
});

listRuasPerigosasScene.action(/byState/, async ctx => {
	porEstado = true;
	await ctx.replyWithHTML('<b>Informe a UF:</b> <i>ex.(AM)</i>');
});

listRuasPerigosasScene.action(/byCity/, async ctx => {
	porCidade = true;
	await ctx.replyWithHTML('<b>Informe a cidade:</b>');
});

listRuasPerigosasScene.action(/byDistrict/, async ctx => {
	porBairro = true;
	await ctx.replyWithHTML('<b>Informe o bairro:</b>');
});


listRuasPerigosasScene.on('text', async ctx => {
	try {
		if (porEstado) {
			const uf = ctx.update.message.text;
			const res = await getRuasPerigosasPorUF(uf);
			if (!res || res.length === 0) {
				throw new Error('⚠️ Não foi encontrada nenhuma ocorrência para o estado informado!!! 😉');
			}
			const sizeRes = res.length;
			let a = 1;
			for (const ocorrencia of res) {
				if (a < sizeRes) {
					await ctx.replyWithHTML(`<b><i>-RANK #${a}-</i></b> \n<b>UF:</b> ${ocorrencia.uf} \n<b>Cidade:</b> ${ocorrencia.cidade} \n<b>Bairro:</b> ${ocorrencia.bairro} \n<b>Rua:</b> ${ocorrencia.rua} \n<b>N° Ocorrências:</b> ${ocorrencia._count}`);
				} else {
					await ctx.replyWithHTML(`<b><i>-RANK #${a}-</i></b> \n<b>UF:</b> ${ocorrencia.uf} \n<b>Cidade:</b> ${ocorrencia.cidade} \n<b>Bairro:</b> ${ocorrencia.bairro} \n<b>Rua:</b> ${ocorrencia.rua} \n<b>N° Ocorrências:</b> ${ocorrencia._count}`, backButton);
				}
				a++;
			}
			porEstado = false;
		} else if (porCidade) {
			const cidade = ctx.update.message.text;
			const res = await getRuasPerigosasPorCidade(cidade);
			if (!res || res.length === 0) {
				throw new Error('⚠️ Não foi encontrada nenhuma ocorrencia para a cidade informada!!! 😉');
			}
			const sizeRes = res.length;
			let i = 1;
			for (const ocorrencia of res) {
				if (i < sizeRes) {
					await ctx.replyWithHTML(`<b><i>-RANK #${i}-</i></b> \n<b>UF:</b> ${ocorrencia.uf} <b>\nCidade:</b> ${ocorrencia.cidade} \n<b>Bairro:</b> ${ocorrencia.bairro} \n<b>Rua:</b> ${ocorrencia.rua} \n<b>N° Ocorrências:</b> ${ocorrencia._count}`);
				} else {
					await ctx.replyWithHTML(`<b><i>-RANK #${i}-</i></b> \n<b>UF:</b> ${ocorrencia.uf} <b>\nCidade:</b> ${ocorrencia.cidade} \n<b>Bairro:</b> ${ocorrencia.bairro} \n<b>Rua:</b> ${ocorrencia.rua} \n<b>N° Ocorrências:</b> ${ocorrencia._count}`, backButton);
				}
				i++;
			}
			porCidade = false;
		} else if (porBairro) {
			const bairro = ctx.update.message.text;
			const res = await getRuasPerigosasPorBairro(bairro);
			if (!res || res.length === 0) {
				throw new Error('⚠️ Não foi encontrada nenhuma ocorrencia para o bairro informado!!! 😉');
			}

			const sizeRes = res.length;
			let j = 1;
			for (const ocorrencia of res) {
				if (j < sizeRes) {
					await ctx.replyWithHTML(`<b><i>-RANK #${j}-</i></b> \n<b>UF:</b> ${ocorrencia.uf} \n<b>Cidade:</b> ${ocorrencia.cidade} \n<b>Bairro:</b> ${ocorrencia.bairro} \n<b>Rua:</b> ${ocorrencia.rua} \n<b>N° Ocorrências:</b> ${ocorrencia._count}`);
				} else {
					await ctx.replyWithHTML(`<b><i>-RANK #${j}-</i></b> \n<b>UF:</b> ${ocorrencia.uf} \n<b>Cidade:</b> ${ocorrencia.cidade} \n<b>Bairro:</b> ${ocorrencia.bairro} \n<b>Rua:</b> ${ocorrencia.rua} \n<b>N° Ocorrências:</b> ${ocorrencia._count}`, backButton);
				}
				j++;
			}
			porBairro = false;
		}

	} catch (error) {
		await ctx.reply(error.message, backButton);
	}

});

listRuasPerigosasScene.action(/voltar/, async ctx => {
	await ctx.scene.leave();
});
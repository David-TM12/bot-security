import { Scenes } from 'telegraf';
import { backButton, buttonsMainMenu, filterButtonInlineKeyBoard } from '../buttons.js';
import { getOcorrrenciaByUsuario, getRuasPerigosasPorBairro, getRuasPerigosasPorCidade, getRuasPerigosasPorUF } from '../repository/db.js';


export const listOcorrenciaScene = new Scenes.BaseScene('list_ocorrencias_usuario');
listOcorrenciaScene.enter(async ctx => {

	try {
		const id_telegram = ctx.update.callback_query.from.id;
		const ocorrencias = await getOcorrrenciaByUsuario(id_telegram);
		if(!ocorrencias || ocorrencias.length === 0){
			throw new Error('⚠️ Não foram encontradas ocorrências para o seu usuário!!!');
		}
		const totalOcorrencias = ocorrencias.length;
		let b=1;
		await ctx.replyWithHTML(`<b>Total de ocorrências são ${totalOcorrencias}</b>`);
		for(const ocorrencia of ocorrencias){
			if(b < totalOcorrencias){
				await ctx.replyWithHTML(`<b><i>-OCORRÊNCIA #${b}-</i></b> \n<b>UF:</b> ${ocorrencia.uf} \n<b>Cidade:</b> ${ocorrencia.cidade} \n<b>Bairro:</b> ${ocorrencia.bairro} \n<b>Rua:</b> ${ocorrencia.rua} \n<b>CEP:</b> ${ocorrencia.cep} \n<b>Descrição:</b> ${ocorrencia.descricao}`);
			}else{
				await ctx.replyWithHTML(`<b><i>-OCORRÊNCIA #${b}-</i></b> \n<b>UF:</b> ${ocorrencia.uf} \n<b>Cidade:</b> ${ocorrencia.cidade} \n<b>Bairro:</b> ${ocorrencia.bairro} \n<b>Rua:</b> ${ocorrencia.rua} \n<b>CEP:</b> ${ocorrencia.cep} \n<b>Descrição:</b> ${ocorrencia.descricao}`, backButton);
			}
			b++;
		}
	} catch (error) {
		await ctx.reply(error.message);
	}

});

listOcorrenciaScene.leave(async ctx => {
	await ctx.reply('🏃‍♂Retornando. . .');
	await ctx.reply('Selecione uma opção', buttonsMainMenu);
});

listOcorrenciaScene.action(/voltar/, async ctx => {
	await ctx.scene.leave();
});

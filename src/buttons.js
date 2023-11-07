import { Markup } from 'telegraf';

export const buttonsMainMenu = Markup.inlineKeyboard([
  Markup.button.callback('🪟 - INFORMAR OCORRÊNCIA', 'info_event'),
  Markup.button.callback('📋 - CONSULTAR RUAS PERIGOSAS', 'dang_streets'),
  Markup.button.callback('🩺 - LISTAR OCORRÊNCIAS', 'list_event')
], { columns: 1 }).resize().oneTime();

export const infoOcorrenciaButton = Markup.keyboard([
  ['CEP'], ['Descricao'], ['Categorias'], ['Consumado'], ['Voltar']
]).resize().oneTime();


export const backButton = Markup.inlineKeyboard([
  Markup.button.callback('🔙 Voltar', 'voltar')
]).resize().oneTime();

export const confirmButton = Markup.inlineKeyboard([
  Markup.button.callback('🟢 Sim', 'yes'),
  Markup.button.callback('🔴 Não', 'no')
]).resize().oneTime();


export const confirmButtonConsumado = Markup.inlineKeyboard([
  Markup.button.callback('🟢 Sim', 'consumado-yes'),
  Markup.button.callback('🔴 Não', 'consumado-no')
]).resize().oneTime();

export const backButtonKeyBoard = Markup.keyboard([
  ['voltar']
]).resize().oneTime();

// export const buttonsCategories = async (listCategories) => Markup.inlineKeyboard(
//   listCategories.map(category => [Markup.button.callback(category.nome, `add ${category.id}`)])
// );

export const buttonsCategories = async (categoria) => {
  return  Markup.inlineKeyboard([
    Markup.button.callback(`${categoria.nome}`, `add ${categoria.id}`)
  ], { columns: 1 });
};

// export const buttonListOcorrenciasByCity = async (list) => Markup.inlineKeyboard(
//   list.map(ocorrencia => [Markup.button.callback(`Cidade: ${ocorrencia.cidade} \nBairro: ${ocorrencia.bairro} \nRua: ${ocorrencia.rua}`, `add ${ocorrencia.id}`)])
// );

export const buttonListOcorrenciasByCity = async (ocorrencia) => {
  return Markup.inlineKeyboard(
    [Markup.button.callback(`Cidade: ${ocorrencia.cidade} \nBairro: ${ocorrencia.bairro} \nRua: ${ocorrencia.rua} \nN° Ocorrências: ${ocorrencia._count}`, `add ${ocorrencia.id}`)],{columns:1}
  ).resize().oneTime();
}

export const filterButton = Markup.keyboard([
  ['por estado'], ['por cidade'], ['por bairro']
]).resize().oneTime();

export const filterButtonInlineKeyBoard = Markup.inlineKeyboard([
  Markup.button.callback('POR ESTADO', 'byState'),
  Markup.button.callback('POR CIDADE', 'byCity'),
  Markup.button.callback('POR BAIRRO', 'byDistrict'),
  Markup.button.callback('🔙 - VOLTAR', 'voltar'),
], { columns: 1 }).resize().oneTime();

//======================================================================
export const moduleButtons = Markup.inlineKeyboard([
  Markup.button.callback('📷 - CV', 'cv 1'),
  Markup.button.callback('🤖 - RPA', 'rpa 2'),
  Markup.button.callback('🦾 - ROBÔ', 'robo 3'),
  Markup.button.callback('🎛️ - CLP', 'clp 4'),
  Markup.button.callback('🖨️ - IMP_1', 'imp1 5'),
  Markup.button.callback('🖨️ - IMP_2', 'imp2 6'),
  Markup.button.callback('🔙 - Voltar', 'voltar'),
], { columns: 3 }).resize().oneTime();

export const buttonsMainMenuAdmin = Markup.inlineKeyboard([
  Markup.button.callback('🪟 MÓDULOS', 'mod'),
  Markup.button.callback('📋 RELATORIOS', 'rel'),
  Markup.button.callback('🩺 DIAGNÓSTICO', 'diag'),
  Markup.button.callback('🧑‍💻 ADMIN', 'accessAdmin')
], { columns: 2 }).resize().oneTime();

export const buttonsAdmin = Markup.inlineKeyboard([
  Markup.button.callback('🔐 LIBERAR ACESSO', 'adminUnblockUser'),
  Markup.button.callback('🚫 BLOCK ACESSO', 'adminBlockUser'),
  Markup.button.callback('🔑 CONCEDER ADMIN', 'grantAdminToUser'),
  Markup.button.callback('⛔ REMOVER ADMIN', 'removeAdminToUser'),
  Markup.button.callback('🔙 VOLTAR', 'voltar')
], { columns: 2 }).resize().oneTime();


export const buttonsActions = Markup.inlineKeyboard([
  Markup.button.callback('🟢 Ligar', 'ligar'),
  Markup.button.callback('🔴 Desligar', 'desligar'),
  Markup.button.callback('🔵 Status', 'status'),
  Markup.button.callback('🔙 Voltar', 'voltar')
], { columns: 3 }).resize().oneTime();

export const buttonsActionsOn = Markup.inlineKeyboard([
  Markup.button.callback('🟢 Ligar', 'ligar'),
  Markup.button.callback('⚪ Desligar', 'desligar'),
  Markup.button.callback('🔵 Status', 'status'),
  Markup.button.callback('🔙 Voltar', 'voltar')
], { columns: 3 }).resize().oneTime();

export const buttonsActionsOff = Markup.inlineKeyboard([
  Markup.button.callback('⚪ Ligar', 'ligar'),
  Markup.button.callback('🔴 Desligar', 'desligar'),
  Markup.button.callback('🔵 Status', 'status'),
  Markup.button.callback('🔙 Voltar', 'voltar')
], { columns: 3 }).resize().oneTime();

export const backMenuAdmin = Markup.inlineKeyboard([
  Markup.button.callback('🔙 Voltar', 'backMenuAdmin')
]).oneTime();

export const backAndTodayButton = Markup.keyboard([
  ['hoje', 'Voltar']
]).resize().oneTime();

export const formUserButtons = Markup.keyboard([
  ['Nome'], ['Email'], ['Celular'], ['Empresa'], ['Setor'], ['Matricula'], ['Voltar'],
]).resize().oneTime();

export const buttonSolicitarAcesso = Markup.inlineKeyboard([
  Markup.button.callback('🔐 - SOLICITAR ACESSO', 'access')
]).resize().oneTime();

export const buttonEnviarSolicitacao = Markup.inlineKeyboard([
  Markup.button.callback('⬆️ - ENVIAR', 'enviar')
]).resize().oneTime();

export const ListButtonsUsersBlock = async (name, key) => {
  return Markup.inlineKeyboard([
    Markup.button.callback(`🔴 ${name}`, `${key}`)
  ]);
};

export const ListButtonsUsersBlockWithBack = async (name, key) => {
  return Markup.inlineKeyboard([
    [Markup.button.callback(`🔴 ${name}`, `${key}`)],
    [Markup.button.callback('🔙 Voltar', 'backMenuAdmin')]
  ]).resize().oneTime();
};

export const ListButtonsUsersAcess = async (name, key) => Markup.inlineKeyboard([
  Markup.button.callback(`🟢 ${name}`, `${key}`)
]);

export const ListButtonsUsersAcessWithBack = async (name, key) => {
  return Markup.inlineKeyboard([
    [Markup.button.callback(`🟢 ${name}`, `${key}`)],
    [Markup.button.callback('🔙 Voltar', 'backMenuAdmin')]
  ]).resize().oneTime();
};

export const buttonUnblockUser = async (idUser) => Markup.inlineKeyboard([
  Markup.button.callback('🟢 DESBLOQUEAR', `desbloquear ${idUser}`),
  Markup.button.callback('🔙 VOLTAR', `backMenuAdmin`),
]);

export const buttonBlockUser = async (idUser) => Markup.inlineKeyboard([
  Markup.button.callback('🔴 BLOQUEAR', `bloquear ${idUser}`),
  Markup.button.callback('🔙 VOLTAR', `backMenuAdmin`),
]);

export const buttonGrantAdminToUser = async (idUser) => Markup.inlineKeyboard([
  Markup.button.callback('🟢 TORNA-LO ADMIN', `grantAdmin ${idUser}`),
  Markup.button.callback('🔙 VOLTAR', `backMenuAdmin`),
]);

export const buttonRemoveAdminToUser = async (idUser) => Markup.inlineKeyboard([
  Markup.button.callback('🔴 REMOVER ADMIN', `removeAdmin ${idUser}`),
  Markup.button.callback('🔙 VOLTAR', `backMenuAdmin`),
]);

export const buttonContactUs = Markup.inlineKeyboard([
  Markup.button.callback('CONTATO', 'contactus')
]).resize().oneTime();


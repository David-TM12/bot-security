import { prisma } from '../../prisma.js';

export async function findByUser(id_telegram) {
	try {
		const userExists = await prisma.usuario.findFirst({
			where: {
				hash_id_telegram: String(id_telegram)
			}
		});

		return userExists;
	} catch (error) {
		throw error;
	}

}

export async function createUser(data) {
	try {
		const { username, id_user_telegram } = data;
		const res = await prisma.usuario.create({
			data: {
				username,
				hash_id_telegram: String(id_user_telegram),
			}
		});

		return res;
	} catch (error) {
		throw error;
	}
}


export async function createOcorrencia(data) {
	try {
		const createOcorrencia = await prisma.ocorrencia.create({
			data: {
				rua: data.logradouro,
				cep: data.cep,
				bairro: data.bairro,
				cidade: data.localidade,
				uf: data.uf,
				descricao: data.descricao,
				consumado: data.consumado === 'yes' ? true : false,
				usuario_id: data.id_usuario,
				categoria_id: data.id_categoria
			}
		});

		return createOcorrencia;
	} catch (error) {
		throw error;
	}
}

export async function getCategorias() {
	try {
		const res = await prisma.categoria.findMany();

		if (!res) {
			throw new Error('Erro ao encontrar categorias!')
		}

		return res;
	} catch (error) {
		throw error;
	}
}

export async function getRuasPerigosasPorCidade(cidade) {
	try {
		const res = await prisma.ocorrencia.groupBy({
			by: ['uf','cidade','bairro','rua'],
			where: {
				cidade: cidade 
			},
			select: {
				uf: true,
				cidade: true,
				bairro: true,
				rua: true,
			},
			_count: true,
			orderBy: {
				_count: {
					rua: 'desc'
				}
			},
			take: 10
		});
		return res;
	} catch (error) {
		throw error;
	}
}

export async function getRuasPerigosasPorBairro(bairro) {

	try {
		const res = await prisma.ocorrencia.groupBy({
			by: ['uf','cidade','bairro','rua'],
			where: {
				bairro: bairro
			},
			select: {
				uf: true,
				cidade: true,
				bairro: true,
				rua: true,
			},
			_count: true,
			orderBy: {
				_count: {
					rua: 'desc'
				}
			},
			take: 10
		});
		return res;
	} catch (error) {
		throw error;
	}
}


export async function getRuasPerigosasPorUF(uf) {
	
	try {
		const res = await prisma.ocorrencia.groupBy({
			by: ['uf','cidade','bairro','rua'],
			where: {
				uf: uf.toUpperCase()
			},
			select: {
				uf: true,
				cidade: true,
				bairro: true,
				rua: true,
			},
			_count: true,
			orderBy: {
				_count: {
					rua: 'desc'
				}
			},
			take: 10
		});
		return res;
	} catch (error) {
		throw error;
	}
}
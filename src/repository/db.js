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

export async function getRuasPerigosas(cidade) {
	try {
		const res = await prisma.ocorrencia.findMany({
			where: {
				cidade: cidade
			}
		})

		return res;
	} catch (error) {
		throw error;
	}
}
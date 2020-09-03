import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Grade = db.grade;

const create = async (req, res) => {
	try {
		if (!req.body) {
			res.status(500).send({ message: 'Erro: Campos Vazios!' });
		}
		const { name, subject, type, value } = req.body;
		const grade = new Grade({
			name,
			subject,
			type,
			value,
			lastModified: Date.now(),
		});

		const retorno = await grade.save();
		if (!retorno) {
			res.status(500).send({
				message: error.message || 'Algum erro ocorreu ao salvar',
			});
		} else {
			res.send({ message: 'Grade inserido com sucesso' });
			logger.info(`POST /grade - ${JSON.stringify()}`);
		}
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Algum erro ocorreu ao salvar',
		});
		logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
	}
};

const findAll = async (req, res) => {
	const name = req.body.name;

	//condicao para o filtro no findAll
	var condition = name
		? { name: { $regex: new RegExp(name), $options: 'i' } }
		: {};
	try {
		const retorno = await Grade.find(condition);
		res.json(retorno);
		logger.info(`GET /grade`);
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Erro ao listar todos os documentos',
		});
		logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
	}
};

const findOne = async (req, res) => {
	const _id = req.params.id;

	try {
		const retorno = await Grade.findById({ _id });
		res.status(200).send(retorno);
		logger.info(`GET /grade - ${_id}`);
	} catch (error) {
		res
			.status(500)
			.send({ message: 'Erro ao buscar o Grade id: ' + _id });
		logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
	}
};

const update = async (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'Dados para atualizacao vazio',
		});
	}

	const id = req.params.id;
	const { name, subject, type, value } = req.body;
	try {
		const retorno = await Grade.findByIdAndUpdate(
			{ _id: db.mongoose.Types.ObjectId(id) },
			{
				name,
				subject,
				type,
				value,
				lastModified: Date.now(),
			}
		);
		res.send(retorno);
		logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
	} catch (error) {
		res
			.status(500)
			.send({ message: 'Erro ao atualizar a Grade id: ' + id });
		logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
	}
};

const remove = async (req, res) => {
	const id = req.params.id;

	try {
		const retorno = await Grade.findByIdAndDelete({ _id: id });
		res.send(retorno);
		logger.info(`DELETE /grade - ${id}`);
	} catch (error) {
		res.status(500).send({
			message: 'Nao foi possivel deletar o Grade id: ' + id,
		});
		logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
	}
};

const removeAll = async (req, res) => {
	try {
		logger.info(`DELETE /grade`);
	} catch (error) {
		res
			.status(500)
			.send({ message: 'Erro ao excluir todos as Grades' });
		logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
	}
};

export default {
	create,
	findAll,
	findOne,
	update,
	remove,
	removeAll,
};

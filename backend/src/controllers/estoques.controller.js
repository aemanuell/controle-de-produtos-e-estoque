const Estoque = require('../models/estoque.model');
module.exports = {
    async index(req, res){
        const stock = await Estoque.find();
        res.json(stock);
    },
    async create(req, res){
        const {nome_estoque, descricao_estoque, numeracao_estoque, qtd_estoque} = req.body;

        let data = {};

        let stock = await Estoque.findOne({nome_estoque});
        if(!stock){
            data = {nome_estoque, descricao_estoque, numeracao_estoque, qtd_estoque};
            stock = await Estoque.create(data);
            return res.status(200).json(stock);
        }else {
            return res.status(500).json(stock);
        }
    },
    async details(req, res){
        const {_id} = req.params;
        const stock = await Estoque.findOne({_id});
        res.json(stock);
    },
    async delete(req, res){
        const {_id} = req.params;
        const stock = await Estoque.findByIdAndDelete({_id})

        res.json(stock);
    },

    async update(req, res){
        const {_id, nome_estoque, descricao_estoque, numeracao_estoque, qtd_estoque} = req.body;
        const data = {nome_estoque, descricao_estoque, numeracao_estoque, qtd_estoque};
        const stock = await Estoque.findOneAndUpdate({_id}, data, {new:true});
        res.json(stock);
    }
}
const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome_estoque: String,
    descricao_estoque: String,
    numeracao_estoque: Number,
    qtd_estoque: {type:Number, defalt:0}
}, {
    timestamps:true
});

const estoques = mongoose.model('Estoques', DataSchema);

module.exports = estoques;
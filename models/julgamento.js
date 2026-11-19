import conexao from '../config/conexao.js'

const Julgamento = conexao.Schema({
    nome: {type:String, required:true},
    area: {type:String, required:true},
    anofundacao: {type:Number, required:true},
    datadojulgamento: {type:Date, required:true},
    valorindenizacao: {type:Number, default:0}
}, { toJSON: { getters: true }, toObject: { getters: true }, bufferCommands: false })

export default conexao.model('Julgamento', Julgamento)
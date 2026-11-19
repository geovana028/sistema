import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js'; // rotas externas
import casoRoutes from './routes/CasoRoutes.js'; // rotas externas
import julgamentoRoutes from './routes/JulgamentoRoutes.js';  // rotas externas
import empresaRoutes from './routes/EmpresaRoutes.js'; 
import siteRoutes from './routes/SiteRoutes.js';  // rotas externas
import mongoose, { conectarBanco } from './config/conexao.js';


const PORT = 3000
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '/public')));
app.set('views', join(__dirname, '/views'));

// Rotas
app.use(casoRoutes);
app.use(julgamentoRoutes);
app.use(empresaRoutes);
app.use(routes);
app.use(siteRoutes);

const paginasLegadas = {
  '/index.html': '/site/casos',
  '/casos.html': '/site/casos',
  '/empresas.html': '/site/empresas',
  '/tribunais.html': '/site/tribunais',
  '/curiosidades.html': '/site/curiosidades',
  '/busca.html': '/site/busca',
  '/login.html': '/site/login'
};

for (const [paginaLegada, paginaAtual] of Object.entries(paginasLegadas)) {
  app.get(paginaLegada, (req, res) => {
    res.redirect(301, `${paginaAtual}${req.originalUrl.slice(paginaLegada.length)}`);
  });
}

app.use((req, res) => {
  res.status(404).send('Página não encontrada');
});

app.use((err, req, res, next) => {
  console.error(err);
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).send('Banco de dados indisponível. Configure MONGODB_URI e reinicie o servidor.');
  }
  res.status(err.status || 500).send('Erro interno do servidor');
});

try {
  await conectarBanco();
} catch (erro) {
  console.error('Não foi possível conectar ao MongoDB:', erro.message);
}

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// Exporta o handler compatível com Vercel
export default app;
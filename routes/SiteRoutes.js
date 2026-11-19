import express from 'express';
const router = express.Router();
//Busca o AlunoController
import SiteController from '../controllers/SiteController.js'
const controle = new SiteController();

const caminhobase = 'site/'

router.get('/' + caminhobase, controle.home)
router.get('/' + caminhobase + 'login', controle.login)
router.get('/' + caminhobase + 'casos', controle.casos)
router.get('/' + caminhobase + 'empresas', controle.empresas)
router.get('/' + caminhobase + 'busca', controle.busca)
router.get('/' + caminhobase + 'curiosidades', controle.curiosidades)
router.get('/' + caminhobase + 'tribunais', controle.tribunais)

export default router
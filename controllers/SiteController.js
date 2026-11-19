import empresa from '../models/empresa.js'
import caso from '../models/caso.js'

export default class SiteController {

  constructor() {
    this.home = async (req, res) => {
      res.redirect('/site/casos');
    };

    this.login = (req, res) => {
      res.render('site/login');
    };

    this.casos = async (req, res) => {
      const Casos = await caso.find({});
      res.render('site/casos', { Casos });
    };

    this.empresas = async (req, res) => {
      const Empresas = await empresa.find({});
      res.render('site/empresas', { Empresas });
    };

    this.busca = (req, res) => {
      res.render('site/busca');
    };

    this.curiosidades = (req, res) => {
      res.render('site/curiosidades');
    };

    this.tribunais = (req, res) => {
      res.render('site/tribunais');
    };
  }
}
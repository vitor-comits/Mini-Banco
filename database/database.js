import sequelize from '../config/config.js'

async function connectToDatabase(){
  try {
    await sequelize.authenticate();
    console.log( 'Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.log('Erro ao conectar ao banco de dados:', error);
  }
}

connectToDatabase();
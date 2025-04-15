import { config } from 'dotenv';
config();
console.log('DATABASE_URL após dotenv.config():', process.env.DATABASE_URL);
import { Sequelize } from 'sequelize';



console.log('DATABASE_URL:', process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  } finally {
    // await sequelize.close();
  }
}

testConnection();
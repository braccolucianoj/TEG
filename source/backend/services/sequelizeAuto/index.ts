import SequelizeAuto from 'sequelize-auto';

const auto = new SequelizeAuto('teg_database', 'app_user', 'app_user_password', {
  host: 'localhost',
  dialect: 'postgres',
  directory: './services/sequelizeAuto/out/',
  port: 5432,
  caseModel: 'p',
  caseFile: 'p',
  caseProp: 'c',
  singular: true,
  additional: {
    timestamps: false,
  },
  lang: 'ts',
  views: true,
});

auto.run().then((data) => {});

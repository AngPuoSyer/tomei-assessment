import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../../modules/user/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mariadb',
        host: 'localhost',
        port: 3306,
        username: 'maria',
        password: 'maria',
        database: 'public',
      });
      sequelize.addModels([UserModel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

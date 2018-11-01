import {sequelize} from '../models';

(async () => {
    await sequelize.authenticate();
    await sequelize.sync({force: true});
    process.exit();
})();

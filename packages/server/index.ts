import {sequelize} from './src/models';
import app from './src';

// TODO: only force if dev mode
sequelize.sync({force: false}).then(() => {
    app.listen({port: 4000}, () => {
        // tslint:disable-next-line
        console.log('🚀 Server ready at http://localhost:4000');
    });
});

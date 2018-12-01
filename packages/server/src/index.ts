import {sequelize} from './models';
import app from './app';

// TODO: only force if dev mode
sequelize.sync({force: false}).then(() => {
    app.listen({port: 3000}, () => {
        // tslint:disable-next-line
        console.log('🚀 Server ready at http://localhost:3000');
    });
});

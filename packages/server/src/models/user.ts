import * as Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

export interface UserAttributes {
    id?: string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}

const generatePasswordHash = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

export type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;

const user = (sequelize: Sequelize.Sequelize) => {
    const attributes = {
        id: {type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4},
        email: {type: Sequelize.STRING, uniqu: true, allowNull: false, primaryKey: true},
        password: {type: Sequelize.STRING, allowNull: false, len: [6, 12]},
    };

    const User = sequelize.define<UserInstance, UserAttributes>('user', attributes);

    User.beforeCreate(async user => {
        user.password = await generatePasswordHash(user.password);
    });

    // User.associate = models => {
    //     User.hasMany(models.Message);
    // };

    return User;
};

export default user;

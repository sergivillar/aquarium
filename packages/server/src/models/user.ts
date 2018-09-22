import * as Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface UserAttributes {
    id?: string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}

export type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;

const generatePasswordHash = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

export const validatePassword = async (password: string, userPassword: string): Promise<Boolean> => {
    return await bcrypt.compare(password, userPassword);
};

export const createToken = async (user: UserInstance, secret: string): Promise<string> => {
    const {id, email} = user;
    return await jwt.sign({id, email}, secret);
};

// TODO: validate user email
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

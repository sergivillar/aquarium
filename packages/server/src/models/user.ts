import * as Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUserAttributes {
    id?: string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}

export type UserInstance = Sequelize.Instance<IUserAttributes> & IUserAttributes;

const generatePasswordHash = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

export const validatePassword = async (password: string, userPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, userPassword);
};

export const createToken = async (userInstance: UserInstance): Promise<string> => {
    const {id, email} = userInstance;

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        console.error('JWT Secret not defined');
    }

    return await jwt.sign({id, email}, secret || 'secret');
};

// TODO: validate user email
const user = (sequelize: Sequelize.Sequelize) => {
    const attributes = {
        id: {type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4},
        email: {type: Sequelize.STRING, unique: true, allowNull: false, primaryKey: true},
        password: {
            type: Sequelize.STRING,
            validate: {len: {msg: 'Password length must be between 6 and 12', args: [6, 12]}},
        },
    };

    // @ts-ignore
    const User = sequelize.define<UserInstance, IUserAttributes>('users', attributes, {
        freezeTableName: true,
    });

    User.beforeCreate(async (userInstance: UserInstance) => {
        userInstance.password = await generatePasswordHash(userInstance.password);
    });

    User.associate = (models: any) => {
        User.hasMany(models.Aquarium, {foreignKey: 'user_id'});
    };

    return User;
};

export default user;

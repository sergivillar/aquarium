import * as Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUserAttributes {
    id?: string;
    email: string;
    password: string;
    refreshToken?: string;
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

    return await jwt.sign({id, email}, secret || 'secret', {
        expiresIn: Number(process.env.JWT_ACCESS_TOKEN_TTL),
    });
};

export const createRefreshToken = async (userInstance: UserInstance): Promise<string> => {
    const {id, email} = userInstance;

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        console.error('JWT Secret not defined');
    }

    const refreshToken = await jwt.sign({id, email}, secret || 'secret', {
        expiresIn: Number(process.env.JWT_REFRESH_TOKEN_TTL),
    });

    await userInstance.update({refreshToken});

    return refreshToken;
};

export const verifyToken = async (token: string) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        console.error('JWT Secret not defined');
    }

    return await jwt.verify(token, process.env.SECRET || 'secret');
};

// TODO: validate user email
const user = (sequelize: Sequelize.Sequelize) => {
    const attributes = {
        id: {type: Sequelize.UUID, primaryKey: true, unique: true, defaultValue: Sequelize.UUIDV4},
        email: {type: Sequelize.STRING, unique: true, allowNull: false, primaryKey: true},
        password: {
            type: Sequelize.STRING,
            validate: {len: {msg: 'Password length must be between 6 and 12', args: [6, 12]}},
        },
        refreshToken: {type: Sequelize.STRING},
    };

    // @ts-ignore
    const User = sequelize.define<UserInstance, IUserAttributes>('users', attributes, {
        freezeTableName: true,
    });

    User.beforeCreate(async (userInstance: UserInstance) => {
        userInstance.password = await generatePasswordHash(userInstance.password);
    });

    User.associate = (models: any) => {
        User.hasMany(models.Aquarium, {foreignKey: 'userId'});
    };

    return User;
};

export default user;

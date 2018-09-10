import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
}

const generatePasswordHash = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const UserSchema = new Schema({
    email: {type: String, required: true, index: true, unique: true},
    password: {type: String, required: true, minlength: 6, maxlength: 12},
});

UserSchema.pre<IUser>('save', async function() {
    const hash = await generatePasswordHash(this.password);
    this.password = hash;
});

export default mongoose.model<IUser>('User', UserSchema);

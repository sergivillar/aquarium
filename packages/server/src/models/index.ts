import mongoose from 'mongoose';

const db = mongoose.connection;

function init() {
    mongoose.connect(
        'mongodb://localhost:27017/local',
        {useNewUrlParser: true}
    );
}

db.on('error', () => {
    console.log('FAILED to connect to MongoDB');
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default {init};

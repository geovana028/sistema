import mongoose from 'mongoose';

export async function conectarBanco() {
    const url = process.env.MONGODB_URI;

    if (!url) {
        console.warn('MONGODB_URI não configurada. Configure a variável para acessar os dados.');
        return false;
    }

    await mongoose.connect(url, { serverSelectionTimeoutMS: 10000 });
    console.log('MongoDB conectado.');
    return true;
}

export default mongoose;
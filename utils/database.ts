import { connection, connect } from 'mongoose';

export const connectDB = async () => {
    try {
        if (!process.env.URI) {
            console.log("Please add URI for connection!");
        }

        if (connection.readyState === 1) {
            return connection.asPromise();
        }

        return await connect(process.env.URI as string);

    } catch (error: any) {
        console.log(error.message);
    }
};
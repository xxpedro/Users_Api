import mongoose, { ConnectOptions } from 'mongoose';

const databaseConnection = async (): Promise<void> => {
    try {
        const options: ConnectOptions = {
            writeConcern: { w: 'majority' },
        };
        await mongoose.connect(process.env.CONNECTION_STRING!, options)
        
        const connection = mongoose.connection;

        connection.once('open', () => {
           console.log('conexion a la db exitosa');
        });

        connection.on('error', err => {
              console.log(err);
              process.exit(0);
            });

    } catch (error) {
        console.error(error);
    }
};

export default databaseConnection






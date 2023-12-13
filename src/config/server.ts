import express, { Application } from 'express';
import cors from 'cors';
import userRouter from '../routes/userRoutes';
import databaseConnection from './database/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPath = {
        users: '/api/user'
    };

    constructor() {
        // Server
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Middlewares
        this.middlewares();
        
        // Routes
        this.routes();

        //Conect to database
        this.dbConnection();
    }

    private routes() {
        this.app.use(this.apiPath.users, userRouter);
    }

    private middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    private async dbConnection() {
        await databaseConnection();
    }

    public startServer() {
        this.app.listen(this.port, () => {
            console.log(`Servidor arriba en el puerto ${this.port}`);
        });
    }
}

export default Server;

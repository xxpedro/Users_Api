import dotenv from 'dotenv'
import Server from './src/config/server'
dotenv.config();
const server = new Server();
server.startServer();
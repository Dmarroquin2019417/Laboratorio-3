'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import adminRoutes from '../src/admin/admin.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import empresaRoutes from '../src/company/company.routes.js'; 

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath = '/gestor/v1/users';
        this.authPath = '/gestor/v1/auth';
        this.empresaPath = '/gestor/v1/companies'; // Corregido el nombre del path para empresas

        this.middlewares();  // Configura los middleware de la aplicación
        this.conectarDB();  // Establece la conexión a la base de datos
        this.routes();  // Configura las rutas de la aplicación
    }

    // Conecta a la base de datos MongoDB
    async conectarDB() {
        await dbConnection();
    }

    // Configura los middleware de la aplicación
    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    // Configura las rutas de la aplicación
    routes() {
        this.app.use(this.adminPath, adminRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.empresaPath, empresaRoutes); 
    }

    // Inicia el servidor y escucha en el puerto especificado
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;

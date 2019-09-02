
import { Application } from 'egg';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

export default (app: Application) => {
    app.beforeStart(async () => {
        await createConnection(app.config.postgres);
    });
};

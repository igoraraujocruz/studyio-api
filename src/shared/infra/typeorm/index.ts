import { createConnection, getConnectionOptions } from 'typeorm';

const host = process.env.NODE_ENV === 'dev' ? 'database' : 'localhost';

interface IOptions {
    host: string;
}

getConnectionOptions().then(options => {
    const newOptions = options as IOptions;
    newOptions.host = host;
    createConnection({
        ...options,
    }).then(() => console.log('Database connected'));
});

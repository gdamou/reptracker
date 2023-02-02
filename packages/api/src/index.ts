import { MikroORM } from '@mikro-orm/postgresql';
import { fastify } from 'fastify';
import pino from 'pino';
const Port = process.env.PORT || 7000;

// const orm = await MikroORM.init(options)

// const mikroORM = {
//   orm
// }


const server = fastify({
    logger: pino({ level: 'info' })
});

// server.decorate('mikroORM', mikroORM)

const start = async () => {
    try {
        await server.listen(Port);
        console.log('Server started successfull');
        
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
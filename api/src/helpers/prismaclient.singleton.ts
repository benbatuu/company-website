import { PrismaClient } from '../../prisma/generated/client';
let instance: PClient;
const client = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'stdout',
            level: 'error',
        },
        {
            emit: 'stdout',
            level: 'info',
        },
        {
            emit: 'stdout',
            level: 'warn',
        },
    ],
});

client.$on('query', (e) => { });

class PClient {
    constructor() {
        if (instance) {
            throw new Error('You can only create one instance!');
        }
        instance = this;
    }

    client() {
        return client;
    }
}

const pc = Object.freeze(new PClient());
export default pc.client();

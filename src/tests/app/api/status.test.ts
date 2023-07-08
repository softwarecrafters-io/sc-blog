import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

let server;
let listener:any;

beforeAll(async () => {
    const app = next({ dev: true, dir: './' });
    const handle = app.getRequestHandler();

    await app.prepare();

    server = createServer((req, res) => {
        const parsedUrl = parse(req.url!, true);
        handle(req, res, parsedUrl);
    });

    listener = server.listen();
})

afterAll(async () => {
    if (listener) {
        listener.close();
    }
})

describe('Status API', () => {
    it('should return "It Works!"', async () => {
        const response = await fetch(`http://localhost:${listener.address().port}/api/status`);
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual({ message: 'It Works!' });
    });
});

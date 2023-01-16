import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { createReadStream } from 'fs';
import { getRequestData, writeRes } from './utils';
import { api, IResponse, IUser } from './api';

dotenv.config();

const port = process.env.PORT || '4000';

const server = createServer(async (req, res) => {
  const url = (req.url || '').replace(/^\//gm, '').replace(/\/$/gm, '');
  const adress: string[] = url.split('/');

  // Выдача favicon.ico
  if (url === 'favicon.ico') {
    createReadStream('favicon.ico').pipe(res);
    return;
  }
  let result: IResponse;
  switch (url) {
    // Ответы api/users
    case 'api/users': {
      // POST
      if (req.method === 'POST') {
        await getRequestData(req, async (body: IUser) => {
          result = await api.users.post(body);
          writeRes(result, res);
        });
      } else {
        // другие методы (код 200 только у GET, у остальных 405)
        result = await api.users.getAll(req.method);
        writeRes(result, res);
      }
      break;
    }
    // Обработка других эндпоинтов
    default: {
      // Проверка на соответствие url существующим эндпоинтам (api/[modelName]/id)
      if (adress.length === 3 && adress[0] === 'api') {
        const [, modelName, id] = adress;

        // проверка по api/users/id
        if (modelName === 'users') {
          // Обработка разрешённых методов
          switch (req.method) {
            case 'GET': {
              result = await api[modelName].get(id);
              writeRes(result, res);
              break;
            }
            case 'DELETE': {
              result = await api[modelName].delete(id);
              writeRes(result, res);
              break;
            }
            case 'PUT': {
              await getRequestData(req, async (body: IUser) => {
                result = await api[modelName].put(id, body);
                writeRes(result, res);
              });
              break;
            }
            default:
              result = { code: 405, message: 'Wrong method.' };
              writeRes(result, res);
          }
        }
      } else {
        result = { code: 404, message: 'Requests to non-existing endpoints.' };
        writeRes(result, res);
      }
    }
  }
}).listen(port, () => {
  const address = server.address();
  const binding = typeof address === 'string' ? `pipe/socket ${address}` : `port ${address?.port}`;
  console.log(`[\x1b[32mINFO\x1b[0m] The server is running on ${binding}`);
});

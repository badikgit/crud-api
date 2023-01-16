import { IncomingMessage } from 'http';

export async function getRequestData(request: IncomingMessage, callback: CallableFunction) {
  const contentType = 'application/json';
  if (request.headers['content-type'] === contentType) {
    let body = '';
    request.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });
    request.on('end', () => {
      try {
        callback(JSON.parse(body));
      } catch (error) {
        callback(null);
      }
    });
  } else {
    callback(null);
  }
}

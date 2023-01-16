import { IncomingMessage, ServerResponse } from 'http';
import { IResponse } from 'api';

export const writeRes = (
  result: IResponse,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
) => {
  res.writeHead(result.code, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(result.data || { message: result.message }));
  res.end();
};

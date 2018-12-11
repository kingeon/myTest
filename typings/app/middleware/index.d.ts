// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Auth from '../../../app/middleware/auth';
import Logger from '../../../app/middleware/logger';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof Auth;
    logger: typeof Logger;
  }
}

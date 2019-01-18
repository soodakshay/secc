import * as express from 'express';
import ChaincodeFunc from '../core/functions';

export const authRouter = express.Router();

authRouter.post('/login',async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  let response = await ChaincodeFunc.loginUser(req.body.email, req.body.password)
  res.send(response)
})
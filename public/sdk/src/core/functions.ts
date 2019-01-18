import FabricComm from '../core/query-invoke';
import { ResponseModel } from '../core/model';
const fabricComm = new FabricComm();
import * as fs from 'fs';
import * as path from 'path';

const connectionProfilePath = path.resolve(__dirname, '..', '..', '..', 'connection.json')
const cpJSON = fs.readFileSync(connectionProfilePath, 'utf-8');
const connectionProfile = JSON.parse(cpJSON);
const channelName = "public.secc";
const chaincodeName = "secc";

export default class ChaincodeFunc{
    static async loginUser(email: string, password: string): Promise<ResponseModel> {
     try{
        let loginResponse = await fabricComm.query(channelName,'admin', "UserLogin",chaincodeName,{email:"akshay.sood@live.com",password:"abc123",role:1})
        return loginResponse
     }catch(error){
        let loginResponse = new ResponseModel("test",500,error);

        return loginResponse;
     }
        
    }
}
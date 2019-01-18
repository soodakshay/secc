
import * as fs from 'fs';
import * as path from 'path';
import { ResponseModel } from './model';
import { FileSystemWallet, Gateway } from 'fabric-network';
import CAClient from './fabric-ca-client';

const connectionProfilePath = path.resolve(__dirname, '..','..','connection.json')
const cpJSON = fs.readFileSync(connectionProfilePath,'utf-8');
const connectionProfile = JSON.parse(cpJSON);

const walletPath = path.resolve(__dirname, '..','..','wallet')
    
const wallet = new FileSystemWallet(walletPath);

export default class FabricComm{

    /**
     * This function will invoke chaincode function
     * @param channel - name of the channel
     * @param username - username
     * @param functionName - chaincode function name
     * @param data - request payload
     * @param chaincode - chaincode name
     */
    public async invoke(channel: string,
         username: string,
         functionName: string,
         data: any,
         chaincode: string): Promise<ResponseModel> {
            
        let response: ResponseModel
        const userExistenceErr = await this.checkUserExistence(username);
        
        if (userExistenceErr != null){
            response.message = userExistenceErr.message
            response.status = 500
            return response
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(connectionProfile, { wallet, identity: username, discovery: { enabled: true } });
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel);
        // Get the contract from the network.
        const contract = network.getContract(chaincode);
        const respBuffer = await contract.submitTransaction(functionName, JSON.stringify(data));
        
        response.message = "Success"
        response.status = 200
        response.data = JSON.parse(respBuffer.toString())
        return response
    }

    /**
     * This function will query blockchain
     * @param channel - Channel name
     * @param username - username of client
     * @param functionName - name of function to invoke
     * @param chaincode - chaincode name
     * @param queryData - request payload if any
     */
    public async query(channel: string,
        username: string,
        functionName: string,
        chaincode: string,
        queryData?: any
        ): Promise<ResponseModel>{
            try{
                let response= new ResponseModel();         
            

                const userExistenceErr = await this.checkUserExistence(username);
                
                if (userExistenceErr != null){
                    response.message = userExistenceErr.message
                    response.status = 500
                    return response
                }
    
                let caClient = new CAClient();
                await caClient.enrollUser()
        
                // Create a new gateway for connecting to our peer node.
                const gateway = new Gateway();
                await gateway.connect(connectionProfile, { wallet, identity: username, discovery: { enabled: true } });
                // Get the network (channel) our contract is deployed to.
                const network = await gateway.getNetwork(channel);
                // Get the contract from the network.
                const contract = network.getContract(chaincode);
                let respBuffer: Buffer
                if (queryData != null && queryData != undefined){
                    respBuffer = await contract.evaluateTransaction(functionName, JSON.stringify(queryData));
                }else{
                    respBuffer = await contract.evaluateTransaction(functionName);
                }
                            
                response.message = "Success"
                response.status = 200
                response.data = JSON.parse(respBuffer.toString())
                return response
            }catch(error){
                console.log(error)
return null;
            }
            
        }
/**
 * This function will check whether user certs exist in wallet or not
 * @param username username of user
 */
    private checkUserExistence(username: string): Promise<Error>{
        try{
            const userExist = wallet.exists(username);

            if(!userExist){
                throw new Error("Please enroll " + username + " first")
            }

        }catch(error){
            return error
        }
        
    }

    
}


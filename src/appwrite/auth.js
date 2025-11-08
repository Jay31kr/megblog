import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

class AuthService {

    client =new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email , passward, name}){

        try{
           const user = await  this.account.create( {userId: ID.unique(),  email , passward, name} );
            console.log(user);
            if(user){
               return  this.login({email, passward});
            }else {
                return user;
            }

        }catch(err){
            console.error(err);
        }
    }

    async login({email , passward}){

        try{

            const session = await this.account.createEmailPasswordSession({
                email ,
                passward
            });
            return session;


        }catch(err){
            console.error(err);
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(err){
            console.error(err);
        }

        return null;
    }

    async logOut(){
        try{
           await this.account.deleteSessions();
        }catch(err){
            console.error(err);
        }
    }


}


const autService = new AuthService();

export default AuthService;
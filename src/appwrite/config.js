import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";


class Service{
     client = new Client();
     databases 
     bucket

     constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
     }

     async createPost({title, slug, content, featuredImage, status, userId}){
           try{
            return await this.databases.createRow(
                {
                databaseId:conf.appwriteDatabaseId,
                collectionId : conf.appwriteCollectionId,
                rowId : slug,
                data : {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            }
            )
           }catch(err){
             console.error(err);
           }
     }

     async updatePost({title, slug, content, featuredImage, status, userId}){
            try{
                return await this.databases.updateRow({
                databaseId:conf.appwriteDatabaseId,
                collectionId : conf.appwriteCollectionId,
                rowId : slug,

                data:{
                     title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
              })  
            }catch(err){
                console.error(err);
            }
       
        
     }

     async deletePost(){
        try{
            await this.databases.deleteRow({
                databaseId:conf.appwriteDatabaseId,
                collectionId : conf.appwriteCollectionId,
                rowId : slug,
            })
            return true;
        }catch(err){
            console.error(err);
            return false;
        }
     }

     async  getPost(){
       try{
        return await this.databases.getRow({
            databaseId:conf.appwriteDatabaseId,
            collectionId : conf.appwriteCollectionId,
            rowId : slug,
        })

       }catch(err){
        console.error(err);
        return false
       }
     }

     async getPosts(){
        try{
            return await this.databases.getRows({
                 databaseId:conf.appwriteDatabaseId,
                  collectionId : conf.appwriteCollectionId,
                queries : [Query.equal("status", "active")]
            })
        }catch(err){
            console.error(err);
            return false;
        }
     }

     async upLoadFile(file){
        try{
            return await this.bucket.createFile({
                bucketId : conf.appwriteBucketId,
                fieldId : ID.unique(),
                file
            })
        }catch(err){
            console.error(err);
            return false;
        }
     }

     async deleteFile(fileId){
        try{
            await this.bucket.deleteFile({
                bucketID:  conf.appwriteBucketId,
                fileId
            })
            return true
        }catch(err){
            console.error(err);
            return false;
        }
     }

     async getFilePreview(fileId){
        return  this.bucket.getFilePreview({
            bucketId : conf.appwriteBucketId,
            fieldId 
        })
     }
    

}


const service = new Service()
export default service

  
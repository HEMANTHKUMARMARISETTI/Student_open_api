
import {PostCreateStudentProfileResponse,DeleteDeleteStudentResponse,GetGetStudentdetailsResponse,PutUpdateStudentResponse,StudentApi } from "../../../dict/api/student/types";
import { Api } from "../../../dict/models";
import {collections} from '../../admin/types'


export class StudentApiImpl implements StudentApi {
    getGetStudentdetails(): Promise<GetGetStudentdetailsResponse>  {
        return new Promise<GetGetStudentdetailsResponse>((resolve,reject)=>{
            collections.students!.find({}).toArray(function (err: any,result:any){
                if(err) {
                    const response=<GetGetStudentdetailsResponse>{
                        status: 400,
                       body:{message: `something went wrong`},
                    }
                    resolve(response)                   
                }
                const response=<GetGetStudentdetailsResponse>{
                    status:201,
                    body: result
                }
                resolve(response)    
            })  
        })   
    }

    deleteDeleteStudent(id: number):Promise<DeleteDeleteStudentResponse>{
    return new Promise<DeleteDeleteStudentResponse>((resolve,reject)=>{
        collections.students!.deleteOne(
            {id:id},
            function(err: any,result: any){
                if(err){
                    const response=<DeleteDeleteStudentResponse>{
                        status:400,
                        body:{message:`someting went wrong`}
                    }
                    resolve(response)
                }
                const response=<DeleteDeleteStudentResponse>{
                    status:201,
                    body:{
                        message:`delete User Sucessfully`
                    }
                }
                resolve(response)
            }
        )
        
    })
 }

 putUpdateStudent (id: number, request: Api.BODYDATA | undefined) : Promise<PutUpdateStudentResponse>
 {
    return new Promise<PutUpdateStudentResponse>((resolve,reject)=>{
        collections.students!.updateOne(
            {id:id},
            {$set:request},
            function(err:any,result: any){
                if(err){
                    const response=<PutUpdateStudentResponse>{
                        status: 400,
                        body:{message:`Somting Went Wrong`}
                    }
                    resolve(response)
                }
                const response=<PutUpdateStudentResponse>{
                    status:201,
                    body:{message:`Update User Sucessfully`}
                }
                resolve(response)
               
            }    
        )

    })
 }


 postCreateStudentProfile(request: Api.BODYDATA | undefined): Promise<PostCreateStudentProfileResponse>
 {
    return new Promise<PostCreateStudentProfileResponse>((resolve,reject)=>{
        collections.students!.findOne(
            {id:request?.id},
            function(err:any,result:any){
                if(result){
                    const response=<PostCreateStudentProfileResponse>{
                        status:400,
                        body:{message:`Student Already Created`}
                    }
                    resolve(response)
                }
                else{
                    collections.students!.insertOne(
                        {id:request?.id,name:request?.name},
                        function(err:any,result:any){
                          if(err){
                            const response=<PostCreateStudentProfileResponse>{
                                status:400,
                                body:{message:`Someting Went Wrong`}
                            }
                            resolve(response)
                          }
                          else{
                            const response=<PostCreateStudentProfileResponse>{
                                status:201,
                                body:{message:`Create User Sucessfuly`}
                            }
                            resolve(response)
                          }
                            
                        }

                    )
                }
            }
        )
    })
 }
}

   
  









import * as mongoDB from "mongodb"

export const collections:{students?: mongoDB.Collection}={}

export async function connectToDatabase() {
    const client:mongoDB.MongoClient=new mongoDB.MongoClient(
       "mongodb+srv://hemanth:hemanth1234@hemanth.8361ygh.mongodb.net/"
   
    )

    await client.connect()

    const db:mongoDB.Db=client.db("student_db")
    
    const students:mongoDB.Collection=db.collection("student")

    collections.students=students
}


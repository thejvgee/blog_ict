import { connectDB } from "@/BackendLogic/DbConfig/config";
import BlogSchema from "@/BackendLogic/Schema/BlogSchema";
import { NextResponse } from "next/server";


export async function GET(req , content){
  await connectDB()
  try {
    const id =await content.params.id
    const singleBlog = await BlogSchema.findById(id)

    if (!singleBlog) {
      throw new Error('Error in Blog Fetching')
    }

    return NextResponse.json({msg : 'Blog fetched', success : true, singleBlog} , {status : 200})
    
  } catch (error) {

    return NextResponse.json({msg : 'Blog fetching Failed', error, success : false} , {status : 400})
  }
}
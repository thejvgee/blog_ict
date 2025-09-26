import { connectDB } from "@/BackendLogic/DbConfig/config";
import BlogSchema from "@/BackendLogic/Schema/BlogSchema";
import { NextResponse } from "next/server";


export async function GET(req){
  await connectDB()
  const aaa = await req.headers.get('name')
  try {
    const allBlogs = await BlogSchema.find()
    return NextResponse.json({msg : 'All Blogs fetched', success : true , allBlogs}, {status : 200})
  } catch (error) {
    return NextResponse.json({msg : 'Blogs fetcheing failed',error : error, success : false}, {status : 400})
  }
}
export async function POST(req){
  connectDB()
  try {
    const tags =await req.json()

    let allTagBlogs;

    if (!tags.length) {
      const allData = await BlogSchema.find()
      allTagBlogs = allData.reverse()
    }else{
       const TagsBlog = await BlogSchema.find({tags : {$in : tags}})
       allTagBlogs = TagsBlog.reverse()
    }

    return NextResponse.json({msg : 'All Blogs fetched', success : true , allTagBlogs}, {status : 200})
  } catch (error) {
 
    return NextResponse.json({msg : 'Blogs fetcheing failed',error : error, success : false}, {status : 400})
  }
}
import { connectDB } from "@/BackendLogic/DbConfig/config"
import BlogSchema from "@/BackendLogic/Schema/BlogSchema"
import { NextResponse } from "next/server"


export async function PUT(req, content){
  await connectDB()
  try {
    const {id} = await content.params
    const {title , description, about, tags, img} =await req.json()

    const EditedBlog =await BlogSchema.findByIdAndUpdate(id ,{
      title,
      description,
      about,
      tags,
      img
    })

   await EditedBlog.save()

   return NextResponse.json({msg : 'Blog Zasagdlaa', success : true, EditedBlog }, {status :201})

  } catch (error) {
    return NextResponse.json({msg : 'Blog zasagdahad aldaa garloo',error, success : false}, {status :400})
  }
}
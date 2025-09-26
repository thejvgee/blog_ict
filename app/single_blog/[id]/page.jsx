
import { api } from '@/FrontendLogic/AxiosConfig/config'
import DeleteButton from '@/FrontendLogic/components/DeleteButton'
import DropDown from '@/FrontendLogic/components/DropDown'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const SingleBlog =async ({ params }) => {

  const id = params.id

let arr = ["Sport" , "Politics", 'AI', "Movies", "Anime", "Tech", "Nature", "Food", "Animals", "Music", "Fashion"]

let singleBlog;

 const getSingleBlogData = async () => {
  try {
    const response = await api.get(`/blog/single_blog/${id}`)
    if (response.data.success) {
      singleBlog = response.data.singleBlog
    }
  } catch (error) {
    
  }
 }

 await getSingleBlogData()
  return (
    <div className='bg-[#fffdf8] pt-8 pb-48'>
      <div className=' max-w-[1000px] m-auto flex flex-col pt-5  gap-y-6  gradientSingle  cursor-pointer'>
        <div className=' flex flex-col gap-y-3 '>
        <p className=' text-3xl text-center font-primary'>Title : </p>
        <span className=' text-2xl text-center font-heading  '>{singleBlog?.title}</span>
        </div>
        <div className='w-3/4 m-auto'>
          <Image width={3000} height={400} alt='Blog image' src={singleBlog?.img} className=' rounded-lg' />
        </div>
        <div>
          <p className=' text-center font-primary text-2xl my-2'>Tags : </p>
          <div className=' flex justify-center'>
            {singleBlog?.tags?.map((tag)=> (
              <span key={tag} className=' text-[15px] mx-2 text-center'>{tag}</span>
            ))}
            </div>

        </div>
        <div className='w-3/4 m-auto'>
        <p className=' text-center font-primary text-2xl my-2'>About : </p>
        <p className=' font-fourth text-lg font-thin text-center'>{singleBlog?.about}</p>
        </div>
        <div className=' px-4 mb-8' >
          <p className=' text-center font-primary text-2xl my-2'>Description : </p>
        <p className="whitespace-pre-wrap font-thin font-fourth text-lg">{singleBlog?.description}</p>
        </div>

        {/* <p className=" flex justify-around mt-2 mb-8"> 
          <DeleteButton id={singleBlog?._id}/>
           <Link href={`/edit_blog/${singleBlog?._id}`} className="  px-6  bg-yellow-500 py-1 rounded-md"><FaRegEdit size={20}  color="white" /></Link>
          </p> */}
      </div>
    </div>
  )
}

export default SingleBlog
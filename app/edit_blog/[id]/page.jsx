"use client"
import { api } from '@/FrontendLogic/AxiosConfig/config'
import { CreateBlogSchema } from '@/FrontendLogic/Yup/Yup'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoRemoveCircleOutline } from 'react-icons/io5'

const EditBlog = () => {
let arr = ["Sport" , "Politics", 'AI', "Movies", "Anime", "Tech", "Nature", "Food", "Animals", "Music", "Fashion"]  
  const [singleBlog, setsingleBlog] = useState(null)

  const navigate = useRouter()

  const [addedtag, setaddedtag] = useState([])

  const {id} = useParams()

  const getSingleBlogData = async () => {
    try {
      const response = await api.get(`api/blog/single_blog/${id}`)
      if (response.data.success) {
        // console.log();
        setsingleBlog(response.data.singleBlog)
      }
    } catch (error) {
    }
   }
  useEffect(() => {
    getSingleBlogData()

  }, [])
  


  const handleAdd = (tag) => {
    const isInclude = addedtag.includes(tag)

    if (isInclude) {
      const newTag = addedtag.filter((val)=> {
        return val !== tag
      })

      setaddedtag(newTag)
      
    }
    else{
      setaddedtag([...addedtag, tag])

    }
  }

 
  

  const {values, touched, errors, handleChange, handleSubmit} = useFormik({
    initialValues : {title : `` , about :``, img : ``, description : `` , tags : []},
    validationSchema : CreateBlogSchema,
    onSubmit :async (value , action)=>{
      value.tags = addedtag
      try {
        const res = await api.put(`/blog/edit_blog/${id}`, value)

        if (res.data.success) {
          toast.success(res.data.msg)
          navigate.push('/')
        }
      } catch (error) {
        
      }
    }
  })

  useEffect(() => {
    if (singleBlog) {
      values.title = singleBlog.title,
      values.img = singleBlog.img,
      values.description = singleBlog.description,
      values.about = singleBlog.about
      setaddedtag(singleBlog.tags)
    }
  
 
  }, [singleBlog])
  return (
    <div  className=" max-w-2xl mx-auto   my-4 pb-48">
  <form className="mt-8 space-y-6 border pb-6 px-3 pt-2" action="" onSubmit={handleSubmit}>
    <div>
      <label className="block  font-medium text-gray-700" htmlFor="title">Title :</label>
      <input type="text" name='title' id='title' maxLength={80} placeholder='Enter title here' value={values.title} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 outline-none border"/>
      {touched.title && errors.title && (<p className="text-red-500">{errors.title}</p>)}
    </div>
    <div className='  grid grid-cols-6 gap-x-2 gap-y-2'>

    {
      addedtag.map((tag)=>
      (
        <span key={tag} className=' border text-center bg-green-300 py-1 rounded-md'>{tag}</span>
      ))
    }
    </div>
    <div>
      <label className="block font-medium text-gray-700" htmlFor="img">Image Src :</label>
      <input type="text" name='img' id='img' placeholder='Enter image src here' value={values.img} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 outline-none border"/>
      {touched.img && errors.img && (<p className="text-red-500">{errors.img}</p>)}
    </div>
    <p className="block  font-medium text-gray-700" htmlFor="about">Select Tags :</p>
    <div className=' grid grid-cols-6 gap-2'>
      {arr.map((tag)=> (
        <p key={tag} onClick={()=>handleAdd(tag)} className={`border text-center px-3 py-1 cursor-pointer ${addedtag.includes(tag) ? " bg-red-400" : ""}`}>{tag} {addedtag.includes(tag) ? <IoRemoveCircleOutline className=' inline' /> : ''}</p>
      ))}
    </div>
    <div>
      <label className="block  font-medium text-gray-700" htmlFor="about">About :</label>
      <input type="text" name='about' maxLength={200} id='about' placeholder='Enter about here' value={values.about} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 outline-none border"/>
      {touched.about && errors.about && (<p className="text-red-500">{errors.about}</p>)}
    </div>
    <div>
      <label className="block  font-medium text-gray-700" htmlFor="description">Description :</label>
      <textarea  type="text" name='description' id='description' placeholder='Enter description here' value={values.description} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 outline-none border h-80"/>
      {touched.description && errors.description && (<p className="text-red-500">{errors.description}</p>)}
    </div>

    <div className=' flex justify-center'>
      <input type="submit" value={'Upload Edit'} className="w-[200px] p-3 bg-[#fdc300] text-gray-800 text-lg rounded-md hover:bg-[#ffde72] cursor-pointer"/>
    </div>
  </form>
</div>

  )
}

export default EditBlog
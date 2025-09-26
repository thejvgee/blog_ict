"use client"
import { api } from '@/FrontendLogic/AxiosConfig/config'
import { CreateBlogSchema } from '@/FrontendLogic/Yup/Yup'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoRemoveCircleOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { Editor } from '@tinymce/tinymce-react'// rich text editor

const CreateBlog = () => {
  let arr = ["Sport" , "Politics", 'AI', "Movies", "Anime", "Tech", "Nature", "Food", "Animals", "Music", "Fashion"]
  const navigate = useRouter()

  const [addedtag, setaddedtag] = useState([])

  const handleAdd = (tag) => {
    const isInclude = addedtag.includes(tag)
    if (isInclude) {
      const newTag = addedtag.filter((val)=> val !== tag)
      setaddedtag(newTag)
    } else {
      setaddedtag([...addedtag, tag])
    }
  }

  const {values, touched, errors, handleChange, handleSubmit, setFieldValue} = useFormik({
    initialValues : {title : "" , about : "", img : "", description : "" , tags : []},
    validationSchema : CreateBlogSchema,
    onSubmit :async (value , action)=>{
      value.tags = addedtag
      try {
        const res = await api.post('/blog/create_blog', value)
        if (res.data.success) {
          toast.success(res.data.msg)
          navigate.push('/')
        }
      } catch (error) {
        toast.error("Something went wrong")
      }
    }
  })

  return (
    <div className=" max-w-2xl mx-auto my-4 pb-48">
      <form className="mt-8 space-y-6 border pb-6 px-3 pt-2" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700" htmlFor="title">Title :</label>
          <input type="text" name='title' id='title' maxLength={80} placeholder='Enter title here'
            value={values.title} onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 outline-none border"/>
          {touched.title && errors.title && (<p className="text-red-500">{errors.title}</p>)}
        </div>

        {/* Selected Tags */}
        <div className='flex flex-wrap justify-center gap-2 '>
          {addedtag.map((tag)=>(
            <span key={tag} className='border text-center bg-green-300 py-1 rounded-md w-[120px] px-3'>
              {tag}
            </span>
          ))}
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium text-gray-700" htmlFor="img">Image Src :</label>
          <input type="text" name='img' id='img' placeholder='Enter image src here'
            value={values.img} onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 outline-none border"/>
          {touched.img && errors.img && (<p className="text-red-500">{errors.img}</p>)}
        </div>

        {/* Tags */}
        <p className="block font-medium text-gray-700">Select Tags :</p>
        <div className='flex flex-wrap justify-center gap-2'>
          {arr.map((tag)=> (
            <p key={tag} onClick={()=>handleAdd(tag)}
              className={`border text-center w-[120px] px-3 py-1 cursor-pointer 
                ${addedtag.includes(tag) ? "bg-red-400" : ""}`}>
              {tag} {addedtag.includes(tag) && <IoRemoveCircleOutline className='inline' />}
            </p>
          ))}
        </div>

        {/* About */}
        <div>
          <label className="block font-medium text-gray-700" htmlFor="about">About :</label>
          <input type="text" name='about' maxLength={200} id='about' placeholder='Enter about here'
            value={values.about} onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 outline-none border"/>
          {touched.about && errors.about && (<p className="text-red-500">{errors.about}</p>)}
        </div>

        {/* Description with TinyMCE gptduulssee ene hesgiig */}
        <div>
          <label className="block font-medium text-gray-700" htmlFor="description">Description :</label>
          <Editor
            apiKey="1jle3nuw8fcmb4o6kn0yptbue7qx6h60npvl26hi557a1rrh"
            value={values.description}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                 alignleft aligncenter alignright alignjustify | \
                 bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={(content) => setFieldValue("description", content)}
          />
          {touched.description && errors.description && (<p className="text-red-500">{errors.description}</p>)}
        </div>

        {/* Submit */}
        <div className='flex justify-center'>
          <input type="submit" value={'Upload Blog'}
            className="w-[200px] p-3 bg-[#fdc300] text-gray-800 text-lg rounded-md hover:bg-[#ffde72] cursor-pointer"/>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog

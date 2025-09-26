"use client"
import React, { useState } from 'react'
import useSWR from 'swr'
import { api } from '../AxiosConfig/config'
import { ClipLoader } from 'react-spinners'
import { MdDelete } from 'react-icons/md'
import { FaEye, FaRegEdit } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import NothingToShow from './NothingToShow'
import { useRouter } from 'next/navigation'

const MyBlogs = () => {

  const [myBlogs, setmyBlogs] = useState([])
  const [Nothing, setNothing] = useState(false)

  const navigate = useRouter()

  const handleDelete =async (id) => {
    try {
      const response = await api.delete(`/blog/delete_blog/${id}`)

      if (response.data.success) {
        toast.success(response.data.msg)
        navigate.push('/')
      }
    } catch (error) {

    }
  }

  const fetcher = async (url) => {
    try {

      const response = await api.get(url)
      if (response.data.success) {

        return response.data
      }
    } catch (error) {
      toast.error(error.response.data.error)

    }
  }

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const {data, error} = useSWR('/blog/my_blogs', fetcher ,{
    revalidateOnMount : true
  })

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  if (!data) {
    
      setTimeout(() => {
        setNothing(true)
      }, 3000)
    
    return(  
    <div className=" flex justify-center items-center w-full h-[900px]">
      {Nothing ? <NothingToShow/> : <ClipLoader color="#e3c420" size={60} />}
      
    </div>
    )
  }

  if (data) {

    return (
      <div className="grid gap-x-2 max-md:flex flex-col pb-48 mt-8 cursor-default">
        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-y-6 col-span-4 max-sm:order-2">
          {data.userBlogs.length > 0 ? (
            data.userBlogs.map((blog) => (
              <div key={blog._id} className="flex flex-col  border max-sm:flex max-sm:flex-col p-2 rounded-lg gap-x-3  mx-2 max-sm:p-0 border-gray-300 max-sm:border">
                <div>
                  <Image
                    width={1400}
                    height={300}
                    src={isValidUrl(blog.img) ? blog.img : '/placeholder.png'} // Placeholder image ашигла (төсөлдөө нэм)
                    alt="Blog img"
                    className="rounded-lg object-contain"
                  />
                </div>
                <div className="flex flex-col gap-y-3 col-span-3  max-sm:border-none   p-2">
                  <p className="text-lg font-fourth text-ellipsis overflow-hidden  text-nowrap"><span className="mr-2 text-2xl">Title : </span>{blog.title[0].toUpperCase() + blog.title.slice(1)}</p>
                  <p className="line-clamp-2 font-fourth text-lg font-thin text-justify"><span className="mr-2 text-2xl">About : </span>{blog.about[0].toUpperCase() + blog.about.slice(1)}</p>
                  <p className="line-clamp-6 font-fourth text-lg font-thin text-justify"><span className="mr-2 text-2xl">Description : </span>{blog.description[0].toUpperCase() + blog.description.slice(1)}</p>
                  <p className="flex justify-around mt-2 max-sm:justify-between  ">
                    <button className="px-6 max-sm:px-2 py-1 rounded-md"><MdDelete onClick={() => handleDelete(blog._id)} size={25} color="red" /></button>
                    <Link href={`/single_blog/${blog._id}`} className="px-6 max-sm:px-3 py-1 rounded-md flex items-center"><FaEye color='RGB(31 163 255)' size={25} /></Link>
                    <Link href={`edit_blog/${blog._id}`} className="px-6 max-sm:px-3 py-1 rounded-md"><FaRegEdit size={20} color="green" /></Link>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex col-start-2 justify-center items-center w-full h-[900px]">
              <NothingToShow />
            </div>
          )}
        </div>
      </div>
    );
  }
  
 }
export default MyBlogs
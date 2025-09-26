"use client"
import React, { useEffect, useState } from 'react'
import { api } from '../AxiosConfig/config'
import { useDispatch } from 'react-redux'
import { addBlogs } from '../ReduxToolkit/reducers/blogReducer'

const Filter = () => {

  const [tags, setTags] = useState([])

  const dispatchR = useDispatch()

  const handleAddTag = (tag) => {

    if (tags.includes(tag)) {
      const removedTags = tags.filter((Singletag)=> {
        return Singletag != tag 
      })

      setTags(removedTags)

    }
    else {
      setTags([...tags, tag])
    }


  }

  const getBlogsWithTag = async (tags) => {
    try {
      const response = await api.post('/blog/get_blog', tags )
      if (response.data.success) {
        const allBlogs = response.data.allTagBlogs
        if (allBlogs.length>0) {
          dispatchR(addBlogs(response.data.allTagBlogs))
        }
      }

    } catch (error) {

    }
  }

  useEffect(()=> {

      getBlogsWithTag(tags)
    
  }, [tags])

let arr = ["Sport" , "Politics", 'AI', "Movies", "Anime", "Tech", "Nature", "Food", "Animals", "Music", "Fashion"]  
return (
    <>
    <p className=' text-4xl text-center font-heading my-4  max-lg:text-2xl'>Categories</p>
    <div className=' flex flex-wrap gap-x-6 justify-center gap-y-8 sticky top-2 pt-2 cursor-pointer max-md:flex-nowrap max-md:overflow-auto max-md:gap-x-3 max-md:justify-normal max-md:pl-1 pb-4'>
      {
        arr.map((tag)=>(
          <p onClick={()=>handleAddTag(tag)} key={tag} className={ ` font-primary w-[150px] rounded-lg text-center text-2xl px-6 py-2 border border-[#929292]  hover:bg-[#a5ffd2] max-md:text-md max-md:px-3 ${tags.includes(tag) ? ' bg-green-300 hover:bg-green-200' : ''}`}>{tag}</p>
        ))
      }
    </div>
    </>
  )
}

export default Filter
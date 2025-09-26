"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import DropDown from './DropDown'
import { MyContext } from '../Providers/Context/AuthContext'

const NavBar = () => {

  const {state ,dispatch } = useContext(MyContext)

  
  const handleAbout = () => {
    const element = document.getElementById('About Me')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div className=' flex justify-around py-2 bg-[#f7eadb] rounded-br-3xl rounded-tl-3xl'>
      <div className=' flex gap-x-14 items-center' >
        <div className=' w-12 h-12 rounded-full'>
          <Image src={'https://tse2.mm.bing.net/th/id/OIP.cctX-8jg1dDyKASfh2_nMAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'} alt='Web Icon' width={300} height={40} className='rounded-full' />
        </div>
        <Link className=' max-md:hidden' href={"/"}>Home</Link>
        {state?.user?.email  && <Link  className=' max-md:hidden'href={'/create_blog'}>Create Blog</Link> }
        <Link  className=' max-md:hidden'href={'/my_blogs'}>My Blogs</Link>
        <Link onClick={()=>handleAbout()} className=' max-md:hidden' href={''}>Contact Me</Link>
      </div>
      <div className=' flex gap-x-14 items-center'>
      <DropDown/>
        </div>
    </div>
  )
}

export default NavBar
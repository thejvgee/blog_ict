'use client'
import Filter from "@/FrontendLogic/components/Filter";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { useState, useRef, useEffect } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import useSWR from "swr";
import { api } from "@/FrontendLogic/AxiosConfig/config";
import { addBlogs } from "@/FrontendLogic/ReduxToolkit/reducers/blogReducer";
import { ClipLoader } from "react-spinners";
import NothingToShow from "@/FrontendLogic/components/NothingToShow";
import axios from "axios";


export default function Blog() {
  const [search, setSearch] = useState('');
  const dispatchR = useDispatch();
  const searchRef = useRef('')

  const { blogs } = useSelector((state) => state.blogReducer);
  // search function
  const onSearchSubmit = (e) => {
    e.preventDefault();
    const searchData = searchRef.current.value.trim().toLowerCase();
    setSearch(searchData);

  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };
//api gaas blog data tatna
//hariug n reverse hiiged hamgiin suuld nemegdsen blog deeree awch uldeh
//redux store-ruu dispatch hiine
  const fetcher =async (url) => {

  try {
    const response = await api.get(url);
    if (response?.data?.success) {
      const data = response.data.allBlogs;
      const reversedBlog = data.slice().reverse();
      dispatchR(addBlogs(reversedBlog));// redux store-d hadgalnaa store.js bga
    }
    return response.data;
  } catch (error) {
    console.error(error, 'Fetcher error');
    throw new Error('Failed to fetch data');
  }
};
//revalidateOnMount → component ачаалах бүрт fetch хийнэ.
//revalidateOnReconnect → интернэт салгаад буцааж холбоход дахин fetch хийнэ.
const { data, error, mutate } = useSWR(
  `/blog/get_blog`,
  fetcher,
  { 
    revalidateOnReconnect: true,
    revalidateOnMount: true
  },
);

  

  const filteredBlogs = blogs?.filter((blog) => blog.title.toLowerCase().includes(search.toLowerCase())); 

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  if (!data) {
    return(  
    <div className=" flex justify-center items-center w-full h-[900px]">
      <ClipLoader color="#e3c420" size={60} />
    </div>
    )
  }





  if (data) {
    return (
      <>
      <div className=" m-auto max-w-[700px]  mt-8 mb-6  ">
          <div >
            <form action="" className=" mx-6  flex gap-x-1" onSubmit={onSearchSubmit}>
              <input type="text" placeholder=" Search blog here...." name="search" id="search" ref={searchRef} className=" border outline-none py-1 rounded-md col-span-5 w-[80%] p-2" />
              <input className=" cursor-pointer bg-green-300 px-3 py-1 rounded-md" type="submit" value={"Search"} />
            </form>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-x-2 max-md:flex flex-col pb-48">
          
          <div className="flex flex-col gap-y-6 col-span-4 max-md:order-2">
            {filteredBlogs.length > 0  ? 
            filteredBlogs.map((blog) => (
              <div key={blog._id} className="grid  grid-cols-5 max-sm:flex max-sm:flex-col p-2 rounded-lg gap-x-3 h-[23rem] max-sm:h-[700px] mx-2 max-sm:p-0 max-sm:border-[#ffd992] max-sm:border cursor-default ">
                <div className="col-span-2 h-full relative">
                  <Image
                    fill
                    src={isValidUrl(blog.img) ? blog.img : '/placeholder.png'} // Replace '/placeholder.png' with your actual placeholder image path
                    alt="Blog img"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-col bg-[#f4feff] col-span-3 border max-sm:border-none border-[#d8ba83] rounded-lg p-2 gap-y-4">
                <p className="text-lg font-fourth text-ellipsis overflow-hidden font-thin  text-nowrap "><span className="mr-2 text-lg font-normal">Title : </span>{blog.title[0].toUpperCase() + blog.title.slice(1)}</p>
                  <p className="line-clamp-2 font-fourth text-lg font-thin text-justify"><span className="mr-2 text-lg font-normal">About : </span>{blog.about[0].toUpperCase() + blog.about.slice(1)}</p>
                  <p className="line-clamp-6 font-fourth text-lg font-thin text-justify"><span className="mr-2 text-lg font-normal">Description : </span>{blog.description[0].toUpperCase() + blog.description.slice(1)}</p>
                  <p className="flex justify-around mt-2 max-sm:justify-center">
                    {/* <button className="px-6 max-sm:px-2 py-1 rounded-md"><MdDelete onClick={()=>handleDelete(blog._id)} size={25} color="red" /></button> */}
                    <Link href={`/single_blog/${blog._id}`} className="px-6 max-sm:px-3 py-1 rounded-md flex items-center"><FaEye color='RGB(31 163 255)' size={25} /></Link>
                    {/* <Link href={`edit_blog/${blog._id}`} className="px-6 max-sm:px-3 py-1 rounded-md"><FaRegEdit size={20} color="green" /></Link> */}
                  </p>
                </div>
              </div>
            ))
          :
          <div className=" flex justify-center items-center h-[1200px] border mx-2 mt-2 ">
            <NothingToShow/>
            </div>
          
          }
          </div>
          <div className="max-sm:order-1 col-span-1 h-auto mt-2 border cursor-default bg-[#e2edff] max-md:bg-transparent rounded-lg  border-[#ffcb6b] lg-min-h-[1100px] max-sm:mb-4 max-md:border-none">
            <Filter />
          </div>
        </div>
      </>
    );
  }
}

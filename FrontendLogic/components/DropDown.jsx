"use client"
import { Fragment, useContext, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { IoGridOutline } from "react-icons/io5";
import { signIn, signOut, useSession } from 'next-auth/react'
import Cookies from 'js-cookie'
import { MyContext } from '../Providers/Context/AuthContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const handleAbout = () => {
  const element = document.getElementById('About Me')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleLogut = () => {
  signOut()
  Cookies.remove('MyEmail')
}
export default function DropDown() {

  const {dispatch } = useContext(MyContext)

  const { data: session } = useSession()


  const handleSignIn =async () => {
    await signIn()
    
  }

  const handleToken = () => {
    if (session?.user?.email) {
      Cookies.set('MyEmail', session.user.email)
      const userData = {name : session.user.name, email : session.user.email}
      dispatch({type : "LOGIN" , payload : userData })
    }
  }

  useEffect(()=> {
    handleToken()
  }, [session])
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-3 text-sm font-semibold text-gray-900   hover:bg-gray-50">
          <IoGridOutline size={20} />
          {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* <Menu.Item>
              {({ active }) => (
                <Link
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account settings
                </Link>
              )}
            </Menu.Item> */}
            <div className=''>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={"/"}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm md:hidden'
                    )}
                  >
                    Home
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className=''>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={'create_blog'}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm md:hidden'
                    )}
                  >
                    Create Blog
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className=''>
              <Menu.Item>
                {({ active }) => (
                  <p
                    // href="#"
                    onClick={() => handleAbout()}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100',
                      'block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 md:hidden'
                    )}
                  >
                    Contact Us
                  </p>
                )}
              </Menu.Item>
            </div>
            <div >
              {session ?
                <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm cursor-pointer hover:bg-gray-100'
                    )}
                    onClick={handleLogut}
                  >
                    <p className=' text-sm my-1'>Signed in as {session.user.name}</p>
                    <span className=' text-red-400'>Logout</span>
                  </div>
                )}
              </Menu.Item>
                :
                <Menu.Item>
                  {({ active }) => (
                    <p
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 cursor-pointer'
                      )}
                      onClick={handleSignIn}
                    >
                      Login
                    </p>
                  )}
                </Menu.Item>

              }

            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
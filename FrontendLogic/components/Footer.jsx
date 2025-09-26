import Link from 'next/link';
import React from 'react'

const Footer = () => {

  const handleSmoothScroll = (id) => {
    setOpen(false)
    if (id === '/') {
      return navigate('/')
    }

    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div id='About Me' className=' h-72 footerCss '>

      <footer className="flex h-full flex-col space-y-10 justify-center py-9 bg-[#d4ba9a]">
        {/* pages: [
                {name: 'Home', id: '/', href: '/' },
                {name: 'Products', id: 'Prod', href: '#Prod' },
                {name: 'About Me', id: 'About', href: '#About' },
                ] */}
        <nav className="flex justify-center flex-wrap gap-6 text-gray-800 font-medium">
          <Link className="hover:text-gray-500" href="/">Home</Link>
          <Link className="hover:text-gray-500" href="#Prod">Products</Link>
          <Link className="hover:text-gray-500" href="#">Services</Link>
          <Link className="hover:text-gray-500" href="#">Media</Link>
          <Link className="hover:text-gray-500" href="#">Gallery</Link>
          <Link className="hover:text-gray-500" href="#">Contact</Link>
        </nav>

        <div className="flex justify-center space-x-5">
          <Link href="https://www.linkedin.com/in/%D0%B6%D2%AF%D0%B3%D0%B4%D1%8D%D1%80%D0%BD%D0%B0%D0%BC%D0%B6%D0%B8%D0%BB-%D0%BD%D1%8F%D0%BC%D0%B4%D0%BE%D1%80%D0%B6-87140328a/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" alt='linkedIn' />
          </Link>
          <Link href="https://www.instagram.com/thejvgee" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" alt='insta' />
          </Link>
          <Link href="https://github.com/thejvgee" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/github.png" alt='github' />
          </Link>
          <Link href="https://x.com/NymaJugee" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/twitter.png" alt="Twitter" />
          </Link>


        </div>
        <p className="text-center text-gray-800 font-medium">🤍 Thank You For Sharing Your Blogs 🤍</p>
      </footer>
    </div>
  )
}

export default Footer
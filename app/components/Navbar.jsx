import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <section className='bg-purple-100 shadow-md navbar p-4 flex gap-4 items-center'>
        <Image className='rounded-2xl' src={'/VA.png'} width={100} height={100} alt='logo'/>
        <span className='text-3xl font-bold'>VASSIST</span>
    </section>
  )
}

export default Navbar
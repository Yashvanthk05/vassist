import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <section className='bg-neutral-800 shadow-md navbar p-4 flex gap-4 items-center'>
        <Image className='rounded-2xl' src={'/VA.png'} width={75} height={75} alt='logo'/>
        <span className='text-2xl font-bold'>VASSIST</span>
    </section>
  )
}

export default Navbar
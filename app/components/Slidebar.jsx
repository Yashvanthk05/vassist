"use client"
import React from 'react'
import { Download, LayoutPanelLeft } from 'lucide-react'
import { BsFillGrid1X2Fill } from 'react-icons/bs'
import { GiSchoolBag } from 'react-icons/gi'
import { MdChatBubble } from 'react-icons/md'
import { IoMdChatbubbles } from 'react-icons/io'
import { IoCloudUpload } from 'react-icons/io5'
import { FaDownload } from 'react-icons/fa'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Slidebar = () => {
    const pathname = usePathname();
    console.log(pathname);
  return (
    <div className='side'>
        <span className='logo'><Image alt='logo' className='logoimg' src={'/VA.png'} height={500} width={500}/>VASSIST</span>
        <div className='sideitem'>
            <span className='sidehead'>Menu</span>
            <Link href="/materials" className={pathname=="/materials"?`sideiactive sidei`:`sidei`}><BsFillGrid1X2Fill /> Materials</Link>
            <Link href="/pyq" className={pathname=="/pyq"?`sideiactive sidei`:`sidei`}><GiSchoolBag/> PYQ</Link>
            <Link href="/forum" className={pathname=="/forum"?`sideiactive sidei`:`sidei`}><IoMdChatbubbles/> Forum</Link>
        </div>
        <div className='sideitem'>
            <span className='sidehead'>General</span>
            <Link href="/contribute" className='sidei'><IoCloudUpload/> Contribute</Link>
        </div>
        <div className='sideitem'>
            <span className='sidei'><FaDownload/> Download App</span>
        </div>
    </div>
  )
}

export default Slidebar
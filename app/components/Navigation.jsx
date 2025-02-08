"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import { GiSchoolBag } from 'react-icons/gi';
import { IoMdChatbubbles } from 'react-icons/io';
import { IoCloudUpload } from 'react-icons/io5';

const Navigation = () => {
    const pathname = usePathname();
    console.log(pathname);
  return (
    <div className='navigation'>
        <Link href="/materials" className={pathname=="/materials"?`naviactive navi`:`navi`}><BsFillGrid1X2Fill size={24} /> Materials</Link>
        <Link href="/pyq" className={pathname=="/pyq"?`naviactive navi`:`navi`}><GiSchoolBag size={24} /> PYQ</Link>
        <Link href="/forum" className={pathname=="/forum"?`naviactive navi`:`navi`}><IoMdChatbubbles size={24} /> Forum</Link>
        <Link href="/contribute" className={pathname=="/contribute"?`naviactive navi`:`navi`}><IoCloudUpload size={24} /> Contribute</Link>
    </div>
  )
}

export default Navigation
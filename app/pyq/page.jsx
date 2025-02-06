"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { BiLeftArrowAlt } from 'react-icons/bi';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const Page = () => {
  const [items, setItems] = useState([]);
  const [path, setPath] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchContent("");
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const fetchContent = async (subPath) => {
    const url = `https://api.github.com/repos/sharonbyju/VIT-Chennai-PYQP/contents/${subPath}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
      setPath(subPath);
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (item.name.endsWith(".pdf") && searchQuery === "")
  );

  return (
    <section className="sec">
      <div className='top'>
        <span className='searchbar'>
          <FaMagnifyingGlass color='rgba(98, 0, 255, 0.3)' />
          <input 
            type="text" 
            placeholder='Search by Subject Name/Code' 
            value={searchQuery}
            onChange={handleSearch}
            ref={searchInputRef}
          />
          <span className='bg-purple-300 text-purple-500 rounded px-2'>ctrl</span>
          <span className='text-purple-400'>+</span>
          <span className='bg-purple-300 text-purple-500 rounded px-2'>k</span>
        </span>
      </div>
      <div className='con'>
        <h1 className="pagetop">Previous Year Question Papers</h1>
        {path && (
          <button
            onClick={() => fetchContent(path.split("/").slice(0, -1).join("/"))}
            className="flex mb-2 text-blue-500 hover:underline"
          >
            <BiLeftArrowAlt /> Go Back
          </button>
        )}
        <ul className="items">
          {filteredItems.map((item) => (
            <li key={item.path} className="mb-2">
              {item.type === "dir" ? (
                <HoverCard>
                  <HoverCardTrigger>
                <button
                  onClick={() => fetchContent(item.path)}
                  className="text-blue-500 hover:underline"
                >
                  <Image alt="folder logo" src={"/folder.png"} height={1000} width={1000} className='filelogo'/> {item.name.length > 8 ? `${item.name.slice(0, 8)}` : item.name}
                </button>
                </HoverCardTrigger>
                <HoverCardContent>
                  {item.name}
                </HoverCardContent>
                </HoverCard>
              ) : item.name.endsWith(".pdf") ? (
                
                  <Link href={item.download_url}>
                  <span><Image alt="file logo" src={"/pdf.png"} height={150} width={100} />{item.name}</span>
                </Link>
              ) : (
                <span>{item.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Page;
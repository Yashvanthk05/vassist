"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { BiLeftArrowAlt } from 'react-icons/bi';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { FcFolder } from 'react-icons/fc';
import { FaFileAlt } from 'react-icons/fa';

// Keep API key in code for debugging (move to env later)
const GOOGLE_DRIVE_API_KEY = "AIzaSyAuItmFqEklJP21-qGk1TyS87XlSORhMmI";
const ROOT_FOLDER_ID = "17J2Qw3xEwzXKvzFp6r_avWsVxXuewA5x";

const Page = () => {
  const [items, setItems] = useState([]);
  const [path, setPath] = useState(ROOT_FOLDER_ID);
  const [parentPaths, setParentPaths] = useState([ROOT_FOLDER_ID]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchContent(path);
    
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [path]);

  const fetchContent = async (folderId) => {
    setIsLoading(true);
    setError(null);
    
    // Log the API URL for debugging
    const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${GOOGLE_DRIVE_API_KEY}`;
    console.log('Fetching from:', apiUrl);

    try {
      const response = await fetch(apiUrl);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      if (data.files) {
        setItems(data.files);
        console.log('Set items:', data.files.length, 'files found');
      } else {
        console.log('No files found in response');
        setItems([]);
      }
    } catch (error) {
      console.error("Error details:", error);
      setError(`Failed to load files: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getPdfViewLink = (fileId) => {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="sec">
      <div className="top shadow-inner">
        <div className="searchbar shadow-inner">
          <FaMagnifyingGlass className="text-purple-300" />
          <input
            type="text"
            placeholder="Search by Subject Name/Code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={searchInputRef}
            className="flex-1 outline-none"
          />
          <span className='bg-purple-300 text-purple-500 rounded px-2'>ctrl</span>
          <span className='text-purple-400'>+</span>
          <span className='bg-purple-300 text-purple-500 rounded px-2'>k</span>
        </div>
      </div>

      <div className="con shadow-inner">
        <h1 className="text-2xl font-bold mb-4">Previous Year Question Papers</h1>
        
        {parentPaths.length > 1 && (
          <button
            onClick={() => {
              const newPaths = [...parentPaths];
              newPaths.pop();
              setPath(newPaths[newPaths.length - 1]);
              setParentPaths(newPaths);
            }}
            className="flex items-center gap-1 text-blue-500 hover:underline mb-4"
          >
            <BiLeftArrowAlt size={20} /> Go Back
          </button>
        )}

        {isLoading && (
          <div className="text-center py-8">Loading files...</div>
        )}

        {error && (
          <div className="text-red-500 text-center py-8">
            {error}
          </div>
        )}

        {!isLoading && !error && filteredItems.length === 0 && (
          <div className="text-center py-8">
            No files found in this folder
          </div>
        )}

        {!isLoading && !error && filteredItems.length > 0 && (
          <div className="items">
            {filteredItems.map((item) => (
              <div key={item.id} className="">
                {item.mimeType === "application/vnd.google-apps.folder" ? (
                  <HoverCard>
                  <HoverCardTrigger>
                  <button
                    onClick={() => {
                      console.log('Navigating to folder:', item.name, item.id);
                      setParentPaths([...parentPaths, item.id]);
                      setPath(item.id);
                    }}
                    className="item"
                  >
                    <FcFolder color='rgb(0,0,0,0.8)' size={72}/>
                    <span>
                      {item.name.length > 8 ? item.name.slice(0, 8): item.name}
                    </span>
                  </button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    {item.name}
                  </HoverCardContent>
                  </HoverCard>
                ) : (item.mimeType === "application/pdf" || item.mimeType === "application/vnd.ms-powerpoint" || item.mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                  <a
                    href={getPdfViewLink(item.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full p-4 flex flex-col items-center gap-2 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    <div className="relative w-12 h-12">
                      <FaFileAlt size={54} color="rgb(98,0,255,0.5)"/>
                    </div>
                    <span className="text-purple-500 text-sm text-center break-words">
                      {item.name}
                    </span>
                  </a>
                ) : (
                  <div className="w-full p-4 flex flex-col items-center gap-2">
                    <span className="text-sm text-center break-words">
                      {item.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
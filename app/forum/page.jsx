"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { VscSend } from "react-icons/vsc";

const page = () => {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [popup,setPopup]=useState(false);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: message,
      name: session.user.name,
      avatar: session.user.image,
      timestamp: new Date(),
    });
    setMessage("");
  };
  return (
    <section className="sec">
      {session?.user ? (
        <>
          <div className="top flex justify-between items-center p-4 relative shadow-inner">
            <span className="text-2xl font-bold">VASSIST Discussion Forum</span>
            <button onClick={()=>setPopup(prev=>!prev)} className="flex items-center gap-2 shadow-inner bg-purple-100 p-2 rounded-md"><Image alt="user logo" src={session?.user?.image} className="rounded-full" height={40} width={40} />{session?.user?.name}</button>
            {popup && <button onClick={()=>{signOut()}} className="absolute shadow-md bg-purple-100 p-2 rounded-sm right-4 -bottom-8 w-32">Sign Out</button>}
          </div>
          <div className="con relative shadow-inner">
            <div className="">
              {messages.map((msg) => (
                <div key={msg.id} className="mb-2 flex items-start">
                  <img
                    src={session?.user?.image}
                    className="w-8 h-8 rounded-full mr-2"
                    alt="avatar"
                  />
                  <div>
                    <p className="text-sm font-semibold">{msg.name}</p>
                    <p className="text-gray-700">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="absolute bottom-2 flex right-2 left-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="searchbar shadow-inner outline-none"
              />
              <button
                type="submit"
                className="ml-2 bg-purple-300 px-4 py-1 rounded"
              >
                <VscSend color="rgb(98,0,255)" size={24}/>
              </button>
            </form>
          </div>
        </>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => {
              signIn("google");
            }}
          >
            Sign In
          </button>
        </div>
      )}
    </section>
  );
};

export default page;

"use client"
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  redirect("/materials");
  return (
    <></>
  );
}

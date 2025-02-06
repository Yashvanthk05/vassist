import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import Slidebar from "./components/Slidebar";

const geistSans = Poppins({
  weight:["100","200","300","400","500","600","700","800"]
});

export const metadata: Metadata = {
  title: "VASSIST",
  description: "VIT Chennai's Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans} antialiased`}
      >
        <Slidebar/>
        {children}
      </body>
    </html>
  );
}

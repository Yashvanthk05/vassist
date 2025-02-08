import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Slidebar from "./components/Slidebar";
import AuthProvider from './components/AuthProvider'
import Navbar from './components/Navbar'
import Navigation from './components/Navigation'

const poppins = Poppins({
  subsets:['latin','latin-ext'],
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
        className={`${poppins} antialiased`}
      >
        <AuthProvider>
          <div className="hidden md:flex">
            <Slidebar/>
            {children}
          </div>
          <div className="flex flex-col gap-2 min-w-full md:hidden">
            <Navbar/>
            {children}
            <Navigation/>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'react-feather';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Fix hydration error

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Avoid rendering mismatched content

  return (
    <header>
      <nav className="fixed left-1/2 transform -translate-x-1/2 z-50 w-full p-2 md:p-3 lg:p-4">
        <div className="bg-black px-2 rounded-2xl border border-white/10 backdrop-blur-md max-w-4xl mx-auto">
          <div className="flex items-center w-full justify-between">
            <Link href="/" className="text-[13px] text-neutral-300 hover:text-white px-3 py-3 transition-all duration-500 ease-in-out text-center min-w-[80px] rounded-lg hidden sm:block">
              DJ/MC
            </Link>
            <Link href="/" className="text-[13px] text-neutral-300 hover:text-white px-3 py-3 transition-all duration-500 ease-in-out text-center min-w-[80px] rounded-lg hidden sm:block">
              Live Musician
            </Link>
            <Link href="/">
              <div className="w-10 h-10">
                <Image src="https://imghost.net/ib/mSOED8pbcBy4kfC_1740803689.png" alt="Logo" width={40} height={40} className="h-10 w-10 transition-opacity duration-300 opacity-100" />
              </div>
            </Link>
            <Link href="/" className="text-[13px] text-neutral-300 hover:text-white px-3 py-3 transition-all duration-500 ease-in-out text-center min-w-[80px] rounded-lg hidden sm:block">
              Hybrids
            </Link>
            <Link href="/" className="text-[13px] text-neutral-300 hover:text-white px-3 py-3 transition-all duration-500 ease-in-out text-center min-w-[80px] rounded-lg hidden md:block">
              Enhancement
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="block bg-black sm:hidden p-2 rounded-lg">
              {menuOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center space-y-6">
          <Link href="/" className="text-white text-xl" onClick={() => setMenuOpen(false)}>DJ/MC</Link>
          <Link href="/" className="text-white text-xl" onClick={() => setMenuOpen(false)}>Live Musician</Link>
          <Link href="/" className="text-white text-xl" onClick={() => setMenuOpen(false)}>Hybrids</Link>
          <Link href="/" className="text-white text-xl" onClick={() => setMenuOpen(false)}>Enhancement</Link>
        </div>
      )}
    </header>
  );
}

// layout.tsx
"use client";
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Financial Aid Finder</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#home" className="hover:text-gray-300">Home</a></li>
              <li><a href="#services" className="hover:text-gray-300">Services</a></li>
              <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-700 text-white p-4 text-center">
        <p>© 2024 Financial Aid Finder. All rights reserved.</p>
      </footer>
    </div>
  );
}

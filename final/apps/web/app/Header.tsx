import { Verify } from "@/components/verify";
import Image from "next/image";
import logo from "@/public/logo.jpg";

export default function Header() {
  return (
    <header className="bg-white sticky top-0 shadow-md z-50 py-4">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image src={logo} alt="Company Logo" width={150} height={50} className="object-contain" />
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-700 hover:text-indigo-500 transition-colors">Home</a>
          <a href="#" className="text-gray-700 hover:text-indigo-500 transition-colors">Features</a>
          <a href="#" className="text-gray-700 hover:text-indigo-500 transition-colors">Testimonials</a>
          <a href="#" className="text-gray-700 hover:text-indigo-500 transition-colors">Contact</a>
        </nav>
        <div>
          <Verify />
        </div>
      </div>
    </header>
  );
}

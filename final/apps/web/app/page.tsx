"use client";
import "reflect-metadata";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import Header from "./Header";
import Features from "./Features";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}

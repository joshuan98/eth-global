// page.tsx
"use client";
import React from 'react';
import RootLayout from './layout';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
    {
        quote: "Finding the right financial aid was a breeze thanks to Financial Aid Finder. Their detailed and personal approach made all the difference!",
        author: "Emily R.",
        position: "Student at Harvard University"
    },
    {
        quote: "I never thought I would be able to afford college, but Financial Aid Finder helped me secure the scholarships I needed. Forever grateful!",
        author: "Michael T.",
        position: "Student at Stanford University"
    },
    {
        quote: "The financial advising service here is top-notch. They helped me plan out my finances throughout college, reducing a lot of my stress.",
        author: "Sarah P.",
        position: "Graduate from MIT"
    }
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2 shadow-md cursor-pointer hover:bg-blue-600 transition duration-200 ${className}`}
            style={{ ...style }}
            onClick={onClick}
        >
            &rarr;
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2 shadow-md cursor-pointer hover:bg-blue-600 transition duration-200 ${className}`}
            style={{ ...style }}
            onClick={onClick}
        >
            &larr;
        </div>
    );
}

export default function HomePage() {
    return (
        <RootLayout>
            <div className="container mx-auto px-4 py-16">
                <section id="home" className="text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Financial Aid Finder</h2>
                    <p className="text-xl text-gray-600 mb-8">Helping you navigate your financial aid options effortlessly.</p>
                    <a href="#services" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Get Started
                    </a>
                </section>
                
                <section id="services" className="mt-16">
                    <h3 className="text-3xl text-gray-800 font-bold mb-6">Our Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h4 className="text-xl font-bold text-gray-700 mb-3">Scholarship Matching</h4>
                            <p>Discover scholarships that match your profile and needs.</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h4 className="text-xl font-bold text-gray-700 mb-3">Grant Applications</h4>
                            <p>Apply for grants with ease using our streamlined process.</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h4 className="text-xl font-bold text-gray-700 mb-3">Financial Advising</h4>
                            <p>Get professional advice on how to manage and plan your educational finances.</p>
                        </div>
                    </div>
                </section>

                <section id="testimonials" className="mt-16 bg-gray-100 py-8">
                    <div className="text-center">
                        <h3 className="text-3xl text-gray-800 font-bold mb-6">What Our Clients Say</h3>
                        <Slider {...settings}>
                            {testimonials.map((testimonial, index) => (
                                <div key={index}>
                                    <blockquote className="italic text-gray-600 text-lg">
                                        "{testimonial.quote}"
                                    </blockquote>
                                    <p className="font-bold text-gray-800 mt-4">- {testimonial.author}, {testimonial.position}</p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </section>

                <section id="partners" className="mt-16">
                    <h3 className="text-3xl text-gray-800 font-bold mb-6 text-center">Our Partners</h3>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        <img src="/path/to/university-logo-1.png" alt="University Logo 1" className="h-12"/>
                        <img src="/path/to/university-logo-2.png" alt="University Logo 2" className="h-12"/>
                        <img src="/path/to/university-logo-3.png" alt="University Logo 3" className="h-12"/>
                        {/* Add more logos as needed */}
                    </div>
                </section>

                <section id="contact" className="mt-16 mb-16">
                    <h3 className="text-3xl text-gray-800 font-bold mb-6">Contact Us</h3>
                    <p>If you have any questions, please feel free to reach out to us.</p>
                    <p>Email: contact@financialaidfinder.com</p>
                </section>
            </div>
        </RootLayout>
    );
}

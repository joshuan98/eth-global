import Slider from "react-slick";

export default function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 testimonials at a time
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // 3 seconds per slide
    centerMode: true, // Enable center mode for highlighting the middle slide
    centerPadding: "0", // No padding for centered item
  };

  const testimonials = [
    {
      text: "ZkScholar revolutionized the financial aid process for me. The privacy-preserving system made me feel secure while applying.",
      author: "Samantha B., Graduate Applicant",
      image: "./noun (1).png", // Assuming the images are stored in public folder
    },
    {
      text: "Thanks to ZkScholar, I could apply to multiple colleges without sharing sensitive data. The zero-knowledge proof system is a game-changer!",
      author: "Chris K., College Senior",
      image: "./noun (2).png",
    },
    {
      text: "Our institution now handles aid disbursement more efficiently. ZkScholar’s secure, anonymous matching process is a huge improvement.",
      author: "David L., Financial Aid Officer",
      image: "./noun (3).png",
    },
    {
      text: "I got financial aid approval in a few minutes with ZkScholar. No data leaks and everything happened smoothly on-chain!",
      author: "Rachel P., Undergraduate",
      image: "./noun (4).png",
    },
    {
      text: "The best part of ZkScholar is that I don't need to worry about my personal data. Aid distribution through USDC was fast and reliable.",
      author: "Oliver T., International Student",
      image: "./noun (5).png",
    },
    {
      text: "ZkScholar's integration with USDC means I can easily convert my funds and use them right away. No more waiting for payments.",
      author: "Linda M., Graduate Student",
      image: "./noun (6).png",
    },
    {
      text: "Our college's financial aid process is streamlined thanks to ZkScholar. Privacy and efficiency are top-notch.",
      author: "Matthew R., Financial Aid Director",
      image: "./noun (7).png",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">How ZkScholar Transforms Financial Aid for Students and Institutions</h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
                <img src={testimonial.image} alt={`Testimonial from ${testimonial.author}`} className="mb-4 mx-auto w-16 h-16 object-cover rounded-full" />
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-indigo-600">{testimonial.author}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

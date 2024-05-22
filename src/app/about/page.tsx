

import Image from 'next/image';

export default function About() {
  const aboutSections = [
    {
      title: "Our Mission",
      description: "To provide accurate and timely weather information to help you plan your day better.",
      image: "/images/mission.jpg",
    },
    {
      title: "Our Vision",
      description: "To be the most trusted weather information source worldwide.",
      image: "/images/vision.jpg",
    },
    {
      title: "Our Team",
      description: "We are a group of dedicated meteorologists and developers committed to bringing you the best weather experience.",
      image: "/images/team.jpg",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aboutSections.map((section) => (
          <div
            key={section.title}
            className="relative h-80 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
            <Image
              src={section.image}
              alt={section.title}
              layout="fill"
              objectFit="cover"
              className="z-0"
              placeholder="blur"
              blurDataURL={section.image} 
              quality={75} 
            />
            <div className="relative z-20 p-4 text-white">
              <h2 className="text-xl font-bold mb-2">{section.title}</h2>
              <p>{section.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

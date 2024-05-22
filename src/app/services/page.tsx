// src/app/services/page.tsx

import Image from 'next/image';

export default function Services() {
  const services = [
    {
      title: "Current Weather",
      description: "Get the current weather conditions for any city.",
      image: "/images/current-weather.jpg",
    },
    {
      title: "5-Day Forecast",
      description: "See the weather forecast for the next five days.",
      image: "/images/5-day-forecast.jpg",
    },
    {
      title: "Air Quality Index",
      description: "Check the air quality index for your area.",
      image: "/images/air-quality.jpg",
    },
    {
      title: "Weather Alerts",
      description: "Stay informed about severe weather alerts.",
      image: "/images/weather-alerts.jpg",
    },
    {
      title: "Weather Maps",
      description: "View detailed weather maps for any region.",
      image: "/images/weather-maps.jpg",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.title}
            className="relative h-64 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
            <Image
              src={service.image}
              alt={service.title}
              layout="fill"
              objectFit="cover"
              className="z-0"
              placeholder="blur"
              blurDataURL={service.image} // Placeholder for blurred effect
              quality={75} // Reduce quality for faster loading
            />
            <div className="relative z-20 p-4 text-white">
              <h2 className="text-xl font-bold mb-2">{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import EmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface Partner {
  id: number;
  name: string;
  logo: string;
}

interface PartnersCarouselProps {
  partners: Partner[];
}

export function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const [emblaRef, emblaApi] = EmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
      breakpoints: {
        '(max-width: 640px)': { slidesToScroll: 1 },
        '(min-width: 641px) and (max-width: 1024px)': { slidesToScroll: 2 },
        '(min-width: 1025px)': { slidesToScroll: 4 },
      },
    },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    setScrollSnaps(emblaApi.scrollSnapList());

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex-[0_0_calc(100%-1rem)] sm:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(25%-1rem)] min-w-0 px-2"
            >
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 flex items-center justify-center h-32 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-[#23CF65] w-8'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

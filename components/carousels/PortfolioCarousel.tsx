'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import EmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  before?: string;
  after?: string;
  rooms?: Array<{
    name: string;
    before: string;
    after: string;
  }>;
}

interface PortfolioCarouselProps {
  items: PortfolioItem[];
}

export function PortfolioCarousel({ items }: PortfolioCarouselProps) {
  const [emblaRef, emblaApi] = EmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
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
    <div className="w-full flex flex-col">
      <div className="overflow-hidden rounded-lg flex-1" ref={emblaRef}>
        <div className="flex h-full">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-[0_0_100%] min-w-0 px-4"
            >
              <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {item.description}
                  </p>

                  {item.before && item.after && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Antes
                        </p>
                        <div className="relative w-full h-64 md:h-96">
                          <Image
                            src={item.before}
                            alt={`${item.title} - Antes`}
                            fill
                            className="object-cover rounded-lg"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Depois
                        </p>
                        <div className="relative w-full h-64 md:h-96">
                          <Image
                            src={item.after}
                            alt={`${item.title} - Depois`}
                            fill
                            className="object-cover rounded-lg"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {item.rooms && (
                    <div className="space-y-6">
                      {item.rooms.map((room, idx) => (
                        <div key={idx}>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            {room.name}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Antes
                              </p>
                              <div className="relative w-full h-64 md:h-96">
                                <Image
                                  src={room.before}
                                  alt={`${item.title} - ${room.name} - Antes`}
                                  fill
                                  className="object-cover rounded-lg"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Depois
                              </p>
                              <div className="relative w-full h-64 md:h-96">
                                <Image
                                  src={room.after}
                                  alt={`${item.title} - ${room.name} - Depois`}
                                  fill
                                  className="object-cover rounded-lg"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="flex justify-center gap-2 mt-8 md:mt-6 pb-4 md:pb-0">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-(--color-primary) w-8'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

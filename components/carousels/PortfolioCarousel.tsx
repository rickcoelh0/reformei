'use client';

import React, { useEffect, useState } from 'react';
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

// Flatten portfolio items to handle rooms as separate slides
function flattenPortfolioItems(items: PortfolioItem[]) {
  const flattened: Array<{
    id: string;
    title: string;
    description: string;
    before: string;
    after: string;
  }> = [];

  items.forEach((item) => {
    if (item.before && item.after) {
      flattened.push({
        id: `${item.id}-main`,
        title: item.title,
        description: item.description,
        before: item.before,
        after: item.after,
      });
    }

    if (item.rooms) {
      item.rooms.forEach((room, idx) => {
        flattened.push({
          id: `${item.id}-room-${idx}`,
          title: item.title,
          description: `${item.description} - ${room.name}`,
          before: room.before,
          after: room.after,
        });
      });
    }
  });

  return flattened;
}

export function PortfolioCarousel({ items }: PortfolioCarouselProps) {
  const flattenedItems = flattenPortfolioItems(items);
  const pauseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [emblaRef, emblaApi] = EmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const pauseAutoplay = () => {
    if (!emblaApi) return;

    // Clear any existing timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    // Get the autoplay plugin
    const autoplayPlugin = emblaApi.plugins()?.autoplay;
    if (autoplayPlugin) {
      autoplayPlugin.stop();

      // Resume after 10 seconds
      pauseTimeoutRef.current = setTimeout(() => {
        if (autoplayPlugin) {
          autoplayPlugin.play();
        }
      }, 10000);
    }
  };

  const scrollPrev = () => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      pauseAutoplay();
    }
  };

  const scrollNext = () => {
    if (emblaApi) {
      emblaApi.scrollNext();
      pauseAutoplay();
    }
  };

  const scrollTo = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
      pauseAutoplay();
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-lg flex-1" ref={emblaRef}>
        <div className="flex h-full">
          {flattenedItems.map((item) => (
            <div key={item.id} className="flex-[0_0_100%] min-w-0 px-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {item.description}
                  </p>

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
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#23CF65]"
          aria-label="Slide anterior"
          title="Slide anterior"
        >
          <svg
            className="w-6 h-6 text-gray-900 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#23CF65]"
          aria-label="Próximo slide"
          title="Próximo slide"
        >
          <svg
            className="w-6 h-6 text-gray-900 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
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
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

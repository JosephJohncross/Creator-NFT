import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import type { CarouselApi } from "../ui/carousel";

interface NftCollectionGalleryProps {
  heading?: string;
  demoUrl?: string;
  items: GalleryItem[];
}

interface GalleryItem {
    "id": string,
    "name": "metadata.json",
    "cid": string,
    "size": number,
    "number_of_files": number,
    "mime_type": "application/json",
    "group_id": null,
    "keyvalues": {
        "description": string,
        "imageUrl": string,
        "name": string,
        "type": "nft-metadata",
        "user": string
    },
    "created_at": string
}

const NftCollectionGallery = ({
  heading = "My Collections",
  demoUrl = "https://www.shadcnblocks.com",
  items
}: NftCollectionGalleryProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <section className="py-32 font-poppins">
      <div className="">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 text-primary">
              {heading}
            </h2>
          </div>

          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>

        </div>
      </div>

      <div className="w-full ">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-8 ">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:max-w-[452px]">
                <div
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex aspect-3/2 overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <img
                            src={item.keyvalues.imageUrl}
                            alt={item.keyvalues.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {item.keyvalues.name}
                  </div>
                  <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                    {item.keyvalues.description}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default NftCollectionGallery

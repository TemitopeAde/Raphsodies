import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) =>
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 bg-white rounded-[30px]">
                  <div>
                    <div className="flex justify-between px-3">
                      
                      <div>
                        <svg
                          width="83"
                          height="57"
                          viewBox="0 0 83 57"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 16.8C0 22 1.2 25.8 3.6 28.2C5.6 30.2 8 31.6 10.8 32.4C13.6 33.2 16.2 34 18.6 34.8C20.6 35.6 21.6 37.2 21.6 39.6C21.6 42.4 21 45 19.8 47.4C18.6 49.8 17.2 52 15.6 54L18.6 57C23.4 52.6 27.4 47 30.6 40.2C33.8 33.4 35.4 26.6 35.4 19.8C35.4 14.2 33.8 9.6 30.6 5.99999C27.4 2 22.8 0 16.8 0C12.4 0 8.59999 1.8 5.39999 5.4C1.8 8.6 0 12.4 0 16.8ZM47.4 16.8C47.4 22 48.6 25.8 51 28.2C53 30.2 55.4 31.8 58.2 33C61 33.8 63.6 34.6 66 35.4C68 35.8 69 37.2 69 39.6C69 42.4 68.4 45 67.2 47.4C66 49.8 64.6 52 63 54L66 57C70.8 52.6 74.8 47 78 40.2C81.2 33.4 82.8 26.6 82.8 19.8C82.8 14.2 81.2 9.6 78 5.99999C74.8 2 70.2 0 64.2 0C59.8 0 56 1.8 52.8 5.4C49.2 8.6 47.4 12.4 47.4 16.8Z"
                            fill="#C78700"
                          />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <p className="text-primary">
                        I see alot of changes in my skin. It is softer and
                        smoother. I was wondering do you have body cream like
                        the skin repair that nourishes, removes blemishes and
                        revives the skin?
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

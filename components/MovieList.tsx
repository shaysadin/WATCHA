import React from "react";

import { isEmpty } from 'lodash';
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



// import required modules
import { Pagination, Navigation } from "swiper/modules";

interface MovieListProps {
    data: Record<string, any>[];
    title: string;
    isLargeRow?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ data, title, isLargeRow = false }) => {
    let perView;
    if (isEmpty(data)) {
        return null;
    }

    if (window.innerWidth < 640) {
        perView = isLargeRow ? 2 : 2;
    } else {
        perView = isLargeRow ? 7 : 4;
    }

    if (window.innerWidth < 1200 && window.innerWidth > 640){
        perView = isLargeRow ? 5 : 3;
    }

    return (
        // <div className="px-4 md:px-12 mt-8 space-y-8 flex ">
        //     <div>
        //         <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
        //             {title}
        //         </p>
        //         <div className={`flex gap-2 object-contain`}>
        //             {data.map((movie) => (
        //                 <div key={movie.id} className="flex-1 min-w-[30%] overflow-y-hidden overflow-x-scroll no-scrollbar">
        //                 <MovieCard data={movie} />
        //               </div>
        //             ))}
        //         </div>
        //     </div>
        // </div>
        <div className="px-4 md:px-12 mt-4 max-w-[95%] mx-auto">
            <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                {title}
            </p>
            <Swiper
                slidesPerView={perView}
                spaceBetween={5}
                navigation={{ enabled: true }}
                breakpoints={{
                    640: {
                        slidesPerView: perView,
                        spaceBetween: 7
                    },
                    768: {
                        slidesPerView: perView,
                        spaceBetween: 7
                    },
                    1024: {
                        slidesPerView: perView,
                        spaceBetween: 7
                    }
                }}
                modules={[Pagination, Navigation]}
                style={{
                   "--swiper-navigation-color": "#9d00e0",
                    "--swiper-navigation-size": "50px",
                  }}
                className={`${isLargeRow ? 'h-[45vh]' : 'h-[25vh]'}`}
            >
                {data.map((movie) => (

                    <SwiperSlide key={movie.id} className={`mt-4 z-10 ${isLargeRow ? 'h-[40vh]' : 'h-[20vh]'}`}>

                            <MovieCard data={movie} isLargeRow={isLargeRow} />

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        //     </div>
        // </div>
    )
}

export default MovieList;

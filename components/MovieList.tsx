import React from "react";

import { isEmpty } from 'lodash';
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";



// import required modules
import { Pagination } from "swiper/modules";

interface MovieListProps {
    data: Record<string, any>[];
    title: string;

}

const MovieList: React.FC<MovieListProps> = ({ data, title}) => {
    if (isEmpty(data)) {
        return null;
    }


    return (
    //     <div className="px-4 md:px-12 mt-4 space-y-8">
    //     <div>
    //       <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
    //       <div className="grid grid-cols-4 gap-2">
    //         {data.map((movie) => (
    //           <MovieCard key={movie.id} data={movie} />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
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
        <div className="px-4 md:px-12 mt-4 z-1 max-w-[95%] mx-auto">
            <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                {title}
            </p>
            <Swiper
                slidesPerView={2}
                spaceBetween={5}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 7
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 7
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 7
                    }
                }}
                modules={[Pagination]}
                className={`h-[34vw] sm:h-[12vw]`}
            >
                {data.map((movie) => (

                    <SwiperSlide key={movie.id} className={`sm:mt-4 object-cover hover:z-[999]`}>

                            <MovieCard data={movie}/>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        //     </div>
        // </div>
    )
}

export default MovieList;

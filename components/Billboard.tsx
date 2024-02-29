import useBillboard from "@/hooks/useBillboard";
import React, { useCallback, useEffect, useState } from "react";

import { AiOutlineInfoCircle } from 'react-icons/ai'
import PlayButton from "./PlayButton";
import useInfoModel from "@/hooks/useInfoModel";
import useMovieList from "@/hooks/useMovieList";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';


const Billboard = () => {

    // const { data } = useBillboard();
    const { openModal } = useInfoModel();
    const { data } = useMovieList(); // Fetch movie data using useMovieList hook
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false); // Move useState declaration here

    // Move isVisible state inside the useEffect hook
    useEffect(() => {
      setIsVisible(true);
    }, [currentIndex]);
    
    const currentMovie = data && data[currentIndex];
    

    // const handleOpenModal = useCallback(() => {
        //     openModal(data?.id);
        // }, [openModal, data?.id])
        
        
        const handleOpenModal = useCallback(() => {
            openModal(data[currentIndex]?.id);
        }, [openModal, data, currentIndex]);
        
        
        if (!data || data.length === 0) {
            return <div>No data available</div>;
        }


    return (
        <div className="relative h-[110.5vw] md:h-[62.5vw] lg:h-[48.50vw]">
             <video poster={currentMovie?.thumbnailUrl} className={`w-full h-[110.5vw] md:h-[62.5vw] lg:h-[48.50vw] object-cover brightness-[60%] transition duration-300`} autoPlay muted loop src={currentMovie?.videoUrl}></video>
      <div className={`absolute top-[30%] md:top-[40%] ml-4 md:ml-16`}>
                <p className="text-white text-3xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
                    {currentMovie?.title}
                </p>
                <p className="text-white text-[14px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                    {currentMovie?.description}
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <PlayButton movieId={currentMovie?.id} />
                    <button onClick={handleOpenModal} className="bg-white text-white bg-opacity-30 rounded-md py-3 md:py-2 px-3 md:px-3 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
                        <AiOutlineInfoCircle className="mr-1" />
                        More Info
                    </button>
                </div>
            </div>

            <div className="absolute bottom-[-55px] right-[-15px] sm:bottom-0 sm:right-0 flex flex-row items-end mr-4 mb-4 space-y-4 w-[70%] h-[70%] sm:w-[55%] sm:h-[23vh]">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'3'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={false}
                    modules={[EffectCoverflow, Pagination]}
                    onSlideChange={(swiper: { realIndex: React.SetStateAction<number>; }) => setCurrentIndex(swiper.realIndex)}
                >
                    {data.map((movie: { thumbnailUrl: string | undefined; }, index: any) => (
                        <SwiperSlide className="object-cover" key={index}>
                            <img onClick={handleOpenModal} src={movie?.thumbnailUrl} className="w-[100%] h-[120px] sm:h-[180px] rounded-md" />
                        </SwiperSlide>
                    ))};
                </Swiper>
            </div>
        </div>
    );
}


export default Billboard;


{/* <div className="relative h-[110.5vw] md:h-[62.5vw] lg:h-[48.50vw]">
            <video className="w-full h-[110.5vw] md:h-[62.5vw] lg:h-[48.50vw] object-cover brightness-[60%]" autoPlay muted loop poster={data?.thumbnailUrl} src={data?.videoUrl}></video>
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="text-white text-3xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
                    {data?.title}
                </p>
                <p className="text-white text-[14px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                    {data?.description}
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <PlayButton movieId={data?.id} />
                    <button onClick={handleOpenModal} className="bg-white text-white bg-opacity-30 rounded-md py-3 md:py-3 px-4 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
                        <AiOutlineInfoCircle className="mr-1" />
                        More Info
                    </button>
                </div>
            </div>
        </div> */}

import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";

import { AiOutlineInfoCircle } from 'react-icons/ai'
import PlayButton from "./PlayButton";
import useInfoModel from "@/hooks/useInfoModel";

const Billboard = () => {

    const { data } = useBillboard();
    const { openModal } = useInfoModel();

    const handleOpenModal = useCallback(() => {
        openModal(data?.id);
    }, [openModal, data?.id])

    return(
        <div className="relative h-[110.5vw] md:h-[62.5vw] lg:h-[48.50vw]">
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
        </div>
    )
};


export default Billboard;

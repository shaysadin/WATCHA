// import React, { useState } from "react";
// import { useRouter } from 'next/router';
// import { TiInfoLargeOutline } from 'react-icons/ti'
// import { BsFillPlayFill } from "react-icons/bs";
// import FavoriteButton from "./FavoriteButton";
// import useInfoModel from "@/hooks/useInfoModel";


// interface MovieCardProps {
//     data: Record<string, any>;

// }

// const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
//     const { openModal } = useInfoModel();
//     const router = useRouter();


//     return(
//         <div className={`group bg-zinc-900 col-span relative h-[40vh]`}
//         >
//             <img onClick={() => openModal(data?.id)} className="z-10 cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-200 w-full h-[40vh]" src={data.thumbnailUrl} alt="thumbnail" />
//             <div className="opacity-0 absolute top-0 transition duration-150 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:opacity-100">
//                 <img onClick={() => openModal(data?.id)} className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]" src={data.thumbnailUrl} alt="thumbnail" />
//                 <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
//                     <div className="z-10 flex flex-row items-center gap-3">
//                         <div onClick={() => router.push(`/watch/${data?.id}`)} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
//                             <BsFillPlayFill size={30} />
//                         </div>
//                         <FavoriteButton movieId={data?.id} />
//                         <div onClick={() => openModal(data?.id)} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
//                             <TiInfoLargeOutline className="text-white group-hover/item:text-neutral-300" size={20}/>
//                         </div>
//                     </div>
//                     <p className="text-green-400 font-semibold mt-4">
//                         New <span className="text-white">2023</span>
//                     </p>
//                     <div className="flex flex-row mt-4 gap-2 items-center">
//                         <p className="text-white text-[10px] lg:text-sm">
//                             {data.duration}
//                         </p>
//                     </div>
//                     <div className="flex flex-row mt-4 gap-2 items-center">
//                         <p className="text-white text-[10px] lg:text-sm">
//                             {data.genre}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default MovieCard;

import React from "react";
import { useRouter } from 'next/router';
import { TiInfoLargeOutline } from 'react-icons/ti'
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import useInfoModel from "@/hooks/useInfoModel";

interface MovieCardProps {
    data: Record<string, any>;
    isLargeRow?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, isLargeRow }) => {
    const { openModal } = useInfoModel();
    const router = useRouter();
    
    return (
        <div className={`group relative col-span hover:z-50 hover:mr-2 hover:ml-2 ${isLargeRow ? 'h-[40vh]' : 'h-[20vh]'}`}>
            <div className="relative z-10">
                <img
                    onClick={() => openModal(data?.id)}
                    className={`cursor-pointer object-fill object-center transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-200 w-full ${isLargeRow ? 'h-[40vh]' : 'h-[20vh]'}`}
                    src={data.thumbnailUrl}
                    alt="thumbnail"
                />
            </div>
            <div className={`opacity-0 absolute top-0 transition duration-150 z-10 invisible sm:visible delay-100 w-full scale-0 group-hover:scale-110 group-hover:opacity-100 ${isLargeRow ? 'h-[40vh]' : 'h-[20vh]'}`}>
                <img
                    onClick={() => openModal(data?.id)}
                    className={`cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full ${isLargeRow ? 'h-[16vh]' : 'h-[10vh]'}`}
                    src={data.thumbnailUrl}
                    alt="thumbnail"
                />
                <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
                    <div className="z-10 flex flex-row items-center gap-3">
                        <div
                            onClick={() => router.push(`/watch/${data?.id}`)}
                            className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                        >
                            <BsFillPlayFill size={30} />
                        </div>
                        <FavoriteButton movieId={data?.id} />
                        <div
                            onClick={() => openModal(data?.id)}
                            className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
                        >
                            <TiInfoLargeOutline className="text-white group-hover/item:text-neutral-300" size={20} />
                        </div>
                    </div>
                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-white">2023</span>
                    </p>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
                    </div>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
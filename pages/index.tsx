import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModel from "@/components/InfoModel";
import useInfoModel from "@/hooks/useInfoModel";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if(!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }

    return {
      props: {}
    }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites } = useFavorites();
  const { isOpen, closeModal } = useInfoModel();

  return (
    <>
    <InfoModel visible={isOpen} onClose={closeModal} />
     <Navbar />
     <Billboard />
     <div className="pb-40">
        <MovieList title="Trending now" data={movies} />
        <MovieList title="My List" data={favorites} />

     </div>
    </>
  )
}

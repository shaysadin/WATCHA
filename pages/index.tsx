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
import useMoviesByGenre from "@/hooks/useMoviesByGenre";
import CreateMovieForm from "@/components/CreateMovieForm";
import useCreateMovieForm from "@/hooks/useCreateMovieForm";



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
  const { data: byGenreAction = []} = useMoviesByGenre("Action");
  const { data: byGenreComedy = []} = useMoviesByGenre("Comedy");

  
  const { data: movies = [] } = useMovieList();
  const { data: favorites } = useFavorites();
  const { isOpen, closeModal } = useInfoModel();
  const { isFormOpen, closeForm } = useCreateMovieForm();

  return (
    <>
    <InfoModel visible={isOpen} onClose={closeModal} />
    <CreateMovieForm visible={isFormOpen} onClose={closeForm} />
     <Navbar />
     <Billboard />
     <div className="pb-40">
        <MovieList title="Trending now" data={movies} isLargeRow />
        <MovieList title="My List" data={favorites} />
        <MovieList title="Action" data={byGenreAction} />
        <MovieList title="Comedy" data={byGenreComedy} />
     </div>
    </>
  )
}

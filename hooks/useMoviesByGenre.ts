import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useMoviesByGenre = (genre: string) => {
    const { data, error, isLoading } = useSWR(`/api/movies?genre=${genre}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        data,
        error,
        isLoading
    };
};

export default useMoviesByGenre; 
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Movie } from 'tmdb-ts';
import { LoadingPopup } from '../../components/LoadingPopup';
import { MovieList } from '../../components/search/MovieList';

const Search: NextPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);

    const fetchMovies = async () => {
      const res = await fetch(`/api/search/${query}`);
      const data = await res.json();

      setIsLoading(false);

      setMovies(data.results);
    };

    fetchMovies();
  }, [query]);

  return (
    <>
      <Head>{query && <title>{query} | MovieTime</title>}</Head>
      {movies && <MovieList movies={movies} />}
      {isLoading && <LoadingPopup />}
    </>
  );
};

export default Search;

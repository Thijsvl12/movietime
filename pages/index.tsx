import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MovieList } from '../components/MovieList';

const Home: NextPage = () => {
  const [query, setQuery] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    if (router.query.query) setQuery(decodeURIComponent(router.query.query as string));
  }, [router.query]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      router.push(`/search/${encodeURIComponent(e.target.value)}`, undefined, { shallow: true });
    } else {
      router.push('/', undefined, { shallow: true });
    }

    setQuery(e.target.value);
  };

  return (
    <>
      <Head>{query && <title>{query} | MovieTime</title>}</Head>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl">
            <Link href="/" passHref>
              <a onClick={() => setQuery('')}>MovieTime</a>
            </Link>
          </h1>
          <input type="text" name="name" id="name" className="sticky top-4 z-10 my-4 block w-full rounded-lg border-gray-300 px-4 shadow-sm sm:text-sm" placeholder="Search" value={query} onChange={onChange} />
          <MovieList query={query} />
        </div>
      </div>
    </>
  );
};

export default Home;

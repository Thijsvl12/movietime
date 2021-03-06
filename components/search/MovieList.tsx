import { motion } from 'framer-motion';
import { MovieResult } from 'moviedb-promise/dist/request-types';
import React from 'react';
import { MovieListItem } from './MovieListItem';

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: 'easeInOut',
    },
  },
};

interface Props {
  movies: MovieResult[];
}

export const MovieList: React.FC<Props> = ({ movies }) => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="md:grid-col-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {movies.map((movie) => (
        <motion.div layout variants={itemVariants} key={movie.id}>
          <MovieListItem movie={movie} />
        </motion.div>
      ))}
    </motion.div>
  );
};

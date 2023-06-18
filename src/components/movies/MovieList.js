import React from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCard from './MovieCard';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config';
// https://api.themoviedb.org/3/movie/now_playing?api_key=
const MovieList = ({ type = 'now_playing' }) => {
    const { data, error } = useSWR(
        tmdbAPI.getMovieList(type),
        fetcher
    );
    const movies = data?.results || []
    return (
        <div>
            <div className="movie-list">
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                    {movies.length > 0 &&
                        movies.map((item) => (
                            <SwiperSlide key={item.id}>
                                <MovieCard item={item}></MovieCard>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
};

export default MovieList;
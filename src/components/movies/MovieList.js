import React, { useEffect, useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCard from './MovieCard';
// import "swiper/scss";
import useSWR from 'swr';
import { fetcher } from '../../config';
// https://api.themoviedb.org/3/movie/now_playing?api_key=
const MovieList = ({ type = 'now_playing' }) => {
    // const [movies, setMovies] = useState([])
    const { data, error } = useSWR(`https://api.themoviedb.org/3/movie/${type}?api_key=5e5db40364f06babf6b3694c61fb6e6d`, fetcher);
    const movies = data?.results || []
    // console.log(movies)
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
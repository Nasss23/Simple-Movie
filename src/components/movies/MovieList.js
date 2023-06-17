import React, { useEffect, useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCard from './MovieCard';
import "swiper/scss";
import useSWR from 'swr';
import { fetcher } from '../../config';
// https://api.themoviedb.org/3/movie/now_playing?api_key=
const MovieList = () => {
    const [movies, setMovies] = useState([])
    const { data, error } = useSWR('https://api.themoviedb.org/3/movie/now_playing?api_key=5e5db40364f06babf6b3694c61fb6e6d', fetcher);
    useEffect(() => {
        setMovies(data.results)
    }, [data]);

    console.log(movies)
    return (
        <div>
            <div className="movie-list">
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                    <SwiperSlide>
                        <MovieCard></MovieCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCard></MovieCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCard></MovieCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCard></MovieCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCard></MovieCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCard></MovieCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCard></MovieCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCard></MovieCard>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default MovieList;
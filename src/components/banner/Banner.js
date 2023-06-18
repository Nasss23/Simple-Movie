import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { SwiperSlide, Swiper } from 'swiper/react';
import { fetcher } from '../../config';
import "swiper/scss";
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const { data, error } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=5e5db40364f06babf6b3694c61fb6e6d`, fetcher);
    const movies = data?.results || []
    console.log(movies)
    return (
        <section className="banner h-[600px] page-container mb-20 overflow-hidden">
            <Swiper grabCursor={"true"} slidesPerView={"auto"}>
                {movies.length > 0 && movies.map((item) => (
                    <SwiperSlide key={item.id}>
                        <BannerItem item={item}></BannerItem>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

function BannerItem({ item }) {
    const { title, poster_path, id } = item;
    const navigate = useNavigate();
    return (
        <div className="relative w-full h-full rounded-lg">
            <div className="overplay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" className="object-cover object-top w-full h-full rounded-lg" />
            <div className="absolute w-full text-white left-5 bottom-5">
                <h2 className="mb-3 text-3xl font-bold">{title}</h2>
                <div className="flex items-center mb-8 gap-x-3">
                    <span className="px-4 py-2 border border-white rounded-md">
                        Adventure
                    </span>
                    <span className="px-4 py-2 border border-white rounded-md">
                        Adventure
                    </span>
                    <span className="px-4 py-2 border border-white rounded-md">
                        Adventure
                    </span>
                </div>
                <Button bgColor='secondary' onClick={() => navigate(`/movie/${id}`)}> Watch now</Button>
            </div>
        </div>
    );
}
export default Banner;
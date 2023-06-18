import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { SwiperSlide, Swiper } from 'swiper/react';
import { fetcher } from '../../config';
import "swiper/scss";

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
    const { title, poster_path } = item;
    return (
        <div className="w-full h-full rounded-lg relative">
            <div className="overplay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" className="w-full h-full object-cover rounded-lg object-top" />
            <div className="absolute left-5 bottom-5 w-full text-white">
                <h2 className="font-bold text-3xl mb-3">{title}</h2>
                <div className="flex items-center gap-x-3 mb-8">
                    <span className="py-2 px-4 border border-white rounded-md">
                        Adventure
                    </span>
                    <span className="py-2 px-4 border border-white rounded-md">
                        Adventure
                    </span>
                    <span className="py-2 px-4 border border-white rounded-md">
                        Adventure
                    </span>
                </div>
                <button className="p-3 px-6 rounded-lg bg-primary text-white font-medium">Watch</button>
            </div>
        </div>
    );
}
export default Banner;
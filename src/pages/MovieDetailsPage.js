import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCard from 'components/movies/MovieCard';
import { fetcher, tmdbAPI } from 'components/apiConfig/config';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const { data, error } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);

    if (!data) return null;
    const { backdrop_path, poster_path, title, genres, overview } = data;
    return (
        <div className='py-10 '>
            <div className="w-full h-[700px] relative">
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div className="w-full h-full bg-no-repeat bg-cover" style={{
                    backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`
                }}>
                </div>
            </div>
            <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
                <img
                    src={tmdbAPI.imageOriginal(poster_path)}
                    alt=""
                    className='object-cover w-full h-full rounded-xl'
                />
            </div>
            <h1 className='mb-10 text-4xl font-bold text-center text-white'>{title}</h1>
            {genres.length > 0 && (
                <div className="flex items-center justify-center mb-10 gap-x-5">
                    {genres.map((item) => (
                        <span key={item.id}
                            className='px-4 py-2 border rounded border-primary text-primary'
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
            )}
            <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">{overview}</p>
            <MovieCredits></MovieCredits>
            <MovieVideos></MovieVideos>
            <MovieSimelar></MovieSimelar>
        </div>
    );
};
function MovieCredits() {
    const { movieId } = useParams();
    const { data, error } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
    if (!data) return null;

    const { cast } = data;
    if (!cast || cast.length < 0) return null;

    return (
        <>
            <h2 className='mb-10 text-3xl text-center'>Cast</h2>
            <div className="grid grid-cols-4 gap-5">
                {cast.slice(0, 4).map((item) => (
                    <div className="cast-item" key={item.id}>
                        <img src={tmdbAPI.imageOriginal(item.profile_path)} alt="" className='w-full h-[350px] object-cover rounded-lg mb-3' />
                        <h3 className='text-xl font-medium'>{item.name}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

function MovieVideos() {
    const { movieId } = useParams();
    const { data, error } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className='py-10 '>
            <div className="flex flex-col gap-10">
                {results.slice(0, 1).map((item) => (
                    <div className="" key={item.id}>
                        <h3 className='inline-block p-3 mb-5 text-xl font-medium bg-secondary'>{item.name}</h3>
                        <div key={item.id} className='w-full aspect-video'>
                            <iframe
                                width="1268"
                                height="713"
                                src={`https://www.youtube.com/embed/${item.key}`}
                                title="Những thói quen anh em dev nên có để trở thành Lập Trình Viên xịn"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className='object-fill w-full h-full'
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function MovieSimelar() {
    const { movieId } = useParams();
    const { data, error } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
    if (!data) return null;
    console.log('data: ', data);

    const { results } = data;
    console.log('results: ', results);
    if (!results || results.length <= 0) return null;

    return (
        <div className='py-10'>
            <div className="mb-10 text-3xl font-medium">Similar</div>
            <div>
                <div className="movie-list">
                    <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                        {results.length > 0 &&
                            results.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <MovieCard item={item}></MovieCard>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailsPage;
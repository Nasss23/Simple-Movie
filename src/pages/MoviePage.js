import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from 'components/apiConfig/config';
import MovieCard, { MovieCardSkeleton } from 'components/movies/MovieCard';
import useDebounce from 'hooks/useDebounce';
import ReactPaginate from 'react-paginate';
import { v4 } from 'uuid';

const itemsPerPage = 20;
const MoviePage = () => {
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    // const endOffset = itemOffset + itemsPerPage;


    const [pages, setPages] = useState(1);
    const [filter, setFilter] = useState('');
    const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", pages));
    const filterDebounce = useDebounce(filter, 2000);
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };
    const { data, error } = useSWR(url, fetcher);
    const loading = !data && !error;

    useEffect(() => {
        if (filterDebounce) {
            setUrl(tmdbAPI.getMovieSearch(filterDebounce, pages));
        } else {
            setUrl(tmdbAPI.getMovieList("popular", pages));
        }
    }, [filterDebounce, pages])
    // if (!data) return null;
    const movies = data?.results || [];
    // const { page, total_pages } = data;
    useEffect(() => {
        if (!data || !data.total_results) return;
        // const endOffset = itemOffset + itemsPerPage;
        setPageCount(Math.ceil(data.total_results / itemsPerPage))
    }, [data, itemOffset])

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_results;

        setItemOffset(newOffset);
        setPages(event.selected + 1)
    };
    return (
        <div className='py-10 page-container'>
            <div className="flex mb-10">
                <div className="flex-1">
                    <input
                        type="text"
                        className='w-full p-4 text-white outline-none bg-slate-800'
                        placeholder='Type here to search...'
                        onChange={handleFilterChange}
                    />
                </div>
                <button className='p-4 text-white rounded-sm bg-primary'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </div>
            {/* {loading &&
                <div className='w-10 h-10 mx-auto border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin'></div>
            } */}
            {loading && (
                <div className="grid grid-cols-5 gap-8">
                    {new Array(itemsPerPage).fill(0).map(() => (
                        <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
                    ))}
                </div>
            )}
            <div className="grid grid-cols-5 gap-8">
                {!loading && movies.length > 0 && movies.map((item) => (
                    <MovieCard key={item.id} item={item}></MovieCard>
                ))}
            </div>
            <div className="mt-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className='pagination'
                />
            </div>

        </div>
    );
};

export default MoviePage;
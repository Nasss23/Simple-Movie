import React from 'react';

const MovieCard = () => {
    return (
        <div>
            <div className="movie-card rounded-lg p-3 bg-slate-800 text-white ">
                <img src="https://genk.mediacdn.vn/139269124445442048/2020/2/14/1-15816746144451193748082.jpg" alt="" className="w-full h-[250px] object-cover rounded-lg mb-5" />
                <h3 className="text-xl font-bold mb-3">Spiderman: Homecoming</h3>
                <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                    <span>2017</span>
                    <span>7.4</span>
                </div>
                <button className="py-3 px-6 rounded-lg capitalize bg-primary w-full">Watch now</button>
            </div>
        </div>
    );
};

export default MovieCard;
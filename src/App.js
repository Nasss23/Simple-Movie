import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss"
import Main from "./components/layout/Main";
// import HomePage from "./pages/HomePage";
import Banner from "./components/banner/Banner";
// import MoviePage from "./pages/MoviePage";
// import MovieDetailsPage from "./pages/MovieDetailsPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePageV2 = lazy(() => import("./pages/MoviePageV2"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={<>
                <Banner></Banner>
                <HomePage></HomePage>
              </>}
            ></Route>
            <Route path="/movies" element={<MoviePageV2></MoviePageV2>}></Route>
            <Route path="/movie/:movieId" element={<MovieDetailsPage></MovieDetailsPage>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App; 

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

import "./App.css";
import searchIcon from "./search.svg";

const API_URL = "https://omdbapi.com?apikey=81c0abc3";

function App() {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();

		setMovies(data.Search);
	};

	useEffect(() => {
		searchMovies("Pursuit");
	}, []);
	return (
		<div className="app">
			<h1>Movieland</h1>

			<div className="search">
				<input
					type="text"
					placeholder="Search movies"
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<img src={searchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
			</div>

			{movies?.length > 0 ? (
				<div className="container">
					{movies.map((movie) => {
						return <MovieCard movie={movie} />;
					})}
				</div>
			) : (
				<div className="empty">
					<h2>No movies found</h2>
				</div>
			)}
		</div>
	);
}

export default App;

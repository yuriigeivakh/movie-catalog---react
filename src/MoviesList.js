import React, { Component } from 'react';
import Movie from './Movies';
import styled from 'styled-components';


class MoviesList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			movies: [],
		};
	}


	async componentDidMount() {
		try {
			const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=16a9b8482977d1a86b627db4605d2c43&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
			const movies = await res.json();
			console.log(movies)
			this.setState({
				movies: movies.results
			})
		} catch(e) {
			console.log(e)
		}
	}

	render() {
		return (
			<MovieGrid>
				{this.state.movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
			</MovieGrid>
		);
	}
}

export default MoviesList

const MovieGrid = styled.div`
	display: grid;
	padding: 1 rem;
	grid-template-columns: repeat(2, 1fr);
	@media only screen and (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
		margin-top: 0;
	};
	@media only screen and (min-width: 900px) {
		grid-template-columns: repeat(4, 1fr);
		margin-top: 0;
	};
	@media only screen and (min-width:1168px) {
		grid-template-columns: repeat(6, 1fr);
	}
`;
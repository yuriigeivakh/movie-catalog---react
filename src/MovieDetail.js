import React, { Component } from 'react';
import {Poster} from './Movies';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: {},
			isOpen: false
		}
		this.toggleOpen =this.toggleOpen.bind(this);
		this.getBody =this.getBody.bind(this);
	}

	async componentDidMount() {
		try {
			const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=16a9b8482977d1a86b627db4605d2c43&language=en-US`);
			const movie = await res.json();
			this.setState({
				movie,
			});
		} catch(e) {
			console.log(e)
		}
	}

	render() {
		const { movie } = this.state;
		const text = this.state.isOpen ? 'hide' : 'more detail';
		return (
			<MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
				<MovieInfo>
					<Wrapper>
						<Overdrive id={movie.id}>
							<Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} className="img-movie"/>
						</Overdrive>
					</Wrapper>
					<div className="movie-wrapper">
						<h1>{movie.title}</h1>
						<h3 className="release-date">Release date : {movie.release_date}</h3>
						<p>{movie.overview}</p>
						<div className="button" onClick={this.toggleOpen}>{text} </div>
						{this.getBody()}
					</div>
				</MovieInfo>
			</MovieWrapper>
		);
	}

	toggleOpen () {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	getBody(){
		const { movie } = this.state;
		if (!this.state.isOpen) return null
		return <section>
			<p>Budget: <span className="add-information">{movie.budget} $</span></p>
			<p>Running time: <span className="add-information">{movie.runtime} minutes</span></p>
			<p>Popularity: <span className="add-information">{movie.popularity}</span> </p>
			<p>Original language: <span className="add-information">{movie.original_language}</span> </p>
			<p>Rate : <span className="add-information">{movie.vote_average} </span></p>
				</section>
	}
}

export default MovieDetail

const MovieWrapper = styled.div`
	position: relative;
	padding-top: 25vh;
	background-size: cover;
	background: url(${props => props.backdrop}) no-repeat top;
	@media only screen and (min-width: 968px) {
		padding-top: 30vh;
	}
	@media only screen and (min-width: 968px) {
		padding-top: 320px;
	}
`;

const MovieInfo = styled.div`
	background: white;
	text-align: left;
	padding: 2rem 10%;
	display: flex;
	> div {
		margin-left: 20px;
	}
	img {
		position: relative;
		top: -5rem;
	}
	@media only screen and (max-width: 768px) {
		flex-direction: column;
		justify-content: center;
		> div {
			margin:0 auto;
		}
		img {
			position: static;
			margin-top: -200px;
		}
	}
`;

const Wrapper = styled.div`
	@media only screen and (max-width: 768px) {
		width: none;
	}
`;

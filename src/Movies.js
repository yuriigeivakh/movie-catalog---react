import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';


const Movie = ({movie}) => (
	<Link to={`/${movie.id}`} className="movie">
		<Overdrive id={movie.id}>
			<div className="wrapper-movie">
				<Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title}/>
				<p>{movie.title}</p>
			</div>
		</Overdrive>
	</Link>
)

Movie.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
	})
}

export default Movie;

export const Poster = styled.img`
	box-shadow: 0 0 5px black;
	@media only screen and (max-width: 480px) {
		width: 100%;
	}
`;



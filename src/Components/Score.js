import React, { Component } from 'react';
import '../App.css';

class Score extends Component {
	render() {
		const { userName, score } = this.props;

		return (
			<div>
				<h2>Results</h2>
				<h4>{userName}, your Score is: {score}</h4>
			</div>
		);
	}
}

export default Score;

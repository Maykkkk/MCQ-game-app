import React, { Component } from "react";
import Options from "./Option";
//import questionStyles from './Question.css';

class Question extends Component {
  render() {
    const { question, selectedOption, onOptionChange, onSubmit } = this.props;

    return (
      <div className="">
        <h3 className="question-number">{question.id}/10</h3>
        <h3>{question.question}</h3>
        <form onSubmit={onSubmit} className="mt-2 mb-2">
          <Options
            options={question.options}
            selectedOption={selectedOption}
            onOptionChange={onOptionChange}
          />
          <button type="submit" className="btn btn-primary mt-2">
            Done
          </button>
        </form>
      </div>
    );
  }
}

export default Question;

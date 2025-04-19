import React from "react";

function QuestionList({ questions, deleteQuestion, updateCorrectAnswer }) {
  return (
    <div>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <p>{question.prompt}</p>
            <select
              value={question.correctIndex}
              onChange={(e) =>
                updateCorrectAnswer(question.id, parseInt(e.target.value))
              }
            >
              {question.answers.map((answer, index) => (
                <option key={index} value={index}>
                  {answer}
                </option>
              ))}
            </select>
            <button onClick={() => deleteQuestion(question.id)}>
              Delete Question
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;

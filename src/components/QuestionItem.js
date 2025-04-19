import React from "react";

function QuestionItem({ question, onUpdate, onDelete }) {
  const handleCorrectAnswerChange = (e) => {
    const newIndex = parseInt(e.target.value);
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => onUpdate(updatedQuestion));
  };

  const handleDelete = () => {
    onDelete(question.id);
  };

  return (
    <li>
      <h3>{question.prompt}</h3>
      <select
        value={question.correctIndex}
        onChange={handleCorrectAnswerChange}
        aria-label="Correct Answer"
      >
        {question.answers.map((answer, index) => (
          <option key={index} value={index}>
            {answer}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

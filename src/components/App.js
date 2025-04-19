import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:4000/questions");
      const data = await response.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  // Handle adding a new question
  const addQuestion = async (newQuestion) => {
    const response = await fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });
    const data = await response.json();
    setQuestions((prevQuestions) => [...prevQuestions, data]);
  };

  // Handle deleting a question
  const deleteQuestion = async (id) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });
    setQuestions(questions.filter((question) => question.id !== id));
  };

  // Handle updating a question's correct answer
  const updateCorrectAnswer = async (id, newIndex) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newIndex }),
    });
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, correctIndex: newIndex } : question
      )
    );
  };

  return (
    <div>
      <nav>
        <button onClick={() => setFormVisible((prev) => !prev)}>
          New Question
        </button>
        <button onClick={() => setFormVisible(false)}>View Questions</button>
      </nav>

      {isFormVisible ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestion}
          updateCorrectAnswer={updateCorrectAnswer}
        />
      )}
    </div>
  );
}

export default App;

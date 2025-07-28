
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
      });
  }

  function handleUpdate(id, correctIndex) {
    // Optimistically update state
    setQuestions((prev) => prev.map((q) => q.id === id ? { ...q, correctIndex } : q));
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updated) => {
        setQuestions((prev) => prev.map((q) => {
          if (q.id === id) {
            return { ...q, ...updated, correctIndex: updated.correctIndex ?? correctIndex };
          }
          return q;
        }));
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((q) => (
          <QuestionItem
            key={q.id}
            question={q}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;

import "./App.css";
import { of } from "rxjs";
import { useObservable, useSquid } from "@squidcloud/react";
import { ChangeEvent, useState } from "react";

function App() {
  const squid = useSquid();
  const [question, setQuestion] = useState("");
  const [questionToAsk, setQuestionToAsk] = useState("");

  const { data: answer } = useObservable(
    () => {
      if (questionToAsk === "") return of("");
      return squid
        .ai()
        .assistant("MyWebsiteAssitant")
        .profile("Vfunctions")
        .chat(questionToAsk);
    },
    "",
    [questionToAsk]
  );

  function questionChanged(e: ChangeEvent) {
    setQuestionToAsk("");
    setQuestion((e.target as HTMLInputElement).value);
  }

  return (
    <>
      <div className="container">
        <input
          className="question-input"
          onChange={questionChanged}
          value={question}
        ></input>
        <button
          className="submit-button"
          onClick={() => setQuestionToAsk(question)}
        >
          Ask question
        </button>
        <div className="answer-container">{answer}</div>
      </div>
    </>
  );
}

export default App;

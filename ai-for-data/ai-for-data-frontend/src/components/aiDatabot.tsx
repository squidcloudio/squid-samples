import { ChangeEvent, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useSquid } from '@squidcloud/react';
import Messages from './messages';
import { AiResponse } from '../common/favoritePets';

const AiDatabot = () => {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<AiResponse[]>([]);
  const [complete, setComplete] = useState(true);
  const squid = useSquid();

  function askQuestion() {
    setComplete(false);
    squid.executeFunction('askQuestion', question).then((response) => {
      setHistory((prev) => [
        ...prev,
        { author: 'user', answer: question },
        response,
      ]);
      setComplete(true);
      setQuestion('');
    });
  }

  function questionChanged(e: ChangeEvent) {
    setQuestion((e.target as HTMLInputElement).value);
  }

  return (
    <>
      <div className="scrolling">
        <Messages messages={history} />
      </div>
      <form onSubmit={() => askQuestion()}>
        <div className="question">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Enter your question"
            variant="outlined"
            onChange={questionChanged}
            value={question}
          />
          <Button
            variant="contained"
            disabled={!complete}
            onClick={askQuestion}
          >
            Ask question
          </Button>
        </div>
      </form>
    </>
  );
};

export default AiDatabot;

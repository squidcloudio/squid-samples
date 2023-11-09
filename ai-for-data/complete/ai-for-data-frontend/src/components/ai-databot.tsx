import { ChangeEvent, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useSquid } from '@squidcloud/react';
import Messages from './messages';
import { AiResponse } from '../common/favorite-pets';

const AiDatabot = () => {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<AiResponse[]>([]);
  const [complete, setComplete] = useState(true);
  const squid = useSquid();

  function askQuestion() {
    setComplete(false);
    squid?.executeFunction('askQuestion', question).then((response) => {
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

  function checkKey(ele: React.KeyboardEvent<HTMLDivElement>) {
    if (ele.key === 'Enter') {
      askQuestion();
    }
  }

  return (
    <>
      <div className="scrolling">
        <Messages messages={history} />
      </div>
      <div className="question">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Enter your question"
          variant="outlined"
          onChange={questionChanged}
          onKeyDown={(event) => checkKey(event)}
          value={question}
        />
        <Button variant="contained" disabled={!complete} onClick={askQuestion}>
          Ask question
        </Button>
      </div>
    </>
  );
};

export default AiDatabot;

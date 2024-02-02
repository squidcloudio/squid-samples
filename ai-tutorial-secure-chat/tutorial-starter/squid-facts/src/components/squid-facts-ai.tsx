import { ChangeEvent, useState } from 'react';
import { TextField, Button } from '@mui/material';

const SquidFactsAI = () => {
  const [question, setQuestion] = useState('');

  function askQuestion() {
    setQuestion('');
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
      <div className="scrolling"></div>
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
        <Button variant="contained" disabled={false} onClick={askQuestion}>
          Ask question
        </Button>
      </div>
    </>
  );
};

export default SquidFactsAI;

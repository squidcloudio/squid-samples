import { ChangeEvent, useState } from 'react';
import { TextField, Button } from '@mui/material';
import Messages from './messages';
import { useAiChatbot } from '@squidcloud/react';

const SquidFactsAI = () => {
  const [question, setQuestion] = useState('');
  const { history, chat, complete, error } = useAiChatbot(
    'squid-facts',
    'squid-facts-assistant',
  );

  function askQuestion() {
    chat(question);
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
        {error && <div>{error.toString()}</div>}
      </div>
    </>
  );
};

export default SquidFactsAI;

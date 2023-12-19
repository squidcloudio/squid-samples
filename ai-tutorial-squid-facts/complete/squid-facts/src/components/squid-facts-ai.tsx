import { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Messages from './messages';
import { useAiChatbot } from '@squidcloud/react';

function SquidFactsAI() {
  const [question, setQuestion] = useState('');
  const { history, chat, complete } = useAiChatbot(
    'squid-facts-ai',
    'squid-facts-chatbot',
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
      </div>
    </>
  );
}

export default SquidFactsAI;

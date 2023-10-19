import { ChangeEvent, useState} from 'react';
import Messages from './messages';
import { useAiAssistant } from '@squidcloud/react';


function SquidFactsAI() {
    const [question, setQuestion] = useState('');
    const { history, chat, complete } = useAiAssistant(
        'squid-facts',
        'wikipedia-facts'
    );

    function askQuestion() {
        chat(question);
        setQuestion('');
    }

    function questionChanged(e: ChangeEvent) {
        setQuestion((e.target as HTMLInputElement).value);
    }

    function checkKey(ele: React.KeyboardEvent<HTMLInputElement>) {
        if (ele.key === 'Enter') {
            askQuestion();
        }
    }

    return (
        <>
            <div id="scrolling"  >
                <Messages messages={history} />
            </div>
            <input onChange={questionChanged} onKeyDown={(event) => checkKey(event)} value={question}></input>
            <button disabled={!complete} onClick={askQuestion} >
                Ask question
            </button>

        </>
    );
}

export default SquidFactsAI;
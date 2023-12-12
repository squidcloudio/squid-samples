import React from 'react';
import { Poll } from '@/common/common-types';
import { useCollection } from '@squidcloud/react';

export default function CreatePoll() {
  const pollsCollection = useCollection<Poll>('polls');

  const title = React.createRef<HTMLInputElement>();
  const question = React.createRef<HTMLInputElement>();
  const responses = [
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
  ];

  return (
    <div className="create_poll">
      <div>
        <h1>Create a poll</h1>
        <div className="subtitle">
          This could be your company’s support form
        </div>
      </div>

      <div>
        <h2>Title</h2>
        <input ref={title} />
      </div>
      <div>
        <h2>Question</h2>
        <input ref={question} />
      </div>
      <div>
        <h2>Responses</h2>
        <div className="responses">
          <input ref={responses[0]} />
          <input ref={responses[1]} />
          <input ref={responses[2]} />
          <input ref={responses[3]} />
        </div>
      </div>
      <button
        onClick={() => {
          const poll: Poll = {
            name: title.current!.value,
            state: 'active',
            questions: [
              {
                question: question.current!.value,
                answers: responses
                  .map((r) => r.current!.value)
                  .filter((x) => x),
              },
            ],
            updateDate: new Date(),
          };

          pollsCollection.doc().insert(poll).then();
        }}
      >
        Create poll
      </button>
    </div>
  );
}

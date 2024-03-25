import { Answer, Poll } from '@/common/common-types';
import { useCollection, useQuery } from '@squidcloud/react';
import { useAuth0 } from '@auth0/auth0-react';
import { DocumentReference } from '@squidcloud/client';
import { Fragment } from 'react';
import Check from '@/assets/icons/check_icon.svg';
import Circle from '@/assets/icons/circle_icon.svg';

export default function RespondToPoll({ poll }: { poll: Poll }) {
  const responsesCollection = useCollection<Answer>('answers');
  const { user } = useAuth0();
  const { data: responses } = useQuery(
    responsesCollection
      .query()
      .eq('pollId', poll.__id!)
      .eq('userId', user!.sub!),
    true,
  );

  const answerByQuestion: Array<DocumentReference<Answer> | undefined> = Array(
    poll.questions.length,
  );
  for (const response of responses) {
    answerByQuestion[response.data.questionIndex] = response;
  }

  return (
    <div className="respond_to_poll">
      <h1>{poll.name}</h1>
      {poll.questions.map((q, questionIndex) => (
        <Fragment key={questionIndex}>
          <h2>{q.question}</h2>
          {q.answers.map((a, answerIndex) => {
            const responseRef = answerByQuestion[questionIndex];

            function selectThisAnswer() {
              if (responseRef) {
                responseRef
                  .update({
                    answerIndex,
                    updateDate: new Date(),
                  })
                  .then();
              } else {
                responsesCollection
                  .doc()
                  .insert({
                    pollId: poll.__id!,
                    questionIndex,
                    answerIndex,
                    userId: user!.sub!,
                    updateDate: new Date(),
                  })
                  .then();
              }
            }

            const selected = responseRef?.data.answerIndex === answerIndex;
            return (
              <Fragment key={answerIndex}>
                <div
                  className={`answer ${selected ? 'selected' : ''}`}
                  onClick={selectThisAnswer}
                >
                  <span>{a}</span>
                  {selected ? <Check /> : <Circle />}
                </div>
              </Fragment>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}

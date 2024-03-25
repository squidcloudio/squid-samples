import { Answer, PollRef } from '@/common/common-types';
import { Fragment, useState } from 'react';
import { useCollection, useQuery } from '@squidcloud/react';
import { groupBy } from 'lodash';
import { Cell, Pie, PieChart } from 'recharts';
import UpArrow from '@/assets/icons/arrow_up.svg';
import DownArrow from '@/assets/icons/arrow_down.svg';
import Users from '@/assets/icons/users.svg';

export default function PollCard({ poll }: { poll: PollRef }) {
  const [open, setOpen] = useState<boolean>();
  const responsesCollection = useCollection<Answer>('answers');
  const { data: responses } = useQuery(
    responsesCollection.query().eq('pollId', poll.data.__id!).dereference(),
    true,
  );
  const responsesByQuestion = groupBy(responses, 'questionIndex');

  return (
    <div className="poll_card" onClick={() => setOpen(!open)}>
      <div className="poll_header">
        <div>
          <h1>{poll.data.name}</h1>
        </div>
        <div className="icons">
          <Users /> x{responsesByQuestion[0]?.length || 0}
          {open ? <DownArrow /> : <UpArrow />}
        </div>
      </div>

      {open && (
        <>
          {poll.data.questions.map((q, questionIndex) => {
            const colors = ['#9483FF', '#25CFF4', '#F1CE52', '#F96855'];
            const pieData = Object.entries(
              groupBy(responsesByQuestion[questionIndex], (a) => a.answerIndex),
            ).map(([key, values]) => {
              return {
                name: q.answers[+key],
                count: values.length,
                color: colors[+key],
              };
            });

            return (
              <Fragment key={questionIndex}>
                <div className="question_div">
                  <div>
                    <h1>{q.question}</h1>
                    <table>
                      <tbody>
                        {pieData.map(
                          ({ name: answer, count, color }, index) => (
                            <tr key={index}>
                              <td>{answer}</td>
                              <td
                                className="count"
                                style={{ textAlign: 'right' }}
                              >
                                <div
                                  className="rect"
                                  style={{ backgroundColor: color }}
                                />
                                {count}
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                  <PieChart width={250} height={250}>
                    <Pie
                      data={pieData}
                      dataKey="count"
                      isAnimationActive={false}
                    >
                      {pieData.map(({ color }, index) => (
                        <Cell key={index} fill={color} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              </Fragment>
            );
          })}
          <div className="buttons">
            {poll.data.state === 'active' && (
              <button
                className=""
                onClick={() => poll.setInPath('state', 'expired')}
              >
                End poll
              </button>
            )}
            {poll.data.state === 'expired' && (
              <button
                className=""
                onClick={() => poll.setInPath('state', 'active')}
              >
                Revive poll
              </button>
            )}
            <button className="delete" onClick={() => poll.delete()}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

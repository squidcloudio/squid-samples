import { DocumentReference } from '@squidcloud/client';

export type State = 'active' | 'expired';

export interface Question {
  question: string;
  answers: string[];
}

export interface Poll {
  __id?: string;
  name: string;
  questions: Question[];
  state: State;
  updateDate: Date;
}

export type PollRef = DocumentReference<Poll>;

export interface Answer {
  pollId: string;
  questionIndex: number;
  answerIndex: number;
  userId: string;
  updateDate: Date;
}

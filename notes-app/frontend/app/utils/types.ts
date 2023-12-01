export type OnNoteAction = (note: Note) => Promise<void> | void;

export type Note = {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
};

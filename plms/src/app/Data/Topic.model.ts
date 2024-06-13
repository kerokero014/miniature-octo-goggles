import Note from './Note.model';

interface Topic {
    topic_id: number;
    title: string;
    description: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    notes: Note[];
  }

export default Topic;
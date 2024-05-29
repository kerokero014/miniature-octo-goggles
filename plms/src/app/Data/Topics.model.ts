import SubTopics from './SubTopics.model';

interface Topics {
  id: number;
  title: string;
  description: string;
  image: string;
  SubTopics: SubTopics[];
}

export default Topics;

import Job from './job';

export default interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  jobs: Job[];
}

import { Photo } from './photo';

// It is conventional to use lowercase in the properties
// of a typescript file and is different from what we are doing in C# (title case)
// since they are different language
export interface User {
  id: number;
  userName: string;
  knownAs: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;

  // This is optional that is why we use the 'elvies' or '?' operator
  // Optional properties should come after the required properties or else you will get
  // an error
  interest?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: Photo[];
  roles?: string[];
}


export type Identity = 'student' | 'alumni' | 'faculty';

export interface Story {
  id: string;
  identity: Identity;
  college: string;
  graduationYear: string; // Year of graduation (or expected)
  targetPerson: string; // The teacher or student who is the protagonist
  content: string;
  image?: string; // Base64 or URL of the uploaded image
  author: string;
  date: string;
}

export type ViewState = 'landing' | 'form' | 'wall';

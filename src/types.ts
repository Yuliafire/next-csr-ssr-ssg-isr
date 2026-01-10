export interface User {
  id: number;
  name: string;
  email: string;
}

export interface FormData {
  text: string;
  file1: FileList;
  file2: FileList;
}

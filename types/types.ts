export type Author = {
  name: string;
  id: string;
};

export type Contributions = {
  author: Author;
  contribution: string;
};

export type Piece = {
  id: string;
  title: Contributions[];
  authors: Author[];
  content: Contributions[];
};

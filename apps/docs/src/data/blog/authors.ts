export type Author = {
  id: number;
  name: string;
  username: string;
  avatar: string;
  link: string;
};

export const AuthorUsernames = {
  dilaneKombou: '@dilanekombou',
} as const;

type AuthorUsername = (typeof AuthorUsernames)[keyof typeof AuthorUsernames];

export const Authors: Record<AuthorUsername, Author> = {
  [AuthorUsernames.dilaneKombou]: {
    id: 1,
    name: 'Dilane Kombou',
    username: AuthorUsernames.dilaneKombou,
    avatar: '/assets/blog/authors/dilane-kombou.jpeg',
    link: 'https://twitter.com/dilanekombou',
  },
};

// Not a `middleware.ts`/`*.route.ts` file, so the _api/ glob ignores it —
// just a plain module shared by the routes below.
export type User = { id: string; name: string };

export const users: User[] = [
  { id: '1', name: 'Naruto' },
  { id: '2', name: 'Sasuke' },
];

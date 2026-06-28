import { Provider } from '@rasenganjs/server';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

export class UserService extends Provider {
  async findAll() {
    return users;
  }

  async findById(id: number) {
    return users.find((user) => user.id === id);
  }

  async create(data: { name: string }) {
    const id = users.length + 1;
    users.push({ id, name: data.name });
    return { id, name: data.name };
  }
}

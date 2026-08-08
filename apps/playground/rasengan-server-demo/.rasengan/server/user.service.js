import { Provider } from '@rasenganjs/server';
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
class UserService extends Provider {
  async findAll() {
    return users;
  }
  async findById(id) {
    return users.find((user) => user.id === id);
  }
  async create(data) {
    const id = users.length + 1;
    users.push({ id, name: data.name });
    return { id, name: data.name };
  }
}
export { UserService };

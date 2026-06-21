import { Provider } from '@rasenganjs/server';

export class UserService extends Provider {
  async findAll() {
    return [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
  }

  async findById(id: string) {
    return { id, name: 'Alice' };
  }
}

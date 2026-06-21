class UserService {
  async findAll() {
    return [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
  }
  async findById(id) {
    return { id, name: 'Alice' };
  }
}
export { UserService };

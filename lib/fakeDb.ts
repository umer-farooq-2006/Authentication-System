let users = (globalThis as any).users || [];

(globalThis as any).users = users;

export const fakeDB = {
  createUser: (user: any) => {
    users.push(user);
    return user;
  },

  findUserByEmail: (email: string) => {
    return users.find((u: any) => u.email === email);
  },

  getAllUsers: () => users,
};
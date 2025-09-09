export type UserEntity = {
  id: string;
  login: string;
  role: "reader" | "writer" | "admin";
  registeredAt: string; // ISO date
};

export const usersMock: UserEntity[] = [
  { id: "u1", login: "admin", role: "admin", registeredAt: new Date(Date.now() - 20 * 86400000).toISOString() },
  { id: "u2", login: "writer", role: "writer", registeredAt: new Date(Date.now() - 10 * 86400000).toISOString() },
  { id: "u3", login: "reader1", role: "reader", registeredAt: new Date(Date.now() - 5 * 86400000).toISOString() },
  { id: "u4", login: "reader2", role: "reader", registeredAt: new Date(Date.now() - 2 * 86400000).toISOString() },
];

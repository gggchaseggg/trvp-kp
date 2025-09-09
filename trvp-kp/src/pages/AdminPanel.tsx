import { observer } from "mobx-react-lite";
import { Navigate } from "react-router";
import { userStore } from "../stores/userStore";
import { Card, Stack, Typography, Table, Select, Option } from "@mui/joy";
import { useMemo, useState } from "react";
import { usersMock, type UserEntity } from "../entities/user";

const roles: Array<UserEntity["role"]> = ["reader", "writer", "admin"];

const AdminPanel = observer(() => {
  const { user } = userStore;
  const isAdmin = !!user && user.role === "admin";

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const [rows, setRows] = useState<UserEntity[]>(() => usersMock);

  const handleChangeRole = (id: string, newRole: UserEntity["role"]) => {
    console.log("[mock] changeUserRole request:", { id, role: newRole });
    setRows((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  const header = useMemo(() => (
    <thead>
      <tr>
        <th style={{ textAlign: "left" }}>Логин</th>
        <th style={{ textAlign: "left" }}>Дата регистрации</th>
        <th style={{ textAlign: "left" }}>Роль</th>
        <th style={{ textAlign: "left" }}>Действия</th>
      </tr>
    </thead>
  ), []);

  return (
    <Stack sx={{ maxWidth: 960, mx: "auto", px: 2 }} spacing={2}>
      <Typography level="h2">Админ панель</Typography>
      <Card>
        <Table borderAxis="xBetween" stickyHeader>
          {header}
          <tbody>
            {rows.map((u) => (
              <tr key={u.id}>
                <td>{u.login}</td>
                <td>{new Date(u.registeredAt).toLocaleDateString()}</td>
                <td>{u.role}</td>
                <td>
                  <Select
                    size="sm"
                    variant="soft"
                    value={u.role}
                    onChange={(_e, value) => value && handleChangeRole(u.id, value as UserEntity["role"]) }
                  >
                    {roles.map((r) => (
                      <Option key={r} value={r}>{r}</Option>
                    ))}
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Stack>
  );
});

export default AdminPanel;

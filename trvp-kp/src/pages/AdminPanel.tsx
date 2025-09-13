import {observer} from "mobx-react-lite";
import {Navigate} from "react-router";
import {userStore} from "../stores/userStore";
import {Card, Option, Select, Stack, Table, Typography} from "@mui/joy";
import {useEffect, useState} from "react";
import {type UserEntity} from "../entities/user";
import axios from "axios";

const roles: Array<UserEntity["role"]> = ["reader", "writer", "admin"];

const AdminPanel = observer(() => {
  const {user} = userStore;
  const isAdmin = !!user && user.role === "admin";

  if (!isAdmin) {
    return <Navigate to="/login" replace/>;
  }

  const [rows, setRows] = useState<UserEntity[]>([]);

  useEffect(() => {
    axios.get<UserEntity[]>('http://localhost:3000/admin/users', {
      headers: {
        'x-user-login': user?.login,
      },
    }).then((value) => setRows(value.data))
  }, []);

  const handleChangeRole = async (id: string, newRole: UserEntity["role"]) => {
    await axios.post<UserEntity>(
      'http://localhost:3000/admin/changeRole',
      {
        id,
        role: newRole,
      },
      {
        headers: {
          'x-user-login': user?.login,
        },
      }
    )

    axios.get<UserEntity[]>('http://localhost:3000/admin/users', {
      headers: {
        'x-user-login': user?.login,
      },
    }).then((value) => setRows(value.data))
  };

  return (
    <Stack sx={{maxWidth: 960, mx: "auto", px: 2}} spacing={2}>
      <Typography level="h2">Админ панель</Typography>
      <Card>
        <Table borderAxis="xBetween" stickyHeader>
          <thead>
          <tr>
            <th style={{textAlign: "left"}}>Логин</th>
            <th style={{textAlign: "left"}}>Дата регистрации</th>
            <th style={{textAlign: "left"}}>Роль</th>
            <th style={{textAlign: "left"}}>Действия</th>
          </tr>
          </thead>
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
                  onChange={(_e, value) => value && handleChangeRole(u.id, value as UserEntity["role"])}
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

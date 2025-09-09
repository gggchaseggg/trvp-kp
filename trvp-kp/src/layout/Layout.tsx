import {Link, Outlet} from "react-router";
import {Typography, Dropdown, Menu, MenuButton, MenuItem, Avatar, Button, Box} from "@mui/joy";
import { observer } from "mobx-react-lite";
import { userStore } from "../stores/userStore";

const Layout = observer(() => {
    const { user, logout } = userStore;
    const isAuth = !!user;
    const login = user?.login;

    return (
        <>
            <header >
                <Box
                  component="nav"
                  sx={{
                    mx: 'auto',
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1.5, sm: 2 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#00BFFF'
                  }}
                >
                  <Typography level="title-lg" >
                    <Link to={'/'} >TRVP Blog</Link>
                  </Typography>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {!isAuth ? (
                      <>
                        <Button component={Link} to={'/login'} size="sm" variant="soft" color="neutral">
                          Войти
                        </Button>
                        <Button component={Link} to={'/register'} size="sm" variant="soft" color="neutral">
                          Зарегистрироваться
                        </Button>
                      </>
                    ) : (
                      <>
                        {user?.role === 'writer' && (
                          <Button component={Link} to={'/create-article'} size="sm" variant="soft" color="neutral">
                            Написать статью
                          </Button>
                        )}
                        <Dropdown>
                          <MenuButton variant="soft" color="neutral">
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                              <Avatar size="sm">{login?.[0]?.toUpperCase()}</Avatar>
                              {login}
                            </span>
                          </MenuButton>
                          <Menu>
                            {user?.role === 'admin' && (
                              <MenuItem component={Link} to={'/admin'}>Админ панель</MenuItem>
                            )}
                            <MenuItem onClick={() => logout()}>Выйти</MenuItem>
                          </Menu>
                        </Dropdown>
                      </>
                    )}
                  </div>
                </Box>
            </header>
            <main style={{width: '100%', marginTop: '20px'}}>
                <Outlet/>
            </main>
        </>
    );
});

export default Layout;

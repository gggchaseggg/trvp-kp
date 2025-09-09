import {Link, Outlet} from "react-router";
import {Typography} from "@mui/joy";

const Layout = () => {
    return (
        <>
            <header
                style={{
                    width: '100%',
                    height: 100,
                    backgroundColor: 'aqua',
                    display: 'flex',
                    justifyContent: 'end',
                    textAlign: 'right',
                    padding: '20px',
                }}>
                <nav>
                    <Typography color={'warning'}><Link to={'/login'}>Войти</Link></Typography>
                    <Typography color={'warning'}><Link to={'/register'}>Зарегистрироваться</Link></Typography>
                </nav>
            </header>
            <main style={{width: '100%', marginTop: '20px'}}>
                <Outlet/>
            </main>
        </>
    );
};


export default Layout;

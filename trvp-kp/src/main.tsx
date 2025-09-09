import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import './global.css'
import Layout from "./layout/Layout.tsx";
import Main from "./pages/Main.tsx";
import Article from "./pages/Article.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<Main/>}/>
                    <Route path={'/article/:id'} element={<Article/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)

import {Button, Card, FormControl, FormLabel, Input, Typography} from "@mui/joy";
import {useState} from "react";
import {userStore} from "../stores/userStore";
import {useNavigate} from "react-router";
import {type UserEntity} from "../entities/user";
import axios from "axios";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {login: loginAction} = userStore;

  const handleClick = async () => {
    if (login && password) {
      const user = await axios.post<UserEntity>("http://localhost:3000/login", {login, password}).then(res => res.data)

      loginAction(user);
      navigate("/");
    } else {
      console.warn("Введите логин и пароль");
    }
  };

  return (
    <Card sx={{width: 400, margin: '0 auto'}}>
      <Typography level={'title-lg'}>Войти в аккаунт</Typography>
      <FormControl>
        <FormLabel>Логин</FormLabel>
        <Input
          color={'neutral'}
          size={'lg'}
          variant={'soft'}
          placeholder={'Ваш логин'}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Пароль</FormLabel>
        <Input
          color={'neutral'}
          size={'lg'}
          variant={'soft'}
          placeholder={'Ваш пароль'}
          type={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleClick} sx={{marginTop: 4}}>Войти</Button>
    </Card>
  );
};

export default Login;
import {Button, Card, FormControl, FormHelperText, FormLabel, Input, Typography} from "@mui/joy";
import {useState} from "react";
import {userStore} from "../stores/userStore";
import {useNavigate} from "react-router";
import type {UserEntity} from "../entities/user";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const {login: loginAction} = userStore;
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!login || !email || !password || !confirmPassword) {
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Пароли не совпадают");
      return;
    }
    setPasswordError(null);

    const newUser = await axios.post<UserEntity>("http://localhost:3000/register", {
      login,
      password
    }).then(res => res.data)

    loginAction(newUser);
    console.log("Register success, user:", newUser);
    navigate("/");
  };

  return (
    <Card sx={{width: 400, margin: "0 auto"}}>
      <Typography level={"title-lg"}>Создать аккаунт</Typography>

      <FormControl sx={{mt: 2}}>
        <FormLabel>Логин</FormLabel>
        <Input
          color={"neutral"}
          size={"lg"}
          variant={"soft"}
          placeholder={"Ваш логин"}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{mt: 2}}>
        <FormLabel>Почта</FormLabel>
        <Input
          color={"neutral"}
          size={"lg"}
          variant={"soft"}
          placeholder={"Ваша почта"}
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{mt: 2}}>
        <FormLabel>Пароль</FormLabel>
        <Input
          color={passwordError ? "danger" : "neutral"}
          size={"lg"}
          variant={"soft"}
          placeholder={"Ваш пароль"}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{mt: 2}}>
        <FormLabel>Подтверждение пароля</FormLabel>
        <Input
          color={passwordError ? "danger" : "neutral"}
          size={"lg"}
          variant={"soft"}
          placeholder={"Повторите пароль"}
          type={"password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordError && (
          <FormHelperText color="danger">{passwordError}</FormHelperText>
        )}
      </FormControl>

      <Button onClick={handleClick} sx={{marginTop: 4}}>Зарегистрироваться</Button>
    </Card>
  );
};

export default Register;
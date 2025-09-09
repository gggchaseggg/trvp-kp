import {Button, Card, FormControl, FormLabel, Input, Typography} from "@mui/joy";

const Login = () => {

    
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
                />
            </FormControl>
            <Button sx={{marginTop: 4}}>Войти</Button>
        </Card>
    );
};

export default Login;
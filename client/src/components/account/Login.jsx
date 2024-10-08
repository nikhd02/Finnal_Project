
import { useState } from 'react';
import React from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { API } from '../../service/api';

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`
const Image = styled('img')({
    width: 200,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 30px;
    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: #1D0FE3FF;
    color: white;
    height: 50px;
    border-radius: 2px;
`
const SignupButton = styled(Button)`
    text-transform: none;
    background: white;
    color: blue;
    height: 50px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
    color: gray;
    font-size: 16px;
`
const signupInValue = {
    name: '',
    username: '',
    password: ''
}

const loginInitialValues = {
    username: '',
    password: ''
}

const Login = () => {

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInValue);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');
    const imageUrl = 'https://th.bing.com/th/id/OIP.wbHi1nzv-pNypLiwryUt7QHaFj?w=240&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7';

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const signupUser = async () => {
        try {
            let response = await API.userSignup(signup);
            console.log('Signup Response:', response); // Check response
            if (response.isSucess) {
                setError('');
                setSignup(signupInValue);
                toggleAccount('login');
                alert('Signup successful!');
                // Optionally reset form or navigate to login
            } else {
                // alert(response.msg || 'Signup failed!');
                setError('Signup failed! Something went wrong! ');
            }
        } catch (error) {
            console.error('Signup Error:', error); // Log error
            alert(error.msg || 'Signup failed!'); // Display a user-friendly message
        }
    }

    const onVolumeChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value})

    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if(response.isSuccess){
            setError('Something is wrong! Please try again later');
        }
    }

    return (
        <div>
            <Component>
                <Box>
                    <Image src={imageUrl} alt="login" />
                    {
                        account === 'login' ?
                            <Wrapper>
                                <label>Login</label>
                                <TextField value={login.username} onChange={(e) => onVolumeChange(e)} name='username' placeholder='Username' variant='standard' />
                                <TextField value={login.password} onChange={(e) => onVolumeChange(e)} name='password' type='password' placeholder='Password' variant='standard' />

                                { error && <Error>{error}</Error>}
                                <LoginButton variant="contained">Login</LoginButton>
                                <Text>OR</Text>
                                <SignupButton onClick={toggleSignup}>Create an account</SignupButton>
                            </Wrapper>
                            :
                            <Wrapper>
                                <label>Signup</label>
                                <TextField name='name' placeholder='Name' onChange={onInputChange} variant='standard' />
                                <TextField name='username' placeholder='Username' onChange={onInputChange} variant='standard' />
                                <TextField name='password' type='password' placeholder='Password' onChange={onInputChange} variant='standard' />

                                { error && <Error>{error}</Error>}
                                <SignupButton onClick={signupUser} variant="contained">Signup</SignupButton>
                                <Text>OR</Text>
                                <LoginButton onClick={toggleSignup}>Already have account</LoginButton>
                            </Wrapper>
                    }
                </Box>
            </Component>
        </div>
    )
}

export default Login;

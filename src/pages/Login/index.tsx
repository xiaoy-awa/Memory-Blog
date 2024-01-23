import './index.sass';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { fetchToken } from '../../store/components/user.tsx';
import { useNavigate } from 'react-router-dom';
import getToken from '../../apis/getToken.tsx';

const Login = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        console.log(token);
        if (token) {
            navigate('/dashboard');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'account') {
            setAccount(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            account,
            password,
        };

        const result = await dispatch(fetchToken(data));
        console.log(result)

        if (result.status === 200) {
            message.success('登录成功');
            navigate('/dashboard');
        }else {
            message.error('登录失败！');
        }
    };
    const handleInvalid = (e: React.FormEvent) => {
        e.preventDefault();
        // 设置自定义错误提示
        message.warning(`请填写${e.target.placeholder}`)
    }
    return (
        <div className='body'>
            <div className="container">
                <div className="back">
                    <div className="BackFilter"></div>
                </div>
                <div className="LoginForm">
                    <div className="LoginContainer">
                        <div className="heading">Sign In</div>
                        <form action="" onSubmit={handleSubmit} className="form">
                            <input required className="input" type="text" name="account" value={account} placeholder="账号" onChange={handleChange} onInvalid={handleInvalid}/>
                            <input required className="input" type="password" name="password" value={password} placeholder="密码" onChange={handleChange} onInvalid={handleInvalid}/>
                            <input className="login-button" type="submit" value="登录" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
import { Button, Form, Input, Typography, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../../../components/sheard/Wrapper";
import { ROUTE_PATHS } from "../../../util/constants/routhes";
import { loginValues } from "../../../typescript/types/loginValues";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { fetchUserProfileInfo, setIsAuth } from "../../../state-management/slices/userProfile";
import { AppDispatch } from "../../../state-management/store";
import { COLORS } from "../../../util/constants/styles";

const { Title } = Typography;

const Login = () => {
    const [ form ] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async ( values: loginValues ) => {
        try{
            const { email, password } = values;
            await signInWithEmailAndPassword(auth, email, password);
            form.resetFields();
            dispatch(setIsAuth(true));
            navigate(ROUTE_PATHS.CABINET);
            await dispatch(fetchUserProfileInfo()); 
        }catch{
            notification.error({
                message:'Invalid Login Credentials', 
            })
        }
    };

    return (
        <Wrapper>
            <div className="formContainer">
            <Title level={3} style={{color: COLORS.blue}}>Sign In</Title>
            <Form form={form} layout="vertical" onFinish={handleLogin}>
                <Form.Item
                label='Email'
                className="formItem"
                name='email'
                rules={[{
                    required: true,
                    message: 'Enter your email!'
                }]}
                >
                    <Input className="Input" placeholder="Enter your email" type="email"/>
                </Form.Item>
                <Form.Item
                label='Password'
                className="formItem"
                name='password'
                rules={[{
                    required: true,
                    message: 'Enter your password!'
                }]}
                >
                    <Input.Password className="Input" placeholder="Enter your password"/>
                </Form.Item>
                <Button type="primary" htmlType="submit">Sign in</Button>
                <Title level={4} style={{color: 'rgba(0, 60, 255, 0.64)'}}>Don't have an account?</Title>
                <Link to={ROUTE_PATHS.REGISTER}>Sign up</Link>
            </Form>
            </div>
        </Wrapper>
    )
}

export default Login;
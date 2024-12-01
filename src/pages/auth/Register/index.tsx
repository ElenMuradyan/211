import { Form, Typography, Input, Button, notification } from "antd"
import { useNavigate, Link } from "react-router-dom";
import Wrapper from "../../../components/sheard/Wrapper";
import { regexpValidation } from "../../../util/constants/passwordValidation";
import { ROUTE_PATHS } from "../../../util/constants/routhes";
import { registerValues } from "../../../typescript/types/registerValues";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../state-management/slices/userProfile";
import { auth, db } from "../../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIRESTORE_PATH_NAMES } from "../../../util/constants/firestorePathNames";
import { doc, setDoc } from "firebase/firestore";

const { Title } = Typography;

const Register = () => {
    const [ form ] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async ( values: registerValues ) => {
        const { firstName, lastName, email, password } = values;

        try{
            dispatch(setLoading(true));
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const { uid } = response.user;
            const createDoc = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
            await setDoc(createDoc, {
                uid, firstName, lastName, email
            })
            form.resetFields();
            navigate(ROUTE_PATHS.LOGIN);
        }catch{
            notification.error({
                message: 'Invalid Register Credentials'
            })
        }finally{
            dispatch(setLoading(false))
        }};

    return(
        <Wrapper>
            <Title>Sign Up</Title>
            <Form form={form} layout="vertical" onFinish={handleRegister}>
            <Form.Item
            className="formItem"
            label='First Name'
            name='firstName'
            rules={[{
                required:true,
                message: 'Enter your first name!'
            }]}
            >
                <Input className="Input" placeholder="First Name" type="text"/>
            </Form.Item>
            <Form.Item
            className="formItem"
            label='Last Name'
            name='lastName'
            rules={[{
                required:true,
                message: 'Enter your last name!'
            }]}
            >
                <Input className="Input" placeholder="Last Name" type="text"/>
            </Form.Item>
            <Form.Item
            className="formItem"
            label='Email'
            name='email'
            rules={[{
                required:true,
                message: 'Enter your email!'
            }]}
            >
                <Input className="Input" placeholder="Email" type="text"/>
            </Form.Item>
            <Form.Item
            className="formItem"
            label='Password'
            name='password'
            tooltip={'The password must contain at least 6 to 16 characters, including at least one digit and one special character (e.g., !, @, #, $, %, ^, &, *).'}
            rules={[{
                required:true,
                message:'Enter the password'
            },
            {
                pattern:regexpValidation,
                message:'Too simple password'
            }
            ]}
            >
                <Input.Password className="Input" placeholder="Password" type="text"/>
            </Form.Item>
            <Button htmlType="submit" type='primary'>Sign up</Button>
            <Title style={{color: 'rgba(0, 60, 255, 0.64)'}} level={4}>Already have an account?</Title>
            <Link to={ROUTE_PATHS.LOGIN}>Sign in</Link>  
            </Form>
        </Wrapper>
    )
}

export default Register;
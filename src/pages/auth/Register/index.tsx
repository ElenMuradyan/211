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
import { AppDispatch } from "../../../state-management/store";
import { COLORS } from "../../../util/constants/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../typescript/interface/rootState";

const { Title } = Typography;

const Register = () => {
    const { userIncome, userExpences } = useSelector((store: RootState) => store.userProfile.userProfileInfo);
    const [ form ] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleRegister = async ( values: registerValues ) => {
        const { firstName, lastName, email, password } = values;

        try{
            dispatch(setLoading(true));
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const { uid } = response.user;
            const createDoc = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
            await setDoc(createDoc, {
                uid, firstName, lastName, email, userExpences, userIncome
            })
            form.resetFields();
            navigate(ROUTE_PATHS.LOGIN);
        }catch{
            notification.error({
                message: 'Invalid Register Credentials'
            })
        }finally{
            dispatch(setLoading(false));
        }};

    return(
        <Wrapper>
            <div className="formContainer">
            <Title level={3} style={{color: COLORS.blue}}>Sign Up</Title>
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
            </div>
        </Wrapper>
    )
}

export default Register;
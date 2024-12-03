import { Dropdown, Avatar, theme, Flex, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../typescript/interface/rootState";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { setIsAuth } from "../../../state-management/slices/userProfile";
import { ROUTE_PATHS } from "../../../util/constants/routhes";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../state-management/store";

const { useToken } = theme; 
const { Text, Title } = Typography;

const DropDown = () => {
    const { firstName, lastName, email, userIncome } = useSelector((store: RootState) => store.userProfile.userProfileInfo.userData);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { token } = useToken();

    const setFullNameLetter = () => {
        if (firstName && lastName){
            return `${firstName[0]} ${lastName[0]}`;
        };
        return '-';
    };

    const handleSignOut = async () => {
        try{
            await signOut(auth);
            dispatch(setIsAuth(false));
        }catch(error){
            console.log(error);
        }
    };

    const items = [
        {
            label: 'Your Changes',
            key:'0',
            onClick:() => navigate(ROUTE_PATHS.ALLEVENTS),
        },
        {
            label: 'Logout',
            key:'logout',
            onClick:handleSignOut,
        },
        {
            label: 'Home',
            key:'1',
            onClick:() => navigate(ROUTE_PATHS.CABINET),
        }
    ];

    return (
        <Dropdown
        menu={{items}}
        trigger={['click']}
        dropdownRender={(menu) => {
            return(
                <div style={{
                    borderRadius: token.borderRadiusLG,
                    backgroundColor: token.colorBgElevated,
                    boxShadow: token.boxShadowSecondary,
                  }}>
                    <Flex vertical align="center" style={{padding:token.sizeMS}} className="profile_dropdown_container">
                    <Title level={5} style={{padding: 0, margin: 0, color: token.blue}}>YOUR BALANCE: {userIncome}$</Title>
                        <Text>{firstName} {lastName}</Text>
                        <Text type="secondary" underline>{email}</Text>
                    </Flex>
                    {menu}
                </div>
            )
        }}
        >
            <Avatar size={"large"} className="user_profile_avatar">
                { setFullNameLetter() }
            </Avatar>
        </Dropdown>
    )
}

export default DropDown;
import { Flex, Typography, theme } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../typescript/interface/rootState";
import './index.css';

const { Title } = Typography;

const Header = () => {
    const { token } = theme.useToken();
    const { userIncome } = useSelector((store: RootState) => store.userProfile.userProfileInfo.userData);

    return(
        <Flex className='header_container' justify='space-between' style={{backgroundColor: token.blue}}>
            <Title level={4} style={{padding: 0, margin: 0, color: 'white'}}>SPENDER</Title>
            <Title level={5} style={{padding: 0, margin: 0, color: 'white'}}>YOUR BALANCE: {userIncome}$</Title>
        </Flex>
    )
};

export default Header;
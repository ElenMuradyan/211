import { Flex, Typography, theme } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "../../../util/constants/routhes";
import DropDown from "../../sheard/DropDown";

import './index.css';

const { Title } = Typography;

const Header = () => {
    const location = useLocation();
    const { token } = theme.useToken();
  
    return(
        <Flex className='header_container' justify='space-between' style={{backgroundColor: token.blue}}>
            <DropDown/>
            {
                !(location.pathname === '/cabinet') ? <Link to={ROUTE_PATHS.HOME}><Title level={4} style={{padding: 0,margin: 0, color: 'white'}}>Home</Title></Link> : 
                <Title level={4} style={{padding: 0, margin: 0, color: 'white'}}>SPENDER</Title>
           }
        </Flex>
    )
};

export default Header;
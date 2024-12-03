import { Flex, Typography, theme } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../typescript/interface/rootState";
import { ROUTE_PATHS } from "../../../util/constants/routhes";
import { useState, useEffect } from "react";
import './index.css';

const { Title } = Typography;

const Header = () => {
    const location = useLocation();
    const { token } = theme.useToken();
    const { userIncome } = useSelector((store: RootState) => store.userProfile.userProfileInfo.userData);
  
    return(
        <Flex className='header_container' justify='space-between' style={{backgroundColor: token.blue}}>
            <Title level={4} style={{padding: 0, margin: 0, color: 'white'}}>SPENDER</Title>
            {
                !(window.location.pathname === '/cabinet') &&  <Link to={ROUTE_PATHS.HOME}><Title level={4} style={{padding: 0,margin: 0, color: 'white'}}>Home</Title></Link>
            }
            <Title level={5} style={{padding: 0, margin: 0, color: 'white'}}>YOUR BALANCE: {userIncome}$</Title>
        </Flex>
    )
};

export default Header;
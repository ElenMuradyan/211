import { Flex, Typography, Button } from "antd";
import MainPageComponents from "../../components/sheard/MainPageCoponents";
import { COLORS } from "../../util/constants/styles";
import { walletEvent } from "../../typescript/types/walletEvent";
import { useEffect, useState } from "react";
import AddWalletEventModal from "../../components/sheard/AddWalletEventModal";
import { useDispatch } from "react-redux";
import { fetchWalletEvents } from "../../state-management/slices/walletEvents";
import { AppDispatch } from "../../state-management/store";
import { useSelector } from "react-redux";
import { RootState } from "../../typescript/interface/rootState";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../util/constants/routhes";

import './index.css';

const { Title } = Typography;

const Mainpage = () => {
    const navigate = useNavigate();
    
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ walletEvent, setWalletEvent ] = useState<walletEvent>('income');
    const { uid } = useSelector((store: RootState) => store.userProfile.userProfileInfo.userData);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchWalletEvents(uid));
    },[dispatch, uid]);

    const handleOpenModal = (title: walletEvent) => {
        setShowModal(true);
        setWalletEvent(title);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return(
        <div className="main_container">
            <Title level={3} style={{color: COLORS.blue}}>Your Expenses</Title>
        <Flex className='mainContainer' justify="space-between" >
            <Link to={`${ROUTE_PATHS.CABINET}/food`}><MainPageComponents title="food"/></Link>
            <Link to={`${ROUTE_PATHS.CABINET}/home`}><MainPageComponents title="home"/></Link>
            <Link to={`${ROUTE_PATHS.CABINET}/car`}><MainPageComponents title="car"/></Link>
            <Link to={`${ROUTE_PATHS.CABINET}/leisure`}><MainPageComponents title="leisure"/></Link>
            <Link to={`${ROUTE_PATHS.CABINET}/shopping`}><MainPageComponents title="shopping"/></Link>
        </Flex>
        <Flex justify="space-between" className="buttons_container">
        <Button type="primary" onClick={() => handleOpenModal('expense')}>Add Expense</Button>
        <Button type="primary" onClick={() => handleOpenModal('income')}>Add Income</Button>
        <Button type="primary" onClick={() => navigate(`${ROUTE_PATHS.CABINET}/allEvents`)}>See All The Changes</Button>
        </Flex>
        <AddWalletEventModal title={walletEvent} isOpen={showModal} onClose={handleCloseModal}/>
        </div>
    )
}

export default Mainpage;
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

import './index.css';

const { Title } = Typography;

const Mainpage = () => {
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ walletEvent, setWalletEvent ] = useState<walletEvent>('income');
    const { uid } = useSelector((store: RootState) => store.userProfile.userProfileInfo.userData);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchWalletEvents(uid));
    },[]);

    const handleOpenModal = (title: walletEvent) => {
        setShowModal(true);
        setWalletEvent(title);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return(
        <div className="main_container">
        <Flex className='mainContainer' justify="space-between" >
            <MainPageComponents title="food"/>
            <MainPageComponents title="home"/>
            <MainPageComponents title="car"/>
            <MainPageComponents title="leisure"/>
            <MainPageComponents title="shopping"/>
        </Flex>
        <Flex justify="space-between" className="buttons_container">
        <Button type="primary" onClick={() => handleOpenModal('expense')}>Add Expense</Button>
        <Button type="primary" onClick={() => handleOpenModal('income')}>Add Income</Button>
        </Flex>
        <AddWalletEventModal title={walletEvent} isOpen={showModal} onClose={handleCloseModal}/>
        </div>
    )
}

export default Mainpage;
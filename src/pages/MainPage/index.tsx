import { Flex, Typography, Button } from "antd";
import MainPageComponents from "../../components/sheard/MainPageCoponents";
import { COLORS } from "../../util/constants/styles";
import { walletEvent } from "../../typescript/types/walletEvent";
import { useState } from "react";
import AddWalletEventModal from "../../components/sheard/AddWalletEventModal";
const { Title } = Typography;

const Mainpage = () => {
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ walletEvent, setWalletEvent ] = useState<walletEvent>('income');

    const handleOpenModal = (title: walletEvent) => {
        setShowModal(true);
        setWalletEvent(title);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return(
        <>
        <Button type="primary" onClick={() => handleOpenModal('expense')}>Add Expense</Button>
        <Button type="primary" onClick={() => handleOpenModal('income')}>Add Income</Button>
        <Flex className='mainContainer' justify="space-between">
            <MainPageComponents title="food"/>
            <MainPageComponents title="home"/>
            <MainPageComponents title="car"/>
            <MainPageComponents title="leisure"/>
            <MainPageComponents title="shopping"/>
        </Flex>
        <AddWalletEventModal title={walletEvent} isOpen={showModal} onClose={handleCloseModal}/>
        </>
    )
}

export default Mainpage;
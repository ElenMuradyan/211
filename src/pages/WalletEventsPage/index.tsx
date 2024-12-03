import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../state-management/store";
import { Typography, Flex } from 'antd';
import { COLORS } from "../../util/constants/styles";
import { useEffect, useState } from "react";
import { createWalletEventProps } from "../../typescript/types/createWalletEventProps";

import './index.css';

const { Title } = Typography;

const WalletEventsPage = () => {
    const { data } = useSelector((store: RootState) => store.walletEvents);
    const [ shownData, setShownData ] = useState<createWalletEventProps[]>([]);

    const { title } = useParams();

    useEffect(() => {
        if(title === 'allEvents'){
            setShownData(data);
        }else{
            setShownData(data.filter(data => data.category === title))
        }
    }, [data, title]);

    if(shownData.length === 0){
        return(
            <Title level={3} style={{color: COLORS.blue}}>It seems like you haven't made any changes in your wallet</Title>
        )
    }

    return(
        <Flex gap={30} vertical style={{padding: 30}}>
           {
            shownData.map(data => {
                return(<Flex justify="space-between" align="flex-end" className="event_container">
                    <div className="information">
                    <Title level={4} style={{padding: 0, margin: 0, color: (data.type === 'expense') ? 'red' : COLORS.blue}}>Event Type: {data.type}</Title>
                    <Title level={4} style={{padding: 0, margin: 0}}>Category: {data.category}</Title>
                    <Title level={5} style={{padding: 0, margin: 0}}>Amount: {data.amount}$</Title>
                    <Title level={5} style={{padding: 0, margin: 0}}>Description: {data.description}</Title>
                    </div>
                    <Title level={5} style={{padding: 0, margin: 0}}>Date: {data.date}</Title>
                </Flex>)
            })
           }
        </Flex>
    )
}

export default WalletEventsPage;
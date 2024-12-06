import { Typography } from "antd"
import { mainComponentProps } from "../../../typescript/interface/mainComponentProps";
import { useSelector } from "react-redux";
import { RootState } from "../../../typescript/interface/rootState";
import { faPizzaSlice, faHome, faCar, faSpa, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import { COLORS } from "../../../util/constants/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './index.css';

const { Title } = Typography;

const MainPageComponents = ({ title }: mainComponentProps) => {
    const { currency } = useSelector((store: RootState) => store.walletEvents);
    const { userExpences } = useSelector((store: RootState) => store.userProfile.userProfileInfo.userData);

    const icons = {
        food: <FontAwesomeIcon icon={faPizzaSlice}/>,
        home:  <FontAwesomeIcon icon={faHome}/>,
        shopping:  <FontAwesomeIcon icon={faShoppingCart}/>,
        car:  <FontAwesomeIcon icon={faCar}/>,
        leisure:  <FontAwesomeIcon icon={faSpa}/>,
    }
    return(
        <div className="wallet_component">
            <Title level={4} style={{color: COLORS.blue, textAlign: 'center'}}>{`${title[0].toUpperCase()}${title.slice(1)}`}  {icons[title]}</Title>
            <Title level={4} style={{color: COLORS.blue, textAlign: 'center'}}>Your Expence: {userExpences[title]} {currency.toUpperCase()}</Title>
        </div>
    )
}

export default MainPageComponents;
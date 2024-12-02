import { Typography } from "antd"
import { mainComponentProps } from "../../../typescript/interface/mainComponentProps";
import { useSelector } from "react-redux";
import { RootState } from "../../../typescript/interface/rootState";

import './index.css';
import { COLORS } from "../../../util/constants/styles";

const { Title } = Typography;

const MainPageComponents = ({ title }: mainComponentProps) => {
    const { userExpences } = useSelector((store: RootState) => store.userProfile.userProfileInfo.userData);

    return(
        <div className="wallet_component">
            <Title level={4} style={{color: COLORS.blue, textAlign: 'center'}}>{`${title[0].toUpperCase()}${title.slice(1)}`}</Title>
            <Title level={4} style={{color: COLORS.blue, textAlign: 'center'}}>Your Expence: {userExpences[title]}$</Title>
        </div>
    )
}

export default MainPageComponents;
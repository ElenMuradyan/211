import { Flex, Select, Typography, theme } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "../../../util/constants/routhes";
import DropDown from "../../sheard/DropDown";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state-management/store";
import { currencySelectOptions } from "../../../util/constants/currencySelectOptions";
import { setCurrency } from "../../../state-management/slices/walletEvents";
import { fetchUserProfileInfo } from "../../../state-management/slices/userProfile";
import { AppDispatch } from "../../../state-management/store";
import { setInfoToFirebase, setWalletEvents } from "../../../util/helpers/setInfoToFirebase";

import './index.css';

const { Title } = Typography;

const Header = () => {
    const { currency } = useSelector((store: RootState) => store.walletEvents);
    const { uid } = useSelector((store: RootState) => store.userProfile.userProfileInfo.userData);

    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { token } = theme.useToken();

    const handleChange = async (value: string) => {
        const fromCurrency = currency;
        dispatch(setCurrency(value));
        const fetchExchangeRate = async (fromCurrency: string, toCurrency: string): Promise<number> => {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const data = await response.json();            
            return data.rates[toCurrency];
        };
        const rate = await fetchExchangeRate(fromCurrency, value.toUpperCase());
        setInfoToFirebase(rate, uid);
        setWalletEvents(rate, uid);
        dispatch(fetchUserProfileInfo());
    }
    
    return(
        <Flex className='header_container' justify='space-between' style={{backgroundColor: token.blue}}>
            <DropDown/>
            {
                !(location.pathname === '/cabinet') ? <Link to={ROUTE_PATHS.HOME}><Title level={4} style={{padding: 0,margin: 0, color: 'white'}}>Home</Title></Link> : 
                <Select
                 options={currencySelectOptions}
                 value={currency}
                 onChange={handleChange}
                 className="select"
                />
           }
        </Flex>
    )
};

export default Header;
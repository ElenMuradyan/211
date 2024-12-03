import { Modal, Form, Input, Select } from "antd"
import { useState } from "react";
import { selectOptions } from "../../../util/constants/selectOptions";
import { createWalletEventProps } from "../../../typescript/types/createWalletEventProps";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../../util/constants/firestorePathNames";
import { db } from "../../../services/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../../typescript/interface/rootState";
import { addEventProps } from "../../../typescript/interface/addEventProps";
import { userExpencesType } from "../../../typescript/types/userProfileInitialState";
import { useDispatch } from "react-redux";
import { fetchUserProfileInfo } from "../../../state-management/slices/userProfile";
import { fetchWalletEvents } from "../../../state-management/slices/walletEvents";
import { AppDispatch } from "../../../state-management/store";

const AddWalletEventModal = ({ title, isOpen, onClose }: addEventProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const uppercasedTitle = `${title[0].toUpperCase()}${title.slice(1)}`;
    const { uid, userExpences, userIncome } = useSelector((store: RootState) => store.userProfile.userProfileInfo.userData);
    const [ buttonLoading, setButtonLoading ] = useState<boolean>(false)
    const [ selectValue, setSelectValue ] = useState<keyof userExpencesType>(selectOptions[0].value as keyof userExpencesType);
    const [ form ] = Form.useForm();

    const handleCreateWalletEvent = async (values: createWalletEventProps) => {
        setButtonLoading(true);
        const eventData = {
            type: title,
            date: new Date().toLocaleString(),
            amount: values.amount,
            description: values.description,
            category: title === 'expense' ? selectValue : '',
        }

        try{
            const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
            const userWalletEventsRef = collection(userRef, FIRESTORE_PATH_NAMES.WALLET_EVENTS);
            const userDoc = await getDoc(userRef);

            await addDoc(userWalletEventsRef, eventData);

            if(title === 'expense' && selectValue){                
                if(userDoc.exists()){
                    await updateDoc(userRef, {
                        userExpences:{
                            ...userExpences,
                            [`${selectValue}`]: Number(userExpences[selectValue]) + Number(values.amount)
                        },
                        userIncome: userIncome - Number(values.amount)
                    })
                }
            }else if(title === 'income'){
                if(userDoc.exists()){
                    await updateDoc(userRef, {
                        userIncome: userIncome + Number(values.amount)
                    })
                }
            }
            dispatch(fetchUserProfileInfo());
            dispatch(fetchWalletEvents(uid));
            form.resetFields();
            setButtonLoading(false);
            onClose();
        }catch{
            setButtonLoading(false);
        }
    }

    const handleClose = () => {
        onClose();
        setSelectValue(selectOptions[0].value as keyof userExpencesType);
        form.resetFields();
    };

    const handleSelectChange = (value: keyof userExpencesType) => {
        setSelectValue(value)
    };

    return(
        <Modal
        title={`Create ${uppercasedTitle}`}
        open={isOpen}
        onCancel={handleClose}
        confirmLoading={buttonLoading}
        onOk={form.submit}
        okText={`Create ${uppercasedTitle}`}
        width={600}
        centered
        >
            <Form form={form} onFinish={handleCreateWalletEvent}>
                <Form.Item
                label='Amount'
                name='amount'
                rules={[{
                    required: true,
                    message: 'Plaese Input The Amount',
                    validator: (_, value) => {
                        if (!value || value <= 0) {
                        return Promise.reject('Amount must be a positive number');
                        }
                        return Promise.resolve();
                    },
                }]}
                >
                    <Input type='number' placeholder='Please Enter The Amount'/>
                </Form.Item>
                <Form.Item
                label='Description'
                name='description'
                rules={[{
                    required: true,
                    message: 'Plaese Input The Description'
                }]}
                >
                    <Input type='text' placeholder='Please Enter The Description'/>
                </Form.Item>
                {
                    title === 'expense' && <Form.Item
                    name='category'
                    label='Choose Field'
                    rules={[{
                        required: true,
                        message: 'Plaese Select The Field'
                    }]}
                    >
                        <Select
                        options={selectOptions}
                        value={selectValue}
                        onChange={handleSelectChange}
                        />
                    </Form.Item>
                }
            </Form>
        </Modal>
    )
}

export default AddWalletEventModal;
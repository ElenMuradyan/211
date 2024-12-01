import { Modal, Form, Input, Select } from "antd"
import { useState } from "react";
import { selectOptions } from "../../../util/constants/selectOptions";
import { createWalletEventProps } from "../../../typescript/types/createWalletEventProps";
import { addDoc, collection, doc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../../util/constants/firestorePathNames";
import { db } from "../../../services/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../../typescript/interface/rootState";
import { addEventProps } from "../../../typescript/interface/addEventProps";

const AddWalletEventModal = ({ title, isOpen, onClose }: addEventProps) => {
    const uppercasedTitle = `${title[0].toUpperCase()}${title.slice(1)}`;
    const { uid } = useSelector((store: RootState) => store.userProfile.userProfileInfo.userData);
    const [ buttonLoading, setButtonLoading ] = useState<boolean>(false)
    const [ selectValue, setSelectValue ] = useState<string>(selectOptions[0].value);
    const [ form ] = Form.useForm();

    const handleCreateWalletEvent = async (values: createWalletEventProps) => {
        setButtonLoading(true);
        const eventData = {
            type: title,
            date: new Date().toLocaleTimeString(),
            amount: values.amount,
            description: values.description,
            category: title === 'expense' ? selectValue : undefined,
        }
        try{
            const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
            const userWalletEventsRef = collection(userRef, FIRESTORE_PATH_NAMES.WALLET_EVENTS);
            await addDoc(userWalletEventsRef, eventData);
            form.resetFields();
            setButtonLoading(false);
            onClose();
        }catch{
            setButtonLoading(false);
        }
    }

    const handleClose = () => {
        onClose();
        setSelectValue(selectOptions[0].value);
        form.resetFields();
    };

    const handleSelectChange = (value: string) => {
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
                    message: 'Plaese Input The Amount'
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
                    <Input type='text' placeholder='Please Enter The Amount'/>
                </Form.Item>
                {
                    title === 'expense' && <Form.Item
                    name='category'
                    label='Choose Field'
                    rules={[{
                        required: true,
                        message: 'Plaese Select Expense Type'
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
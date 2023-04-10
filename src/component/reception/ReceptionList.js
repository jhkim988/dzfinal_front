import React, { useEffect, useState } from 'react';
import axiosClient from './../login/AxiosClient';

const Reception_API_BASE_URL = "/api/reception";

const ReceptionList = () => {
    const [receptionList, setReceptionList] = useState([]);

    useEffect(() => {
        axiosClient.get(Reception_API_BASE_URL + "/list")
            .then((response) => {
                setReceptionList(response.data);
            });
    }, []);

    return (
        <div>
            <div>
                <h2>접수목록</h2>
                {receptionList.map((list) => (
                    <div key={list.id}>
                        <p>{list.reception_id}</p>
                        <p>{list.doctor}</p>
                        <p>{list.treatment_reason}</p>
                        <p>{list.patient_id}</p>
                        <p>{list.patient_name}</p>
                        <p>{list.phone_number1}</p>
                        <p>{list.phone_number2}</p>
                        <p>{list.phone_number3}</p>
                        <p>{list.front_registration_number}</p>
                        <p>{list.back_registration_number}</p>
                        <p>{list.gender}</p>
                        <p>{list.zip_code}</p>
                        <p>{list.address}</p>
                        <p>{list.detail_address}</p>
                        <p>{list.insurance}</p>
                        <p>{list.creator}</p>
                        <p>{list.updator}</p>
                        <p>{list.state}</p>
                        <p>{list.systolic}</p>
                        <p>{list.diastolic}</p>
                        <p>{list.blood_sugar}</p>
                        <p>{list.height}</p>
                        <p>{list.weight}</p>
                        <p>{list.bmi}</p>
                        <p>{list.is_deleted}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReceptionList;
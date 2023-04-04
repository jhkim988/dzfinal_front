import { axiosClient } from './axiosClient';
//spring boot의 url을 정의
const Reception_API_BASE_URL = "http://localhost:8080/api/reception";

class ReceptionService {

    getList() {
        return axiosClient.get(Reception_API_BASE_URL + "/list");
    }
}

export default new ReceptionService();
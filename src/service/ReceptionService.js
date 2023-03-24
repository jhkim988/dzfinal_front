import axios from 'axios';

//spring boot의 url을 정의
const Reception_API_BASE_URL = "http://localhost:8080/api/reception";

class ReceptionService {

    getList() {
        return axios.get(Reception_API_BASE_URL + "/list");
    }
}

export default new ReceptionService();
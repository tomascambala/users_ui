import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8081/user/";

export const login = (email: string, password: string) => {
    return axios.post(API_URL + "login", { email, password }).then((response) => {
        if (response.data.token) {
            localStorage.setItem("data", JSON.stringify(response.data));
        }
        return response.data
    });
};

export const profile = () => {
    return axios.get(API_URL + "profile", { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

export const register = (email: string, password: string, firstName: string, lastName: string, phoneNumber: string, country: string, town: string, postalCode: string, streetName: string, houseNumber: string) => {
    return axios.post(API_URL + "register", { email, password, firstName, lastName, phoneNumber, country, town, postalCode, streetName, houseNumber });
};

export const updateUser = (id: number, firstName: string, lastName: string, phoneNumber: string, country: string, town: string, postalCode: string, streetName: string, houseNumber: string) => {
    return axios.patch(API_URL + id, { firstName, lastName, phoneNumber, country, town, postalCode, streetName, houseNumber });
};

export const deleteUser = (id: number) => {
    return axios.delete(API_URL + id, { headers: authHeader() });
};

export const logout = () => {
    localStorage.removeItem('data');
    window.location.href = '/login';
};


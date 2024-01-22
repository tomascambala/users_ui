import axios from "axios";

const API_URL = "http://localhost:8081/user/";

export const login = (email: string, password: string) => {
    return axios.post(API_URL + "login", { email, password }, { withCredentials: true }).then((response) => {
        return response.data
    });
};

export const profile = () => {
    return axios.get(API_URL + "profile", { withCredentials: true }).then((response) => {
        return response.data;
    });
};

export const register = (email: string, password: string, firstName: string, lastName: string, phoneNumber: string, country: string, town: string, postalCode: string, streetName: string, houseNumber: string) => {
    return axios.post(API_URL + "register", { email, password, firstName, lastName, phoneNumber, country, town, postalCode, streetName, houseNumber });
};

export const updateUser = (id: number, firstName: string, lastName: string, phoneNumber: string, country: string, town: string, postalCode: string, streetName: string, houseNumber: string) => {
    return axios.patch(API_URL + id, { firstName, lastName, phoneNumber, country, town, postalCode, streetName, houseNumber }, { withCredentials: true });
};

export const deleteUser = (id: number) => {
    return axios.delete(API_URL + id, { withCredentials: true });
};

export const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login';
};


import api from "./config"

export const fetchAllBills = () => {
    return api.get('/').then(res => res.data.data);
}
export const fetchBillDetail = (id) => {
    return api.get(`/bill/${id}`).then(res => res.data.data);
}
export const editBillDetail = (id, data) => {
    return api.put(`/${id}/edit`, data).then(res => res.data.data);
}
export const addNewBill = (data) => {
    return api.post(`/`, data).then(res => res.data.data);
}
export const deleteBill = (id) => {
    return api.delete(`/delete/${id}`).then(res => res.data.data);
}
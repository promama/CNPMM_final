import axiosClient from "./axiosClient";

const booksApi = {
    get: (params) => {
        const url = "api/books";
        return axiosClient.get(url, { params });
    },
    getAll:()=>{
        const url="api/books/all";
        return axiosClient.get(url)
    },
    delete:(params)=>{
        const url="api/books/delete";
        return axiosClient.post(url,params)
    },
    update:(params)=>{
        const url="api/books/update";
        return axiosClient.post(url,params)
    },
    getByCondition: (params) => {
        const url = "users/book-list";
        return axiosClient.get(url, { params });
    },
    getDetail: (idBook) => {
        const url = `api/books/${idBook}`;
        return axiosClient.get(url);
    },
    search:(keyword)=>{
        const url="api/books/search"
        return axiosClient.post(url,keyword)
    }
};

export default booksApi;

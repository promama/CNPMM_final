import {
    GET_BOOK,
    GET_BOOKS,
    GET_BOOKS_SELLER,
    GET_BOOKS_STORE,
    GET_CATEGORIES,
} from "../constants/typeRedux";

const initialState = {
    booksShop: {},
    categories: [],
    bookDetail: {},
    booksSeller: {},
    booksStore: {},
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BOOKS:
            return { ...state, booksShop: action.payload };
        case GET_CATEGORIES:
            return { ...state, categories: action.payload };
        case GET_BOOK:
            return { ...state, bookDetail: action.payload };
        case GET_BOOKS_SELLER:
            return { ...state, booksSeller: action.payload };
        case GET_BOOKS_STORE:
            return { ...state, booksStore: action.payload };

        // return {
        //     ...state,
        //     booksSeller: state.booksSeller.push(action.payload),
        // };

        default:
            return state;
    }
}

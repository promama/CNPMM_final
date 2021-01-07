import {
    REGISTER_USER,
    LOGIN_USER,
    UPDATE_USER,
    GET_BOOKS_SELLER,
    UPLOAD_BOOK,
    GET_CART_DETAILS,
    SET_COMMENTS,
    UPDATE_AVATAR,
} from "../constants/typeRedux";

export async function registerUser(userData) {
    return {
        type: REGISTER_USER,
        payload: userData,
    };
}

export async function loginUser(userData) {
    return {
        type: LOGIN_USER,
        payload: userData,
    };
}

export function updateUser(userData) {
    return {
        type: UPDATE_USER,
        payload: userData,
    };
}

export function uploadBook(book) {
    return {
        type: UPLOAD_BOOK,
        payload: book,
    };
}

export function getBooksSeller(books) {
    return {
        type: GET_BOOKS_SELLER,
        payload: books,
    };
}

export function getCartDetails(cart) {
    return {
        type: GET_CART_DETAILS,
        payload: cart,
    };
}

export function setComments(comments) {
    return {
        type: SET_COMMENTS,
        payload: comments,
    };
}

export function updateAvatar(url) {
    return {
        type: UPDATE_AVATAR,
        payload: url,
    };
}

import { get, post, put, del } from './api.js';

const endpoints = {
    catalog: '/data/books?sortBy=_createdOn%20desc',
    byId: '/data/books/',
    create: '/data/books'
};

export async function getAllBooks() {
    return get(endpoints.catalog);
}

export async function getById(id) {
    return get(endpoints.byId + id);
}

export async function createBook(data) {
    return post(endpoints.create, data);
}

export async function updateBook(id, data) {
    return put(endpoints.byId + id, data)
}

export async function deleteBook(id) {
    return del(endpoints.byId + id);
}
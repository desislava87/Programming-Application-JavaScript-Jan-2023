import { get, post, put, del } from './api.js';

const endpoints = {
    catalog: '/data/shoes?sortBy=_createdOn%20desc',
    byId: '/data/shoes/'
};

export async function getAllShoes() {
    return get(endpoints.catalog);
}

export async function getById(id) {
    return get(endpoints.byId + id);
}

export async function createShoes(data) {
    return post(endpoints.catalog, data);
}

export async function updateShoes(id, data) {
    return put(endpoints.byId + id, data)
}

export async function deleteShoes(id) {
    return del(endpoints.byId + id);
}
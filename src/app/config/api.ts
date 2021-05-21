import { environment } from 'src/environments/environment';

export const baseUrl = environment.production ? '/api' : '/api';
export const productUrl = baseUrl + '/product';
export const productSearchUrl = baseUrl + '/product/search';
export const categoryUrl = baseUrl + '/category';
export const loginUrl = baseUrl + '/auth/login';
export const registerUrl = baseUrl + '/auth/signup';
export const logoutUrl = baseUrl + '/auth/logout';
export const commonUrl = baseUrl + '/common';
export const cartUrl = baseUrl + '/basket';
export const orderUrl = baseUrl + '/order';

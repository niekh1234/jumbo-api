const axios = require('axios');
const qs = require('qs');

const BASE_URL = 'https://mobileapi.jumbo.com/v12/';

class JumboApi {
  static getProduct(id) {
    if (typeof id !== 'string')
      throw new TypeError(`Expected id to be a string, got a ${typeof id}. Format: {number}{containerType}, e.g. 12345PAK`);

    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/products/${id}`)
        .then((res) => {
          resolve(res.data.product.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static searchProducts(query, limit, offset) {
    if (typeof query !== 'string')
      throw new TypeError(`Expected query to be a string, got a ${typeof query}`);
    if (typeof limit !== 'number' && typeof limit !== 'string')
      throw new TypeError(`Expected limit to be a number or a string, got a ${typeof limit}`);
    if (typeof offset !== 'number' && typeof offset !== 'string')
      throw new TypeError(`Expected offset to be a number or a string, got a ${typeof offset}`);

    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/search?q=${query}&limit=${limit}&offset=${offset}`)
        .then((res) => {
          resolve(res.data.products.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static searchId(productId) {
    if (typeof productId !== 'string')
      throw new TypeError(`Expected productId to be a string, got a ${typeof productId}`);

    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/search?q=${productId}`)
        .then((res) => {
          resolve(res.data.products.data[0]);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getStores() {
    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/stores`)
        .then((res) => {
          resolve(res.data.stores.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getStore(id) {
    if (typeof id !== 'number' && typeof id !== 'string')
      throw new TypeError(`Expected store id to be a number or a string, got a ${typeof id}`);

    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/stores/${id}`)
        .then((res) => {
          resolve(res.data.store.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getStoreDeliveryTimeSlots(id) {
    if (typeof id !== 'number' && typeof id !== 'string')
      throw new TypeError(`Expected store id to be a number or a string, got a ${typeof id}. For a list of all stores use the getStore() method.`);

    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/stores/slots?storeId=${id}&fulfilment=homeDelivery`)
        .then((res) => {
          resolve(res.data.timeSlots.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getStorePickupTimeSlots(id) {
    if (typeof id !== 'number' && typeof id !== 'string')
      throw new TypeError(`Expected id to be a number or a string, got a ${typeof id}`);

    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/stores/slots?storeId=${id}&fulfilment=collection`)
        .then((res) => {
          resolve(res.data.timeSlots.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getStorePromotions(storeId) {
    if (typeof storeId !== 'number' && typeof storeId !== 'string')
      throw new TypeError(`Expected id to be a number or a string, got a ${typeof id}`);

    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/promotion-overview?store_id=${storeId}`)
        .then((res) => {
          resolve(res.data.tabs);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getToken(username, password) {
    if (typeof username !== 'string')
      throw new TypeError(`Expected username to be a string, got a ${typeof username}`);
    if (typeof password !== 'string')
      throw new TypeError(`Expected password to be a string, got a ${typeof password}`);

    const body = {
      username: username,
      password: password,
    };

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Jumbo/7.5.2 (python-jumbo-api)'
      }
    };

    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/users/login`, qs.stringify(body), config)
        .then((res) => {
          resolve(res.headers['x-jumbo-token']);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getMyOrders(token) {
    if (typeof token !== 'string')
      throw new TypeError(`Expected token to be a string, got a ${typeof token}`);
    if (token === '')
      throw new Error('Please provide a token, received nothing');

    const config = {
      headers: {
        'x-jumbo-token': token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Jumbo/7.5.2 (python-jumbo-api)'
      }
    };

    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/users/me/orders`, config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }  
}

module.exports = JumboApi;

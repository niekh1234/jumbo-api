const axios = require('axios');

const BASE_URL = 'http://mobileapi.jumbo.com/v9/';

class JumboApi {
  static getProduct(id) {
    if (typeof id !== 'string') throw new TypeError('id should be a string, format: {number}{containerType}, e.g. 12345PAK');

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
    if (typeof query !== 'string') throw new TypeError('query should be a string');
    if (typeof limit !== 'number' && typeof limit !== 'string') throw new TypeError('limit should be a number or string');
    if (typeof offset !== 'number' && typeof offset !== 'string') throw new TypeError('offset should be a number or string');

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
    if (typeof productId !== 'string') throw new TypeError('productId should be a string');

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
    if (typeof id !== 'number' && typeof id !== 'string') throw new TypeError('productId should be a number or string');

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
    if (typeof id !== 'number' && typeof id !== 'string') throw new TypeError('id should be a number or string, for a list of stores call the getStore function');

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
    if (typeof id !== 'number' && typeof id !== 'string') throw new TypeError('id should be a number or string, for a list of stores call the getStore function');

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
}

module.exports = JumboApi;

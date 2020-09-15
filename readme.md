
## Welcome to the unofficial jumbo.com api wrapper for NodeJS

### This package is still WIP

## Installation

```npm
npm i jumbo-api
```

```javascript
const JumboApi = require('jumbo-api');
```

## Example Usage

Getting a product:

*Returns a promise.*

```javascript
JumboApi.getProduct('67649PAK') //getting product information for milk
   .then((products) => {
      console.log(products);
   })
   .catch((err) => {
      console.log(err);
   })
```

Example output:

```yaml
{ id: '67649PAK',
  title: 'Jumbo Verse Halfvolle Melk 2L',
  quantityOptions:
   [ { defaultAmount: 1,
       minimumAmount: 1,
       amountStep: 1,
       unit: 'pieces',
       maximumAmount: 99 } ],
  prices:
   { price: { currency: 'EUR', amount: 165 },
     unitPrice: { unit: 'l', price: [Object] } },
  available: true,
  productType: 'Product',
  crossSellSKUList: [],
  quantity: '2000 ml',
  ... etc
 }
```

## The rest

All wrapper functions follow the same format, all return a promise:

```javascript
JumboApi.method('')
   .then((res) => {})
   .catch((err) => {});
```

**For an easy read, I will just provide all possible methods and not write the format above.**

### Search products

```javascript
JumboApi.searchProducts(query, limit, offset)
```

### Search by product id

```javascript
JumboApi.searchId(productId)
```

### Get all stores

```javascript
JumboApi.getStores()
```

### Get individual store

```javascript
JumboApi.getStore(storeId)
```

### Get unoccupied delivery timeslots for store

```javascript
JumboApi.getStoreDeliveryTimeSlots(storeId)
```

### Get unoccupied pickup timeslots for store

```javascript
JumboApi.getStorePickupTimeSlots(storeId)
```

### Get current promotions for shop

```javascript
JumboApi.getStorePromotions(storeId)
```

## Auth

### Login and get a token for protected api calls

```javascript
JumboApi.getToken(username, password)
   .then((token) => {
      // save token for later. Or do something cool.
      // keep in mind that due to everything being async, having another function using the token *below* this function will not work
   })
   .catch((err) => {
      console.log(err)
   })
```

### Get your orders:

```javascript
JumboApi.getMyOrders(token)
   .then((orders) => {})
   .catch((err) => {})
```


This package is still a work in progress, if you would like to help you are free to submit a pr!
Check it out on [Github](https://github.com/niekh1234/jumbo-api)

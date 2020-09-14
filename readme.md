
## Welcome to the unofficial jumbo.com api wrapper for NodeJS

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
   .then((res) => {
      console.log(res);
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

```Javascript
JumboApi.searchProducts(query, limit, offset)
```

### Search by product id

```Javascript
JumboApi.searchId(productId)
```

### Get all stores

```Javascript
JumboApi.getStores()
```

### Get individual store

```Javascript
JumboApi.getStore(storeId)
```

### Get unoccupied delivery timeslots for store

```Javascript
JumboApi.getStoreDeliveryTimeSlots(storeId)
```

### Get unoccupied pickup timeslots for store

```Javascript
JumboApi.getStorePickupTimeSlots(storeId)
```

Check it out and fork it on [Github](https://github.com/niekh1234/jumbo-api)

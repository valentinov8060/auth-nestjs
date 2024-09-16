# Wallet Management API Spec

## 1. Create Wallet API

Endpoint : POST /wallet/create

Headers :
- Authorization : token 

Request Body :
```json
{
  "name": "My Bitcoin Wallet"
}
```

Response Body Success (201 Created) : 
```json
{
  "data" : {
    "walletId": "abcd1234",
    "address": "1BitcoinAddress",
    "balance": 0
  }
}
```

Response Body Error (400 Bad Request) :
```json
{
  "error": "Wallet with the same name already exists"
}
```

## 2. Get Wallet Balance API

Endpoint : GET /wallet/balance/:walletId

Headers :
- Authorization : token 

Response Body Success (200 OK) : 
```json
{
  "data" : {
    "walletId": "abcd1234",
    "address": "1BitcoinAddress",
    "balance": 0.5 // dalam Bitcoin
  }
}
```

Response Body Error (404 Not Found) :
```json
{
  "error" : "Wallet not found"
}
```

## 3. List Wallets API

Endpoint : GET /wallet/list

Headers :
- Authorization : token 

Response Body Success (200 OK) : 
```json
{
  "data": [
    {
      "walletId": "abcd1234",
      "name": "My Bitcoin Wallet",
      "balance": 0.5,
      "address": "1BitcoinAddress"
    },
    {
      "walletId": "efgh5678",
      "name": "Second Bitcoin Wallet",
      "balance": 0.1,
      "address": "1SecondBitcoinAddress"
    }
  ]
}
```

Response Body Error (401 Unauthorized) :
```json
{
  "error" : "Unauthorized"
}
```

## 4. Delete Wallet API

Endpoint : DELETE /wallet/:walletId

Headers :
- Authorization : token 

Response Body Success (200 OK) : 
```json
{
  "data" : "Wallet deleted successfully"
}
```

Response Body Error (400 Bad Request) :
```json
{
  "error": "Please withdraw or transfer the remaining balance before deleting the wallet."
}
```
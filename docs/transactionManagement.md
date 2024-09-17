# Transaction Management API Spec

## 1. Get Transaction History API

Endpoint : GET /transaction/history/:walletId

Headers :
- Authorization : Bearer token 

Response Body Success (200 OK) : 
```json
{
  "data" : {
    "transactions": [
      {
        "transactionId": "tx1234",
        "amount": 0.001,
        "type": "credit", // atau "debit"
        "timestamp": "2024-09-08T12:34:56Z",
        "status": "confirmed"
      },
      {
        "transactionId": "tx5678",
        "amount": 0.002,
        "type": "debit",
        "timestamp": "2024-09-07T08:21:34Z",
        "status": "pending"
      }
    ]
  }
}
```

Response Body Error (404 Not Found) :
```json
{
  "error" : "Wallet not found"
}
```

## 2. Send Bitcoin API

Endpoint : POST /transaction/send

Headers :
- Authorization : Bearer token 

Request Body :
```json
{
  "walletId": "abcd1234",
  "toAddress": "1DestinationBitcoinAddress",
  "amount": 0.01
}
```

Response Body Success (200 OK) : 
```json
{
  "data" : {
    "transactionId": "tx9876",
    "fromWalletId": "abcd1234",
    "toAddress": "1DestinationBitcoinAddress",
    "amount": 0.01,
    "status": "pending"
  }
}
```

Response Body Error (400 Bad Request) :
```json
{
  "error": "Insufficient balance"
}
```

## 3. Receive Bitcoin API

Endpoint : POST /transaction/receive

Headers :
- Authorization : Bearer token 

Request Body :
```json
{
  "walletId": "abcd1234",
  "amount": 0.02,
  "fromAddress": "1SourceBitcoinAddress"
}
```

Response Body Success (200 OK) : 
```json
{
  "data" : {
    "transactionId": "tx6543",
    "toWalletId": "abcd1234",
    "fromAddress": "1SourceBitcoinAddress",
    "amount": 0.02,
    "status": "confirmed"
  }
}
```

Response Body Error (404 Not Found) :
```json
{
  "error": "Wallet not found"
}
```

## 4. Cancel Pending Transaction API

Endpoint : DELETE /transaction/cancel/:transactionId

Headers :
- Authorization : Bearer token 

Response Body Success (200 OK) : 
```json
{
  "data" : "Transaction canceled successfully"
}
```

Response Body Error (400 Bad Request) :
```json
{
  "error": "Transaction cannot be canceled"
}
```
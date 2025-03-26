# Omno API Integration

This is a Fastify-based API integration for handling transactions and webhooks. The API includes endpoints to create transactions and handle webhook events like 3D Secure redirects.

## Table of Contents

- [Project Setup](#project-setup)
- [API Endpoints](#api-endpoints)
  - [Create Transaction](#create-transaction)
  - [Webhook](#webhook)
- [Running the Project](#running-the-project)
- [Setting up the Tunnel](#setting-up-the-tunnel)
- [Testing](#testing)
- [License](#license)

## Project Setup

### Prerequisites

Ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (>= 14.x)
- [npm](https://npmjs.com) (Node package manager)
- [LocalTunnel](https://localtunnel.github.io/www/) to expose your local server to the internet.

### Install Dependencies

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/omno-api.git
    ```

2. Navigate into the project folder:
    ```bash
    cd omno-api
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Install LocalTunnel or Alternative
   ```bash
    npm install -g localtunnel
   ```
5. Start the application
   ```bash
   npm start
   ```


6.
 ```bash
lt --port 3000
 ```

7. Click on the link provided by the localtunel and make sure to  follow the neccessary instructions provided in the LocalTunnel website to set up the tunel

8. Please note that when you start the localtunel change urls acorrdingly example ``` localhost:3000/documents ------> localtunnelurl/documents ```

9. For better testing experience import the postman collection and swap the {{URL}} with localtunel url

##Docker Setup

1.Build the docker container 
```bash
docker build -t omno-api .
```

2. Run the application
```bash
docker run -p 3000:3000 omno-api
```

3. Follow the instruction above, After running the docker file u will be provided with localtunnel website and follow the steps


## Swagger Documentation

```
localhost:3000/documents 
```
or

```
yourlocaltunelurl/documents
```

## Postman Collection

https://api.postman.com/collections/21919756-57bb3ade-5618-414f-9d96-912ff423f4a9?access_key=PMAT-01JQ9VZ4YV6HG9HE50V6YMVQGR

## Api Endpoints

### Create Transaction

#### `POST /create-transaction`
This endpoint is used to initiate a transaction.

- **Body Parameters**:
  - `amount`: Transaction amount
  - `currency`: Currency code (e.g., USD, EUR)
  - `lang`: Language code (e.g., en, de)
  - `hookUrl`: URL to handle the webhook response
  - `callback`: Callback URL for success
  - `callbackFail`: Callback URL for failure
  - `billing`: Billing information
  - `orderId`: Unique order ID for the transaction
  - `cardToken`: Card token for payment
  - `payment3dsType`: Type of 3D Secure (e.g., "Redirection")
  - `kycVerified`: Whether KYC is verified (true/false)
  - `previousPaymentCount`: Number of previous payments
  - `cardData`: Card details
  - `saveCard`: Whether to save the card for future transactions

#### Example Request:
{{URL}} should be tunel url provided by the package
```json
{
  "amount": 1000,
  "currency": "USD",
  "lang": "en",
  "hookUrl": "{{URL}}/webhook",
  "callback": "{{URL}}/callback",
  "callbackFail": "{{URL}}/callbackFail",
  "billing": {
    "firstName": "John",
    "lastName": "Doe",
    "address1": "123 Street",
    "city": "Cityville",
    "state": "State",
    "country": "US",
    "postalCode": "12345",
    "phone": "1234567890",
    "email": "john.doe@example.com",
    "externalUserId": "user123",
    "dateOfBirth": "1980-01-01"
  },
  "orderId": "order123",
  "cardToken": "token123",
  "payment3dsType": "Redirection",
  "kycVerified": true,
  "previousPaymentCount": 5,
  "cardData": {
    "cardNumber": "4111111111111111",
    "cardHolderName": "John Doe",
    "cardExpiryDate": "12",
    "cardExpiryDate2": "2024",
    "cardCvv": "123",
    "browser": {
      "colorDepth": 24,
      "userAgent": "Mozilla/5.0",
      "language": "en-US",
      "timeZone": "-300",
      "screenWidth": 1920,
      "javaEnabled": true,
      "customerIp": "192.168.1.1",
      "screenHeight": 1080,
      "windowHeight": 800,
      "timeZoneOffset": -300,
      "windowWidth": 1200
    }
  },
  "saveCard": true,
  "merchantInformation": {
    "name": "Merchant Name",
    "merchantName": "Merchant Corp",
    "country": "US",
    "address1": "456 Commerce St",
    "administrativeArea": "Region",
    "locality": "Town",
    "postalCode": "67890",
    "url": "http://merchantwebsite.com",
    "customerServicePhoneNumber": "0987654321",
    "categoryCode": "1234",
    "noteToBuyer": "Thank you for your purchase!"
  }
}

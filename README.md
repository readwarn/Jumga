# jumga
Jumga is marketplace created for buyer and sellers of product. A seller uses the platform to advertise and sell his/her products. The buyer browse through the marketplace to buy products. The payment system for the marketplace is facilatated with the flutterwave v3 api.

## Features
* Seller sign up with account detail
* Account detail is verified with the flutter api
* Seller cant upload product to marketplace until the store is approved by paying $20
* Seller can edit the quantity (amount they have in stock) of previusly uploaded product by clicking on the product card

## Project setup
To run the app locally on your computer you will need to create a mongodb connection url and also a flutterwave account. After signing up with flutterwave, navigate to your dashboard, toggle to test-mode, then click on settings then API, here you can see your account API keys, copy the secret key as shown below.
### Flutterwave secret keys
![Dashboard](https://github.com/readwarn/Jumga/blob/master/assets/flutterAPI.jpg)

### Mongobd connection url
![MongoDB connection](https://github.com/readwarn/Jumga/blob/master/assets/mongo-connection.png)




With the mongodb connection url and the flutterwave secret-keys ready, you can now clone this repo on your computer then take the following steps.

* cd into Jumga folder i.e type in 'cd jumga' in the command terminal
* cd into the server folder
* create a .env file. You can use this command [touch .env]
* Copy and paste your mongodb connection url and your flutterwave secret api keys.
* Your .env file should look like this.
![Secret keys](https://github.com/readwarn/Jumga/blob/master/assets/keys.png)
* run 'npm install' 
* run 'npm start'
* cd into the client directory and run 'npm install' then run 'npm run serve'
* goto [http://localhost:8080/](http://localhost:8080/).



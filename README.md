# jumga
Jumga is marketplace created for buyer and sellers of product. A seller uses the platform to advertise and sell his/her products. The buyer browse through the marketplace to buy products. The payment system for the marketplace is facilatated with the flutterwave v3 api.

## Preview
[Jumga live link](https://shielded-castle-16981.herokuapp.com/)

![Preview](https://github.com/readwarn/Jumga/blob/master/assets/preview.gif)

## Features
* Seller sign up with account detail
* Account detail is verified with the flutter api
* Seller cant upload product to marketplace until the store is approved by paying $20
* Seller can edit the quantity (amount they have in stock) of previusly uploaded product by clicking on the product card
* Payments are accepted through [flutterwave standard v3 api ](https://developer.flutterwave.com/docs/flutterwave-standard)
* To share payments accordingly between Jumga owners, seller and disapatch riders, [subaccount](https://developer.flutterwave.com/docs/split-payment) was created for each.
* The app is in test-mode i.e you can only regsiter with test account and can only pay with test card

#### Test accounts
Use these [test accounts](https://developer.flutterwave.com/docs/test-bank-accounts)

* Access Bank
    Account number: 0690000031 
    OTP: 12345
* Access Bank 2
    Account number: 0690000032
    OTP: 12345
* Access Bank 3
    Account number: 0690000033
    OTP: 12345
* Access Bank 4
    Account number: 0690000034
    OTP: 12345

#### Test cards
Use these [test cards](https://developer.flutterwave.com/docs/test-cards)
##### Test MasterCard PIN authentication
* Card number: 5531 8866 5214 2950
    cvv: 564
    Expiry: 09/32
    Pin: 3310
    OTP: 12345

##### Test Visa Card 3D-Secure authentication (VBVSECURECODE)
* Card number: 4187 4274 1556 4246
    cvv: 828
    Expiry: 09/32
    Pin: 3310
    OTP: 12345

##### Test Card Insufficient Funds
* Card number: 5258 5859 2266 6506
    cvv: 883
    Expiry: 09/31
    Pin: 3310
    OTP: 12345

## Project setup
To run the app locally on your computer you will need to create a mongodb connection url and also a flutterwave account. After signing up with flutterwave, navigate to your dashboard, toggle to test-mode, then click on settings then API, here you can see your account API keys, copy the secret key as shown below.
### Flutterwave secret keys
![Dashboard](https://github.com/readwarn/Jumga/blob/master/assets/flutterAPI.jpg)

### Mongobd connection url
![MongoDB connection](https://github.com/readwarn/Jumga/blob/master/assets/mongo-connection.png)




With the mongodb connection url and the flutterwave secret-keys ready, you can now clone this repo on your computer then take the following steps.

* cd into Jumga directory/folder i.e type in 'cd jumga' in the command terminal
* cd into the server directory
* create a .env file. You can use this command [touch .env]
* copy and paste your mongodb connection url and your flutterwave secret api keys
* Your .env in the server directory file should look like this.
![Secret keys](https://github.com/readwarn/Jumga/blob/master/assets/keys.png)
* run 'npm install' 
* run 'npm start'
* cd into the client directory and run 'npm install' then run 'npm run serve'
* goto [http://localhost:8080/](http://localhost:8080/).



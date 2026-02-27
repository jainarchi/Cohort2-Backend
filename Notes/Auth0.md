1️⃣ jsonwebtoken
- Ye library token create aur verify karne ke liye use hoti hai.
- Manual JWT sign/verify karte ho.


2️⃣ express-jwt

Ye middleware ke liye banayi gayi hai jo automatically JWT verify kare aur request me attach kare (req.user).

- Mostly Auth0 / external JWT providers ke saath use hoti hai.

- Internal secret ya RS256 keys (JWKS) ke saath token validate karta hai.




### RSA (RS256) – Public/Private Key Pair

Agar JWT RS256 se bana hai (Auth0 default):

Token private key se sign hota hai (Auth0 ke paas).

Token public key se verify hota hai (backend pe).

Backend ko sirf public key chahiye verify karne ke liye, private key backend me nahi aati.

Ye secure hai kyunki token verify kar sakte ho bina private key ke.
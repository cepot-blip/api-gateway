# API GATEWAY MENGGUNAKAN JAVASCRIPT

# Persyaratan

- Nodejs v21+

# Teknologi yang di pakai

- Javascript
- ORM Prisma
- ExpressJs

# Instalasi Paket

1. clone repository

```javascript
https://github.com/cepot-blip/api-gateway.git
```

1. Install package

```javascript
npm install
```

1. buat database di mysql sesuikan dengan db yang dibuat di env

```javascript
DB_NAME = api - gateway;
```

1. migrate database prisma dengan menggunakan perintah berikut

```javascript
npx prisma db push
```

1. Running server

```javascript
npm run dev (untuk development)
npm run start (untuk production)
```

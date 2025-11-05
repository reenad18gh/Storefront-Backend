# Storefront Requirements

## REST Routes

### Users
- POST /users         → create (public) returns JWT
- POST /users/auth    → authenticate (public) returns JWT
- GET  /users         → index (protected)
- GET  /users/:id     → show (protected)

### Products
- POST /products      → create (protected)
- GET  /products      → index
- GET  /products/:id  → show
- GET  /products/category/:name → by category

### Orders
- POST /orders        → create order (protected)
- GET  /orders/:id    → show order (protected)
- POST /orders/:id/products → add product to order (protected)

## DB Schema

**users**
- id SERIAL PK
- firstname VARCHAR
- lastname VARCHAR
- password_digest VARCHAR

**products**
- id SERIAL PK
- name VARCHAR
- price INTEGER
- category VARCHAR

**orders**
- id SERIAL PK
- user_id INTEGER FK → users(id)
- status VARCHAR CHECK ('active','complete')

**order_products**
- id SERIAL PK
- order_id INTEGER FK → orders(id)
- product_id INTEGER FK → products(id)
- quantity INTEGER


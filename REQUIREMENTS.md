| Method | Endpoint                 | Description                  |
| ------ | ------------------------ | ---------------------------- |
| POST   | /users                   | إنشاء مستخدم                 |
| GET    | /users                   | عرض كل المستخدمين (محمي JWT) |
| GET    | /users/:id               | عرض مستخدم واحد              |
| POST   | /users/authenticate      | تسجيل الدخول                 |
| POST   | /products                | إضافة منتج                   |
| GET    | /products                | عرض المنتجات                 |
| GET    | /products/:id            | عرض منتج محدد                |
| GET    | /products/category/:name | فلترة حسب الفئة              |
| POST   | /orders                  | إنشاء طلب                    |
| GET    | /orders/:id              | عرض الطلب مع المنتجات        |

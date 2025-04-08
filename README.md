# 💰 API Seguimiento de Gastos

Una API RESTful construida con Node.js, Express y MongoDB para gestionar tus gastos personales. Permite registrar usuarios, iniciar sesión y realizar operaciones CRUD sobre los gastos. La autenticación se maneja con JWT.

---

## Link del Proyecto

https://roadmap.sh/projects/expense-tracker-api

## Tecnologías

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- ES Modules (`import/export`)

---

## 📦 Instalación

```bash
git clone https://github.com/Grxson/api-de-seguimiento-de-gastos.git
cd api-de-seguimiento-de-gastos
npm install
npm run server
```

## 📚 Rutas de la API

### 🔐 Autenticación

| Método | Ruta                 | Descripción            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Registro de usuario    |
| POST   | `/api/auth/login`    | Inicio de sesión (JWT) |

### 💸 Gastos (protegidos con JWT)

| Método | Ruta                | Descripción                   |
| ------ | ------------------- | ----------------------------- |
| GET    | `/api/expenses`     | Obtener gastos (con filtros)  |
| POST   | `/api/expenses`     | Añadir un nuevo gasto         |
| PUT    | `/api/expenses/:id` | Actualizar un gasto existente |
| DELETE | `/api/expenses/:id` | Eliminar un gasto             |

### 🔎 Filtros de gastos (query params)

- `filter=week` → últimos 7 días
- `filter=month` → último mes
- `filter=3months` → últimos 3 meses
- `startDate` y `endDate` → rango personalizado

**Ejemplo:**

```http
GET /api/expenses?filter=month
GET /api/expenses?startDate=2024-01-01&endDate=2024-01-31
```

## 🔐 Autenticación JWT

```bash
Authorization: Bearer <tu_token>
```

## 📁 Categorías de gastos

- Comestibles
- Ocio
- Electrónica
- Servicios públicos
- Ropa
- Salud
- Otros

### ✅ Ejemplo de objeto de gasto

```json
{
  "title": "Mensualidad Gimnasio",
  "amount": 400.0,
  "category": "Salud",
  "date": "2025-04-07T23:48:15.961Z"
}
```

## Documentación de los Endpoint de la API

https://documenter.getpostman.com/view/32483566/2sB2cVf2Kk

# 🍕 Pizzería Mamma Mia — Hito 7 (React Router II)

<img width="912" height="582" alt="image" src="https://github.com/user-attachments/assets/ab28a661-0255-4b64-a67d-5d64c755f45d" />

## 🔖 Descripción General

En este hito se integró la **navegación avanzada con React Router II**, incorporando **rutas protegidas**, **bloqueo de acceso según autenticación** y un flujo de sesión más realista utilizando el contexto global `AuthContext`. Además, se validó el acceso a ciertas vistas y se refinó la lógica del carrito y la autenticación persistente.

---

## 🚀 Tecnologías utilizadas

* **Vite + React 18**
* **React Context API** (Auth, Cart, Pizza)
* **React Router v6** (rutas protegidas y dinámicas)
* **React-Bootstrap + Bootstrap 5**
* **LocalStorage** para persistencia global

---

## 🔍 Estructura del proyecto

```
src/
├── components/        # Componentes visuales (Navbar, Footer, CardPizza, etc.)
├── context/           # Contextos globales: AuthContext, CartContext, PizzaContext
├── data/              # Datos base (pizzas.js)
├── pages/             # Páginas principales: Home, Cart, Pizza, Login, Register, Profile, NotFound
├── routes/            # Componente ProtectedRoute
├── App.jsx            # Definición de rutas y estructura principal
└── main.jsx           # Punto de entrada con Providers y Router
```

---

## 🔹 Requerimientos del hito

### 1. **useParams y consumo de API REST** ✅

* `Pizza.jsx` obtiene el `id` desde la URL mediante `useParams()`.
* Realiza `fetch()` a `http://localhost:5000/api/pizzas/:id`.
* Muestra nombre, precio, ingredientes y descripción.
* Incluye botón **“Volver”** con `useNavigate(-1)`.

---

### 2. **UserContext con token (AuthContext)** ✅

* `AuthContext` actúa como manejador global de sesión.
* Simula autenticación mediante un estado `isAuth` y un objeto `user`.
* Persiste el estado en `localStorage`.
* Define funciones `login(email)` y `logout()`.

---

### 3. **Navbar con lógica condicional de sesión** ✅

* Muestra botones según autenticación:

  * **Autenticado:** `Profile` y `Logout`
  * **No autenticado:** `Login` y `Register`
* `Logout` borra la sesión y redirige automáticamente a `/login`.

---

### 4. **Botón Pagar condicionado al token** ✅

* En `Cart.jsx`, el botón **Pagar** se desactiva si el usuario no está logeado (`disabled={!isAuth}`).
* Garantiza consistencia entre interfaz y autenticación.

---

### 5. **Rutas protegidas (ProtectedRoute)** ✅

* Componente `ProtectedRoute` valida `isAuth` y redirige a `/login` si no hay sesión.
* En `App.jsx`:

  * `/profile` está protegida.
  * `/login` y `/register` bloqueadas si ya hay sesión activa.
  * `*` captura rutas no definidas (`NotFound`).

---

## 🔑 Contextos Implementados

| Contexto         | Estado principal             | Persistencia | Acciones principales          |
| ---------------- | ---------------------------- | ------------ | ----------------------------- |
| **AuthContext**  | isAuth, user.email           | localStorage | `login`, `logout`             |
| **CartContext**  | Array de pizzas con cantidad | localStorage | `add`, `inc`, `dec`, `remove` |
| **PizzaContext** | Listado de pizzas desde API  | No aplica    | `fetch` inicial               |

---

## 💼 Flujo de Navegación

| Ruta         | Descripción                | Protección                   |
| ------------ | -------------------------- | ---------------------------- |
| `/`          | Home con listado de pizzas | Pública                      |
| `/pizza/:id` | Detalle dinámico de pizza  | Pública                      |
| `/cart`      | Carrito de compras         | Pública                      |
| `/login`     | Inicio de sesión           | Pública (bloqueo si logeado) |
| `/register`  | Registro de nuevo usuario  | Pública (bloqueo si logeado) |
| `/profile`   | Perfil del usuario logeado | Protegida                    |
| `*`          | Página 404 personalizada   | Pública                      |

---

## 📈 Despliegue continuo (CI/CD)

* Automatizado mediante **GitHub Actions**.
* Despliegue en **GitHub Pages** usando `vite.config.js` con base configurada.
* Rutas internas manejadas correctamente con fallback `404.html`.

---

## 📱 Live Preview


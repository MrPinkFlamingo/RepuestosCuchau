# 🚗 Repuestos Cuchau — E-Commerce Automotriz

> **Evaluación 2 (30%)** — Desarrollo de Aplicaciones Web Frontend  
> **Institución:** Duoc UC  
> **Tecnologías:** React 19 + TypeScript + Vite + Bootstrap 5 + React Router DOM

---

## 📌 Descripción del Proyecto

**Repuestos Cuchau** es una aplicación web interactiva desarrollada para la venta de repuestos y accesorios automotrices. La solución ha sido completamente migrada y desarrollada bajo el ecosistema de **React** con **TypeScript**, implementando una arquitectura de componentes modulares, estado reactivo en tiempo real y persistencia mediante almacenamiento local (`localStorage`).

---

## ✨ Características Principales

### 🛒 Tienda Pública y Catálogo
- **Barra de Navegación Única y Adaptativa (`Navbar`):** Se adapta dinámicamente según el rol de la sesión iniciada (Invitado, Cliente, Administrador o Vendedor) y muestra el contador de productos del carrito en tiempo real.
- **Catálogo Dinámico (`Productos`):** Buscador reactivo en tiempo real por nombre/descripción y filtros por categorías automotrices (Filtros, Frenos, Baterías, Lubricantes, Motor, Suspensión).
- **Detalle de Producto (`DetalleProducto`):** Ruta dinámica `/producto/:id` con ficha técnica detallada (marca, especificaciones, compatibilidad), selector de cantidad y botón de adición reactiva al carrito.
- **Páginas Informativas:** Inicio con banners destacados, Categorías, Ofertas exclusivas, Quiénes Somos, Blog con tips mecánicos y Formulario de Contacto.

### 💳 Flujo de Compra y Carrito
- **Carrito de Compras (`Carrito`):** Vista en dos columnas con desglose por ítem, modificación de cantidades, cálculo automático de subtotales y opción de vaciado con confirmación.
- **Checkout / Pago (`Pago`):** Autocompletado automático de datos del comprador si existe una sesión activa, selector de métodos de pago (Webpay / Tarjetas, Transferencia Bancaria) y switch para simular pagos fallidos o exitosos.
- **Confirmación (`CompraExitosa`):** Generación de boleta digital con número de orden único (`#ORD-...`), fecha, desglose de ítems y dirección de entrega.
- **Manejo de Errores (`CompraError`):** Pantalla informativa de rechazo de pago con botón de reintento.

### 🛡️ Paneles de Gestión con Control de Roles (RBAC)
- **Panel de Administración (`PanelAdmin`):** Dashboard centralizado con tarjetas métricas de total de ventas, órdenes emitidas, usuarios registrados y stock crítico.
- **Gestión de Inventario (`GestionProductos`):** CRUD completo para añadir nuevos repuestos con stock, precio y categoría, además de alertas visuales automáticas para productos con stock crítico ($\le 5$ unidades).
- **Gestión de Usuarios (`GestionUsuarios`):** Listado y registro de usuarios con asignación de roles (`admin`, `vendedor`, `cliente`).
- **Gestión de Órdenes (`GestionOrdenes`):** Historial de compras con visualizador interactivo de facturas/boletas.
- **Panel del Vendedor (`Vendedor`):** Vista especializada para seguimiento de inventario y pedidos recientes.

### 🇨🇱 Validaciones Chilenas
- Módulo de validaciones [`src/utilidades/validaciones.ts`](./src/utilidades/validaciones.ts) que incluye:
  - Algoritmo de verificación de **RUT chileno** (Módulo 11 con dígito verificador).
  - Validación de dominios de correo permitidos (`@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`).
  - Formato estricto de fecha de nacimiento (`DD-MM-AAAA`).

---

## 👥 Credenciales de Prueba (Simulación de Base de Datos)

El sistema incluye usuarios predefinidos en [`src/datos/db.ts`](./src/datos/db.ts) para probar cada uno de los roles:

| Rol | Correo Electrónico | Contraseña | Acceso / Capacidades |
| :--- | :--- | :--- | :--- |
| **Administrador** | `carlos@profesor.duoc.cl` | `123456` | Acceso completo: Dashboard, CRUD Inventario, Usuarios y Órdenes |
| **Vendedor** | `juan.perez@duoc.cl` | `123456` | Acceso a panel de ventas, inventario y despacho |
| **Cliente** | `maria.lopez@gmail.com` | `123456` | Compra en tienda, autocompletado en checkout y boletas |

---

## 📁 Estructura del Proyecto

El código fuente respeta la convención de nomenclatura 100% en español:

```text
RepuestosCuchau/
├── public/
│   └── img/                  # Imágenes oficiales del catálogo automotriz
├── src/
│   ├── componentes/          # Componentes reutilizables
│   │   ├── Alerta.tsx            # Alerta reutilizable tipo Bootstrap
│   │   ├── Banner.tsx            # Banner promocional
│   │   ├── Navbar.tsx   # Barra de navegación unificada y adaptativa
│   │   ├── CartItem.tsx   # Fila de tabla para el carrito de compras
│   │   ├── Footer.tsx         # Pie de página (Footer)
│   │   ├── MetricCard.tsx    # Card de métricas del panel administrativo
│   │   └── ProductCard.tsx   # Card reutilizable de producto
│   ├── datos/                # Modelos y base de datos simulada
│   │   ├── db.ts                 # Store reactivo en localStorage con eventos
│   │   └── Productos.ts          # Catálogo tipado de productos automotrices
│   ├── paginas/              # Vistas de la aplicación
│   │   ├── Blog.tsx
│   │   ├── Carrito.tsx
│   │   ├── Categorias.tsx
│   │   ├── CompraError.tsx
│   │   ├── CompraExitosa.tsx
│   │   ├── Contactos.tsx
│   │   ├── DetalleProducto.tsx
│   │   ├── GestionOrdenes.tsx
│   │   ├── GestionProductos.tsx
│   │   ├── GestionUsuarios.tsx
│   │   ├── Inicio.tsx
│   │   ├── Login.tsx
│   │   ├── Nosotros.tsx
│   │   ├── Ofertas.tsx
│   │   ├── Pago.tsx
│   │   ├── PanelAdmin.tsx
│   │   ├── Productos.tsx
│   │   ├── Registro.tsx
│   │   └── Vendedor.tsx
│   ├── utilidades/
│   │   └── validaciones.ts   # Módulo de validación de RUT, emails y fechas
│   ├── App.tsx               # Configuración de rutas (React Router)
│   ├── main.tsx              # Punto de entrada de la aplicación
│   └── style.css             # Estilos personalizados y tema corporativo
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- `npm` instalado

### Pasos para ejecutar localmente

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/MrPinkFlamingo/RepuestosCuchau.git
   cd RepuestosCuchau
   ```

2. **Cambiar a la rama de React:**
   ```bash
   git checkout ConReact
   ```

3. **Instalar dependencias:**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la tienda en funcionamiento.

5. **Verificar compilación y linter:**
   ```bash
   npm run lint     # Comprueba que no existan errores ni advertencias de estilo
   npm run build    # Compila TypeScript y genera el empaquetado para producción
   ```

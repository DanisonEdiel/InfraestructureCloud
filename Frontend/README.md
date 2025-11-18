
# 📘 PROYECTO MULTICLOUD – LIBRO DE VISITAS DISTRIBUIDO
### Proyecto académico – Arquitectura Multicloud  
### Equipo: Llanos · Stalin · Sánchez · Nayeli · Willian

---

## 🧩 Descripción General

Este proyecto implementa una aplicación real basada en **arquitectura multicloud distribuida**, donde cada servicio corre en un proveedor diferente.  
El objetivo es demostrar cómo las aplicaciones modernas pueden dividirse en múltiples nubes para mejorar disponibilidad, modularidad, rendimiento y resiliencia.

El sistema es un **Libro de Visitas Online**, donde los usuarios pueden:

- Ingresar su nombre  
- Dejar un comentario  
- Subir una foto  

Cada parte del flujo se procesa en un cloud distinto, formando un ecosistema completo de microservicios distribuidos.

---

## 🌐 Arquitectura General Multicloud

| Componente | Servicio Cloud | Responsable |
|-----------|----------------|-------------|
| Frontend | **Vercel** | Llanos |
| Backend API | **DigitalOcean** | Stalin |
| Base de Datos | **Neon PostgreSQL** | Willian |
| Almacenamiento de Imágenes | **Cloudinary** | Nayeli |
| Estadísticas / Edge Compute | **Cloudflare Workers** | Sánchez |

---

## 🔥 Tecnologías Principales

- **Vercel** – Frontend Serverless  
- **DigitalOcean** – Backend REST API  
- **Neon** – PostgreSQL serverless  
- **Cloudinary** – Optimización y hosting de imágenes  
- **Cloudflare Worker + KV** – Estadísticas de visitas  

---

## 🚀 Flujo Completo del Sistema

1. Usuario envía un formulario desde Vercel con `name`, `comment`, `photo`.
2. Backend en DigitalOcean recibe y valida los datos.
3. El backend sube la imagen a Cloudinary → recibe `secure_url` y `public_id`.
4. El backend guarda los datos en Neon PostgreSQL.
5. Se actualizan estadísticas en Cloudflare Workers.
6. Backend devuelve un JSON al frontend.
7. Frontend muestra la lista completa usando GET /visits.

---

## 🗄️ Base de Datos – Esquema Oficial

### Tabla: `visits`

```sql
CREATE TABLE IF NOT EXISTS visits (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  comment TEXT NOT NULL,
  image_url TEXT NOT NULL,
  public_id VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🧪 Endpoints del Backend

### POST `/visit`

```json
{
  "ok": true,
  "data": {
    "id": 15,
    "name": "Carlos",
    "comment": "Excelente proyecto",
    "image_url": "https://res.cloudinary.com/...jpg",
    "public_id": "visits/carlos_123",
    "created_at": "2025-11-17T22:10:45.102Z"
  }
}
```

---

### GET `/visits`

```json
[
  {
    "id": 15,
    "name": "Carlos",
    "comment": "Excelente proyecto",
    "image_url": "https://res.cloudinary.com/...jpg",
    "public_id": "visits/carlos_123",
    "created_at": "2025-11-17T22:10:45.102Z"
  }
]
```

---

## 👥 Roles del Equipo

| Miembro | Rol | Cloud |
|--------|------|--------|
| **Llanos** | Frontend | Vercel |
| **Stalin** | Backend API | DigitalOcean |
| **Sánchez** | Estadísticas / Worker | Cloudflare |
| **Nayeli** | Almacenamiento de imágenes | Cloudinary |
| **Willian Steven Vargas** | Base de Datos | Neon PostgreSQL |

---

## 📊 Estado Actual

✔ Arquitectura completa  
✔ BD creada y probada  
✔ API definida  
✔ Worker activo  
✔ Integración lista  

---

## 🧑‍💻 Autores

Proyecto Multicloud – Libro de Visitas  
Crown Institute – Arquitecturas Cloud  
Equipo: Llanos · Stalin · Sánchez · Nayeli · Willian

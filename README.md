README.md — Integración de Cloudinary (Parte de Nayeli)
# Integración de Cloudinary – Parte del Proyecto Multicloud (Nayeli)

Esta sección del proyecto corresponde a la integración con **Cloudinary**, encargada
de recibir imágenes desde el backend principal y almacenarlas en la carpeta **visits**.

---

## 1. Configuración creada en Cloudinary

Se creó un **Upload Preset** con los siguientes valores:

- **Nombre:** `visits_preset`
- **Modo:** Signed
- **Asset folder:** (vacío)
- **Use filename as display name:** true
- **Auto-generate public_id:** true
- **Unique filename:** false
- **Overwrite:** false
  
Se crearon las siguientes credenciales (se cargan vía .env):
**CLOUDINARY_CLOUD_NAME**
**CLOUDINARY_API_KEY**
**CLOUDINARY_API_SECRET**

> Nota: La carpeta final donde se guardan las imágenes (`visits/`) se envía desde el backend.

---
##2. Dependencias necesarias
    npm install express multer axios cors dotenv cloudinary
---

## 3. Código de la ruta para subir imágenes
Este es el endpoint que sube imágenes a Cloudinary:

```js
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/upload", upload.single("photo"), async (req, res) => {
  console.log("Petición recibida en /upload");
  const file = req.file;

  if (!file) return res.status(400).json({ error: "No file provided" });

  try {
    const folder = "visits";
    const timestamp = Math.round(Date.now() / 1000);

    // Firma segura requerida por Cloudinary en modo SIGNED
    const signature = cloudinary.utils.api_sign_request(
      { folder, timestamp },
      process.env.CLOUDINARY_API_SECRET
    );

    const base64Image =
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        file: base64Image,
        folder,
        api_key: process.env.CLOUDINARY_API_KEY,
        timestamp,
        signature,
      }
    );

    res.json({ ok: true, cloudinary: response.data });

  } catch (error) {
    console.log("ERROR SUBIENDO A CLOUDINARY");
    console.log(error.response?.data || error);

    res.status(500).json({
      error: "Upload failed",
      details: error.response?.data || error.message,
    });
  }
});

app.listen(3000, () =>
  console.log("Servidor listo en http://localhost:3000")
);

---
##4. Cómo probar este endpoint
En Postman:
Método: POST
URL: http://localhost:3000/upload

Body → form-data
Campo obligatorio:

| Key   | Tipo | Descripción    |
| ----- | ---- | -------------- |
| photo | File | Imagen a subir |
```
---
## 5. Qué devuelve Cloudinary
{
  "ok": true,
  "cloudinary": {
    "secure_url": "https://res.cloudinary.com/.../visits/xxxxx.png",
    "public_id": "visits/xxxxx"
  }
}

### Trabajo realizado por:
    Nayeli – Integración Cloudinary

---

README.md
# Integración de Cloudinary – Parte del Proyecto Multicloud (Nayeli)

Esta sección del proyecto corresponde a la integración con **Cloudinary**, encargada
de recibir imágenes desde el backend principal y almacenarlas en la carpeta **visits**.

---

## 1. Configuración creada en Cloudinary

Se creó un **Upload Preset** con los siguientes valores:

- **Nombre:** `visits_preset`
- **Modo:** Unsigned
- **Asset folder:** (vacío)
- **Use filename as display name:** true
- **Auto-generate public_id:** true
- **Unique filename:** false
- **Overwrite:** false

> Nota: La carpeta final donde se guardan las imágenes (`visits/`) se envía desde el backend.

---

## 2. Código de la ruta para subir imágenes

  Este es el endpoint que sube imágenes a Cloudinary:
  
  ```js
  app.post("/upload", upload.single("photo"), async (req, res) => {
    const file = req.file;
  
    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }
  
    try {
      const cloud_name = "drsxop82w";
      const upload_preset = "visits_preset";
  
      const base64Image =
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          file: base64Image,
          upload_preset,
          folder: "visits"
        }
      );
  
      res.json({
        ok: true,
        cloudinary: response.data,
      });
  
    } catch (error) {
      res.status(500).json({
        error: "Upload failed",
        details: error.response?.data || error.message,
      });
    }
  });
  ```
---

## 3. Cómo probar este endpoint
En Postman:

Método: POST
URL: http://localhost:3000/upload

Body → form-data
Campo obligatorio:

| Key   | Tipo | Descripción    |
| ----- | ---- | -------------- |
| photo | File | Imagen a subir |

---

## 4. Qué devuelve Cloudinary
  ```
{
  "ok": true,
  "cloudinary": {
    "secure_url": "https://res.cloudinary.com/.../visits/xxxxx.png",
    "public_id": "visits/xxxxx"
  }
}
  ```

## Trabajo realizado por:
Nayeli – Integración Cloudinary

---

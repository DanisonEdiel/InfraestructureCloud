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

      // Generar firma segura
      const signature = cloudinary.utils.api_sign_request(
        { folder, timestamp },
        process.env.CLOUDINARY_API_SECRET
      );

  const fileBase64 =`data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      file: fileBase64,
        folder,
        api_key: process.env.CLOUDINARY_API_KEY,
        timestamp,
        signature,
    }
  );

  return res.json({
      ok: true,
      cloudinary: response.data,
    });
} catch (error) {
    console.log("ERROR SUBIENDO A CLOUDINARY");
    console.log(error.response?.data || error);
    console.log("----------------------------");

  return res.status(500).json({
    error: "Upload failed",
    details: error.response?.data || error.message
  });
  }
});
app.listen(3000, () => console.log("Servidor listo en http://localhost:3000"));

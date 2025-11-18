app.post("/upload", upload.single("photo"), async (req, res) => {
  const file = req.file;

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
});

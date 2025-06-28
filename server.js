const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configure Cloudinary
cloudinary.config({
  cloud_name: "djhtu0rzz",
  api_key: "884227719597751",
  api_secret: "OkkGLoc34dhHzW-xFsdQQZ7eAT0",
});

// Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Upload image to Cloudinary
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
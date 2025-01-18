import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const app = express();
const PORT = process.env.PORT;

// Initialize S3 Client with AWS SDK v3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

app.use(cors());
app.use(bodyParser.json());

// Set up Multer for file uploads with S3
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, file.originalname); // Store with original filename
    },
  }),
});

const apiRouter = express.Router();

// Endpoint for uploading files
app.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({
      message: "File uploaded successfully",
      fileLocation: req.file.location, // Location of the uploaded file
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// Simple API welcome message
app.get("/api", async (req, res) => {
  res.json("Welcome to upskill");
});

// Use the API router
app.use("/api", apiRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});

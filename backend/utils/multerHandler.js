import multer from "multer";
import path from "path";

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

const portfoliostorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/portfolio"),
  filename: (req, file, cb) => {
    const ext = path.extname(path.basename(file.originalname)).toLowerCase();
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(path.basename(file.originalname)).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return cb(
      new Error("Invalid file type. Only jpg, jpeg, png, webp allowed."),
      false,
    );
  }
  cb(null, true);
};

export const upload = multer({
  storage: portfoliostorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const clientssaystorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/clientreview"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

export const uploadSingle = multer({
  storage: clientssaystorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const herosectionstorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/herosection"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

export const uploadhero = multer({
  storage: herosectionstorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

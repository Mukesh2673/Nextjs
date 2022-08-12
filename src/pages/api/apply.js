import { google } from "googleapis";
import Joi from "joi";
import nextConnect from "next-connect";
import multer from "multer";
import roles from "data/roles.json";

const spreadsheetId = "1VCgZmUTPScfkerGJvmIHnNyZKxRaTaiy33_i5eB7G2I";

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const uploadMiddleware = multer({
  limits: { files: 1, fileSize: 2097152 }, // 2mb
  storage: multer.diskStorage({
    destination: "./public/uploads/applications",
    fileFilter: function (req, file, cb) {
      var ext = path.extname(file.originalname);
      if (ext !== ".pdf") {
        return cb(new Error("Only PDF files are allowed"));
      }
      cb(null, true);
    },
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
}).single("resume");

async function submitData(data) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // create client instnace for auth
  const client = await auth.getClient();

  // create instance for google sheets api
  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });

  // write rows to spreadsheet
  googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Applications!A:I",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [data],
    },
  });
}

const filePath = (filename) =>
  filename ? `https://pickmeup.ng/uploads/applications/${filename}` : "No file";

const postApplication = async (req, res) => {
  const { firstName, lastName, email, phone, country, city, roleId, whyHire } =
    req.body;

  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(8).max(20).required(),
    country: Joi.string().min(3).max(20).required(),
    city: Joi.string().min(2).max(20).required(),
    whyHire: Joi.string().min(10).max(500).required(),
    roleId: Joi.string().length(8).required(),
  });

  const { value, error } = schema.validate(req.body);

  if (error) {
    console.log(error);
    return {
      status: 400,
      json: {
        message: "Your request body does not meet the requirements",
        data: null,
        error,
      },
    };
  }

  const roleName = roles.filter((role) => role.id === roleId)[0].name;

  // add values to database
  await submitData([
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    roleName,
    `${filePath(req.file?.filename)}`,
    whyHire,
  ]);

  // there is no error handling here, its bad, I know.

  return {
    status: 200,
    json: {
      message: "Success",
    },
  };
};

const handleJobApplication = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

//handleJobApplication.use(middleware);

handleJobApplication.use(uploadMiddleware);

handleJobApplication.post(async (req, res) => {
  // logging to server
  console.log(`${req.method} ${new Date()}`);

  // only accept post requests
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  try {
    const { status, json } = await postApplication(req, res);
    return res.status(status).json(json);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "An error occurred. This is unexpected. Please try again shortly.",
      error,
    });
  }
});

export default handleJobApplication;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

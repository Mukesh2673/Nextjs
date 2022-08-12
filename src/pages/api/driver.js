import { google } from "googleapis";
import Joi from "joi";
import nextConnect from "next-connect";
import multer from "multer";

const spreadsheetId = "1lPStFejroV104QOf75rBIO5fypeQ33hldFeNU2YlhZk";

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const uploadMiddleware = multer({
  limits: { files: 5, fileSize: 2097152 }, // 2mb
  storage: multer.diskStorage({
    destination: "./public/uploads/drivers",
    fileFilter: function (req, file, cb) {
      var ext = path.extname(file.originalname);
      if (ext !== ".pdf" && ext !== ".jpg" && ext !== ".jpeg") {
        return cb(new Error("Only PDF, JPG, and JPEG files are allowed"));
      }
      cb(null, true);
    },
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
}).any("uploadedFiles");

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
    range: "Drivers!A:Z",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [data],
    },
  });
}

const filePath = (filename) =>
  filename ? `https://pickmeup.ng/uploads/drivers/${filename}` : "No file";

async function parseData(req, res) {
  const {
    firstName,
    lastName,
    email,
    phone,
    city,
    lang,
    referCode,
    vehicle_hasOne,
    vehicle_manufacturer,
    vehicle_model,
    vehicle_year,
    vehicle_plate,
    vehicle_color,
    driverLicenseNumber,
    hasTaxiLicense,
    documents_driversLicense_expiry,
    documents_driverBadge_expiry,
    payment_type,
    payment_fullName,
    payment_address,
    payment_bankHolderName,
    payment_nubanNumber,
    payment_bankName,
  } = req.body;

  // schema to validate request with joi
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().min(6).max(40).required(),
    phone: Joi.string().min(2).max(20).required(),
    city: Joi.string()
      .valid(
        "Abuja",
        "Asaba",
        "Benin City",
        "Calabar",
        "Lagos",
        "Port-Harcourt",
        "Uyo",
        "Warri"
      )
      .required(),
    lang: Joi.string().min(2).max(20).required(),
    referCode: Joi.string().max(6).allow(""),
    vehicle_hasOne: Joi.boolean().required(),
    vehicle_manufacturer: Joi.string().max(20),
    vehicle_model: Joi.string().max(20),
    vehicle_year: Joi.string().max(4),
    vehicle_plate: Joi.string().max(10),
    vehicle_color: Joi.string().max(20),
    driverLicenseNumber: Joi.string().min(2).max(20).required(),
    hasTaxiLicense: Joi.boolean().required(),
    documents_driversLicense_file: Joi.any(),
    documents_driversLicense_expiry: Joi.string().min(10).max(10),
    documents_profilePhoto_file: Joi.any(),
    documents_lasdriCard_file: Joi.any(),
    documents_driverBadge_file: Joi.any(),
    documents_driverBadge_expiry: Joi.string().min(10).max(10),
    documents_lasrra_file: Joi.any(),
    payment_type: Joi.string().valid("Personal").required(),
    payment_fullName: Joi.string().min(6).max(40).required(),
    payment_address: Joi.string().min(6).max(100).required(),
    payment_bankHolderName: Joi.string().min(6).max(40).required(),
    payment_nubanNumber: Joi.string().min(10).max(10).required(),
    payment_bankName: Joi.string()
      .valid(
        "Access Bank Plc",
        "Fidelity Bank Plc",
        "First City Monument Bank Limited",
        "First Bank of Nigeria Limited",
        "Guaranty Trust Holding Company Plc",
        "Union Bank of Nigeria Plc",
        "United Bank for Africa Plc",
        "Zenith Bank Plc",
        "Citibank Nigeria Limited",
        "Ecobank Nigeria",
        "Heritage Bank Plc",
        "Keystone Bank Limited",
        "Polaris Bank Limited",
        "Stanbic IBTC Bank Plc",
        "Standard Chartered",
        "Sterling Bank Plc",
        "Titan Trust Bank Limited",
        "Unity Bank Plc",
        "Wema Bank Plc",
        "Globus Bank Limited",
        "Parallex Bank Limited",
        "Providus Bank Limited",
        "SunTrust Bank Nigeria Limited"
      )
      .required(),
  });

  const { value, error } = schema.validate(req.body);

  if (error) {
    console.log(error);
    return {
      success: false,
      data: null,
      error,
    };
  }

  return {
    success: true,
    data: [
      firstName,
      lastName,
      email,
      `+${phone}`,
      city,
      lang,
      referCode.length > 0 ? referCode : "No refer code.",
      vehicle_hasOne ? "Yes" : "No",
      vehicle_hasOne ? vehicle_manufacturer : "No car",
      vehicle_hasOne ? vehicle_model : "No car",
      vehicle_hasOne ? vehicle_year : "No Car",
      vehicle_hasOne ? vehicle_plate : "No car",
      vehicle_hasOne ? vehicle_color : "No car",
      driverLicenseNumber,
      hasTaxiLicense ? "Yes" : "No",
      `${filePath(
        req.files[0]?.filename
      )}\nExpires in ${documents_driversLicense_expiry}`,
      filePath(req.files[1]?.filename),
      filePath(req.files[2]?.filename),
      `${filePath(
        req.files[3]?.filename
      )}\nExpires in ${documents_driverBadge_expiry}`,
      filePath(req.files[4]?.filename),
      payment_type,
      payment_fullName,
      payment_address,
      payment_bankHolderName,
      payment_nubanNumber,
      payment_bankName,
    ],
    error: null,
  };
}

async function submitDriver(req, res) {
  try {
    // parse data in request
    const { success, error, data } = await parseData(req, res);

    // check if parsing was successful
    if (success) {
      // if data was parsed successfully
      await submitData(data);

      // return 200 upon successful submission
      return {
        status: 200,
        message: "Successfully added driver.",
      };
    } else {
      // if given data is invalid
      return {
        status: 400,
        message: error,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: "Something went wrong, please try again shortly",
    };
  }
}

const handleDriverSubmission = nextConnect({
  onError(error, req, res) {
    console.log(error);
    console.log(error.message);
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handleDriverSubmission.use(uploadMiddleware);

handleDriverSubmission.post(async (req, res) => {
  // logging current request
  console.log(`${req.method} ${new Date()}`);

  // only accept post requests
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  // handle driver submission
  try {
    const { status, message } = await submitDriver(req, res);
    return res.status(status).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong, please try again shortly",
    });
  }
});

export default handleDriverSubmission;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

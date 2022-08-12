import { google } from "googleapis";
import Joi from "joi";
import nextConnect from "next-connect";

const spreadsheetId = "19zE-wOqlp2lW4rQdxy3iiUvsRUNnEXLKZkHujM99aXQ";

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
    range: "Contact!A:D",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [data],
    },
  });
}

async function parseData(req, res) {
  const { fullName, email, phone, message } = req.body;

  const schema = Joi.object({
    fullName: Joi.string().min(6).max(40).required(),
    email: Joi.string().email().min(6).max(40).required(),
    phone: Joi.string().min(2).max(20).required(),
    message: Joi.string().min(20).max(500).required(),
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
    data: [fullName, email, `+${phone}`, message],
    error: null,
  };
}

async function submitContact(req, res) {
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
        message: "Successfully sent message.",
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

const handleContactSubmission = nextConnect({
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

handleContactSubmission.post(async (req, res) => {
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
    const { status, message } = await submitContact(req, res);
    return res.status(status).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong, please try again shortly",
    });
  }
});

export default handleContactSubmission;

import { atom } from "recoil";

export const driverState = atom({
  key: "driverState",
  default: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "Abuja",
    lang: "English, US",
    referCode: "",
    vehicle: {
      hasOne: true,
      manufacturer: "ACE",
      model: "",
      year: "2022",
      plate: "",
      color: "Beige",
    },
    driverLicenseNumber: "",
    hasTaxiLicense: false,
    documents: {
      driversLicense: {
        file: null,
        expiry: null,
      },
      profilePhoto: {
        file: null,
      },
      lasdriCard: {
        file: null,
      },
      driverBadge: {
        file: null,
        expiry: null,
      },
      lasrra: {
        file: null,
      },
    },
    payment: {
      type: "Personal",
      fullName: "",
      address: "",
      bankHolderName: "",
      nubanNumber: "",
      bankName: "Access Bank Plc",
    },
  },
});

export const stepState = atom({
  key: "stepState",
  default: 1,
});

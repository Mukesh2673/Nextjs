const checkExtension = (fileName, correct) => {
  let correctExtension = false;

  for (let i = 0; i < correct.length; i++) {
    if (fileName.split(".").pop().toLowerCase() === correct[i]) {
      // we found extension that's correct
      correctExtension = true;
    }
  }

  return correctExtension;
};

const checkSize = (given, correct) => {
  let sizeInMb = given / 1000000;

  return sizeInMb <= correct;
};

const checkDate = (date) => {
  return new Date(date) > new Date();
};

const setKey = (name, value, formData, setFormData) => {
  setFormData((old) => {
    let newFormData = { ...formData };

    newFormData[name] = value;

    return newFormData;
  });
};

const setErrorKey = (name, value, error, setError) => {
  setError((old) => {
    let newError = { ...error };

    newError[name] = value;

    return newError;
  });
};

export const setterExpiry = (
  e,
  name,
  formData,
  setFormData,
  error,
  setError
) => {
  setKey(name, e.target.value, formData, setFormData);

  if (!checkDate(e.target.value)) {
    setErrorKey(name, "Your expiration date is invalid.", error, setError);
  } else {
    setErrorKey(name, null, error, setError);
  }
};

export const setterFile = (
  e,
  name,
  formData,
  setFormData,
  error,
  setError,
  extensions,
  maxSize
) => {
  if (!e.target.files[0]) return;

  setKey(name, e.target.files[0], formData, setFormData);

  // e.target.files[0].name = name.split("_")[0] + e.target.files[0].name;

  if (!checkExtension(e.target.files[0].name, extensions)) {
    setErrorKey(
      name,
      `Incorrect Extension (required .${extensions[0]}
        ${extensions.length > 1 ? `or .${extensions[1]}` : ""}
        ${extensions.length > 2 ? `or .${extensions[2]}` : ""}
        files)`,
      error,
      setError
    );
  } else if (!checkSize(e.target.files[0].size, maxSize)) {
    setErrorKey(
      name,
      `Incorrect size (max size is ${maxSize}MB)`,
      error,
      setError
    );
  } else {
    setErrorKey(name, null, error, setError);
  }
};

const checkErrorObject = (error) => {
  // turns error object to array of values
  const allErrors = Object.values(error);

  // iterator
  let i = 0;

  while (i < allErrors.length) {
    if (allErrors[i]) return false;
    i++;
  }

  // all went well
  return true;
};

const checkFormValues = (form, error, setError) => {
  // iterator
  let i = 0;

  while (i < form.length) {
    // check expiry
    if (form[i].expiry) {
      if (form[i].expiry.value) {
        if (!checkDate(form[i].expiry.value)) {
          setErrorKey(
            form[i].expiry.name,
            "Your expiration date is invalid.",
            error,
            setError
          );
          return false;
        }
      } else {
        if (form[i].required) {
          setErrorKey(
            form[i].expiry.name,
            "This field is required.",
            error,
            setError
          );
          return false;
        }
      }
    }

    // check file
    if (form[i].file) {
      if (form[i].file.value) {
        if (!checkSize(form[i].file.value.size, form[i].file.maxSize)) {
          setErrorKey(
            form[i].file.name,
            `Incorrect size (max size is ${form[i].file.maxSize}MB)`,
            error,
            setError
          );
          return false;
        } else if (
          !checkExtension(form[i].file.value.name, form[i].file.extensions)
        ) {
          setErrorKey(
            form[i].file.name,
            `Incorrect Extension (required .${form[i].file.extensions[0]}
              ${
                form[i].file.extensions.length > 1
                  ? `or .${form[i].file.extensions[1]}`
                  : ""
              }
              ${
                form[i].file.extensions.length > 2
                  ? `or .${form[i].file.extensions[2]}`
                  : ""
              }
              files)`,
            error,
            setError
          );
          return false;
        }
      } else {
        if (form[i].required) {
          setErrorKey(
            form[i].file.name,
            `This field is required`,
            error,
            setError
          );
          return false;
        }
      }
    }

    i++;
  }
  // all went well.
  return true;
};

export const checkErrors = (form, error, setError) => {
  if (!checkFormValues(form, error, setError)) return false;

  return true;
};

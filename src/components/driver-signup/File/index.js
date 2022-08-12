import { Input } from "components";

function File({
  title,
  description, // html code
  required,
  expiry, // undefined || { value, setter }
  file, // undefined || { value, setter }
  className,
}) {
  return (
    <div className={`File w-full flex flex-col items-start ${className}`}>
      <div className="File-header w-full flex items-start justify-between col-gap flex-wrap">
        <h3 className="title tertiary">{title}</h3>
        {required && (
          <div className="File-header-required">
            <p>Required *</p>
          </div>
        )}
      </div>
      {description && (
        <div className="File-description w-full flex items-center justify-start">
          <p
            className="text"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      )}
      {expiry && (
        <div className="File-expiry w-full flex items-center justify-start">
          <Input
            type="date"
            value={expiry.value}
            onChange={expiry.setter}
            error={expiry.error}
            label="Expires"
            required={required}
          />
        </div>
      )}
      {file && (
        <div className="File-file w-full flex flex-col items-end">
          <Input
            type="file"
            value={file.value}
            onChange={file.setter}
            error={file.error}
            required={required}
            classNameContainer="flex flex-col items-end"
          />
        </div>
      )}
    </div>
  );
}

export default File;

// src/components/CustomAlert/index.js

import React from "react";
import { Alert } from "react-bootstrap";

const CustomAlert = ({ errors, setErrors }) => {
  return (
    <>
      {errors && errors.length > 0 && (
        <Alert
          variant="danger"
          className="mt-3"
          onClose={() => setErrors([])}
          dismissible
        >
          {errors.map((error, index) => (
            <div
              dangerouslySetInnerHTML={{ __html: error.message }}
              key={index}
            />
          ))}
        </Alert>
      )}
    </>
  );
};

export default CustomAlert;

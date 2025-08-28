"use client";
import { createContext, useContext, useState } from "react";

const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    roomNumber: "",
    phoneNumber: "",
    options: [],
    message: "",
    chairDetails: {
      chairs: "",
      broken: "",
      extra: "",
      wantMore: "",
    },
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => useContext(FormContext);

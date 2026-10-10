import { useState } from "react";

export function useForm() {
  const [valueOwner, setValueOwner] = useState("");
  const [valueName, setValueName] = useState("");
  const [errorOwner, setErrorOwner] = useState("");
  const [errorName, setErrorName] = useState("");

  const validate = () => {
    let valid = true;
    if (!valueOwner) {
      setErrorOwner("Owner is required");
      valid = false;
    }
    if (!valueName) {
      setErrorName("Name is required");
      valid = false;
    }
    return valid;
  };

  const reset = () => {
    setValueOwner("");
    setValueName("");
    setErrorOwner("");
    setErrorName("");
  };

  return {
    values: { valueOwner, valueName },
    errors: { errorOwner, errorName },
    handlers: { setValueOwner, setValueName, setErrorOwner, setErrorName },
    validate,
    reset,
  };
}

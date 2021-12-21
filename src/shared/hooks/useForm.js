import { useCallback, useState } from "react";

// eslint-disable-next-line import/prefer-default-export
export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues || {});

  const changeValue = useCallback(
    (newValues) => {
      setValues({
        ...values,
        ...newValues,
      });
    },
    [values]
  );

  const clear = useCallback(() => setValues(initialValues), [initialValues]);

  return [values, changeValue, clear];
};

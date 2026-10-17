
import { useEffect, useState } from "react";
import { getData, saveData } from "../services/storageService";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() =>
    getData(key, initialValue)
  );

  useEffect(() => {
    saveData(key, value);
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;

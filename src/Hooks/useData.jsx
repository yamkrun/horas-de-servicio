import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const url = "https://www.hs-service.api.crealape.com/api/v1/users";
export default function useData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [url]);
  return { data, loading, error };
}

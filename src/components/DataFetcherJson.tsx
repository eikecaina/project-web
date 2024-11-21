import { useEffect, useState } from "react";

// const axios = require("axios");
import axios from "axios";

interface dataExampleProps {
  apiUrl: string;
  tipo?: string;
  children: (data: any[]) => React.ReactNode;
}

interface universityProps {
  apiUrl: string;
  children: (data: any[]) => React.ReactNode;
}

export const DataFetcher: React.FC<dataExampleProps> = ({
  apiUrl,
  tipo,
  children,
}) => {
  const [data, setData] = useState<any[]>([]);

  async function fetchData() {
    try {
      const response = await axios.get(apiUrl);

      const dataResponse =
        response.data.jsonData.registros.find(
          (item: { tipo: string }) => item.tipo === tipo
        )?.dados || [];

      setData(dataResponse);
    } catch (error) {
      console.error("Erro ao acessar a API:");
    }
  }

  useEffect(() => {
    fetchData();
  }, [apiUrl, tipo]);

  return <>{children(data)}</>;
};

export const DataFetcherUniversity: React.FC<universityProps> = ({
  apiUrl,
  children,
}) => {
  const [data, setData] = useState<any[]>([]);

  async function fetchData() {
    try {
      const response = await axios.get(apiUrl);

      const dataResponse = response.data || [];

      setData(dataResponse);
    } catch (error) {
      console.error("Erro ao acessar a API:");
    }
  }
  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  return <>{children(data)}</>;
};

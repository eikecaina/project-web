import api from "../api";

export async function GetAllPeriod() {
    try {
      return await api.get(`/Period/GetAll`).then((r) => {
        return r.data;
      });
    } catch (error) {
      console.log("Erro ao Buscar:", error);
    }
  }
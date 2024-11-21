import { v4 as uuidv4 } from "uuid";
import api from "../api";
import { UUID } from "crypto";

interface FormData {
  id: UUID;
  quotation: string;
}

export async function GetAllQuotation() {
  try {
    return await api.get(`/Quotation/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetDataFromId(id: number) {
  try {
    return await api.get(`/Quotation/Get/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save(formData: FormData) {
  const rec = {
    id: formData.id,

  };

  try {
    const response = await api.post(`/Quotation`, rec);
    console.log(rec);

    return response.data;
  } catch (error) {
    console.error("Erro ao salvar:", error);
    console.log(formData);
    throw error;
  }
}

export async function Update(formData: FormData) {
  try {
    let data = {
      id: formData.id,

    };

    return await api.put(`/Quotation/Update`, data).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao Editar:", error);
  }
}

export async function Delete(formData: FormData) {
  const rec = {
    id: formData.id,
  };

  try {
    return await api.delete(`/Quotation/Delete/${rec.id}`).then((res) => {
      console.log("Deletado com sucesso");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
  }
}

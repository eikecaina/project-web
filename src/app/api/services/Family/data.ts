import { v4 as uuidv4 } from "uuid";
import api from "../api";
import { UUID } from "crypto";

interface FormData {
  id: UUID;
  family: string;
  plan: string;
  group: UUID;
  modifiedUser: string;
  createdUser: string;
  values: UUID[];
}

export async function GetAllFamily() {
  try {
    return await api.get(`/Family/values`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetDataFromId(id: UUID) {
  try {
    return await api.get(`/Family/Get/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save(formData: FormData) {
  const rec = {
    id: formData.id,
    ds_Family: formData.family,
    ds_Family_Planej: formData.plan,
    id_Group: formData.group,
    cd_Audit_Modified_User: "Eike",
    cd_Audit_Created_User: "Eike",
    values: formData.values,
  };

  try {
    const response = await api.post(`/Family/SaveWithValues/`, rec);
    console.log(rec);

    return response.data;
  } catch (error) {
    console.error("Erro ao salvar:", error);
    console.log(formData);
    throw error;
  }
}

export async function Update(formData: any) {
  try {
    let data = {
      id: formData.id,
      ds_Family: formData.family,
      ds_Family_Planej: formData.plan,
      id_Group: formData.group,
      cd_Audit_Modified_User: "Eike",
      cd_Audit_Created_User: "Eike",
    };

    return await api.put(`/Family/Update`, data).then((res) => {
      console.log(data);
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
    return await api.delete(`/Family/Delete/${rec.id}`).then((res) => {
      console.log("Deletado com sucesso");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
  }
}

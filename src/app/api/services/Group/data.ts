import { v4 as uuidv4 } from "uuid";
import api from "../api";
import { UUID } from "crypto";

interface FormData {
  id: UUID;
  group: string;
  desc: string;
  email: string;
  auditCreated: Date;
  idBlocked: boolean;
  dtAutoUnlocked: Date;
  idAutoUnlocked: boolean;
  dsBlocked: string;
}

export async function GetAllGroup() {
  try {
    return await api.get(`/Group/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetDataFromId(id: number) {
  try {
    return await api.get(`/Group/Get/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save(formData: FormData) {
  const rec = {
    id: formData.id,
    ds_Group: formData.group,
    ds_Email: formData.email,
    ds_Desc: formData.desc,
    dt_Auto_Unlocked: formData.dtAutoUnlocked,
    cd_Audit_Created_User: new Date().toISOString(),
    id_Blocked: formData.idBlocked,
    id_Auto_Unlocked: formData.idAutoUnlocked,
    cd_Audit_Modified_User: "Eike",
    ds_Blocked: formData.dsBlocked,
  };

  try {
    const response = await api.post(`/Group`, rec);
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
      ds_Group: formData.group,
      ds_Email: formData.email,
      ds_Desc: formData.desc,
      dt_Auto_Unlocked: formData.dtAutoUnlocked,
      cd_Audit_Created_User: new Date().toISOString(),
      id_Blocked: formData.idBlocked,
      id_Auto_Unlocked: formData.idAutoUnlocked,
      cd_Audit_Modified_User: "Eike",
      ds_Blocked: formData.dsBlocked,
    };

    return await api.put(`/Group/Update`, data).then((res) => {
      console.log(formData);
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
    return await api.delete(`/Group/Delete/${rec.id}`).then((res) => {
      console.log("Deletado com sucesso");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
  }
}

import api from "../api";
import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";

interface FormData {
  id: UUID;
  charact: string;
  plan: string;
  exib: string;
  desc: string;
  type: UUID;
  position: number;
  createdUser: string;
  modifiedUser: string;
}

export async function GetAllCharact() {
  try {
    return await api.get(`/Characteristic/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetAllCharactType() {
  try {
    return await api.get(`/CharacteristicType/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetCharactFromId(id: UUID) {
  try {
    return await api.get(`/Characteristic/Get/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save(formData: FormData) {
  const rec = {
    id: formData.id,
    ds_Caract: formData.charact,
    ds_Exib: formData.exib,
    ds_Desc: formData.desc,
    cd_Caract_Type: formData.type,
    vl_Position: formData.position,
    dt_Audit_Created: new Date(),
    cd_Audit_Created_User: "Eike",
    dt_Audit_Modified: new Date(),
    cd_Audit_Modified_User: "Eike",
  };

  try {
    const response = await api.post(`/Characteristic`, rec);
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
      ds_Caract: formData.charact,
      ds_Exib: formData.exib,
      ds_Desc: formData.desc,
      cd_Caract_Type: formData.type,
      vl_Position: formData.position,
      dt_Audit_Created: new Date(),
      cd_Audit_Created_User: "Eike",
      dt_Audit_Modified: new Date(),
      cd_Audit_Modified_User: "Eike",
    };

    return await api.put(`/Characteristic/Update`, data).then((res) => {
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
    return await api.delete(`/Characteristic/Delete/${rec.id}`).then((res) => {
      console.log("Deletado com sucesso");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
  }
}

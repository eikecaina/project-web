import { v4 as uuidv4 } from "uuid";
import api from "../api";
import { UUID } from "crypto";

interface FormData {
  id: UUID;
  cdProcessEntry: UUID;
  cdProcessExit: UUID;
  vlTime: number;
  cdPeriod: UUID;
  cdProcessConnectionType: UUID;
  idElapsedDay: boolean;
  dtAuditCreated: Date;
  dsAuditCreatedUser: string;
  dtAuditModified: Date;
  dsAuditModifiedUser: string;
}

export async function GetAllConnection() {
  try {
    return await api.get(`/Connection/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetAllConnectionType() {
  try {
    return await api.get(`/ProcessConnectionType/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetDataFromId(id: UUID) {
  try {
    return await api.get(`/ProcessConnection/Get/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save(formData: FormData) {
  const rec = {
    cd_Process_Entry: formData.cdProcessEntry,
    cd_Process_Exit: formData.cdProcessExit,
    vl_Time: formData.vlTime,
    cd_Period: formData.cdPeriod,
    cd_Process_Connection_Type: formData.cdProcessConnectionType,
    id_Elapsed_Day: formData.idElapsedDay,
    dt_Audit_Created: new Date(),
    ds_Audit_Created_User: "Eike",
    dt_Audit_Modified: new Date(),
    ds_Audit_Modified_User: "Eike",
  };

  try {
    const response = await api.post(`/ProcessConnection`, rec);
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
      cd_Process_Entry: formData.cdProcessEntry,
      cd_Process_Exit: formData.cdProcessExit,
      vl_Time: formData.vlTime,
      cd_Period: formData.cdPeriod,
      cd_Process_Connection_Type: formData.cdProcessConnectionType,
      id_Elapsed_Day: formData.idElapsedDay,
      dt_Audit_Created: new Date(),
      ds_Audit_Created_User: "Eike",
      dt_Audit_Modified: new Date(),
      ds_Audit_Modified_User: "Eike",
    };

    return await api.put(`/ProcessConnection/Update`, data).then((res) => {
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
    return await api.delete(`ProcessConnection/Delete/${rec.id}`).then((res) => {
      console.log("Deletado com sucesso");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
  }
}

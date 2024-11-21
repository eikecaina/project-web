import { v4 as uuidv4 } from "uuid";
import api from "../api";
import { UUID } from "crypto";

interface FormData {
  id: UUID;
  process: string;
  description: string;
  quotation: boolean;
  delay: boolean;
  factory: boolean;
  period: UUID;
  definition: UUID;
  time: number;
  calendar: UUID;
  cdAuditModifiedUser: string;
  dsAuditModifiedUser: string;
}

export async function GetAllProcess() {
  try {
    return await api.get(`/Process/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetConnectionsByProcess(id: UUID) {
  try {
    return await api
      .get(`/Process/GetConnectionsByProcess/${id}`)
      .then((res) => {
        return res.data;
      });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function GetByProcessId(id: UUID) {
  try {
    return await api.get(`/Resource/GetByProcessId/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.error("Erro ao buscar", error);
    
  }
}

export async function Save(formData: FormData) {
  const rec = {
    id: formData.id,
    ds_Process: formData.process,
    ds_Description: formData.description,
    id_Quotation: formData.quotation,
    id_Delay: formData.delay,
    id_Factory: formData.factory,
    cd_Period: formData.period,
    id_Definition: uuidv4(),
    vl_Time: formData.time,
    cd_Calendar: uuidv4(),
    cdAuditModifiedUser: "Eike",
    dsAuditModifiedUser: "Eike",
  };

  try {
    const response = await api.post(`/Process`, rec);
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
      ds_Process: formData.process,
      ds_Description: formData.description,
      id_Quotation: formData.quotation,
      id_Delay: formData.delay,
      id_Factory: formData.factory,
      cd_Period: formData.period,
      id_Definition: formData.definition,
      vl_Time: formData.time,
      cd_Calendar: formData.calendar,
      dt_Audit_Created: Date.now,
      cd_Audit_Created_User: "",
      dt_Audit_Modified: Date.now,
      cd_Audit_Modified_User: "",
      ds_Audit_Created_User: "",
      ds_Audit_Modified_User: "",
    };

    return await api.put(`/Process/Update`, data).then((res) => {
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
    return await api.delete(`/Process/Delete/${rec.id}`).then((res) => {
      console.log("Deletado com sucesso");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
  }
}

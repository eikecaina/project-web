import { v4 as uuidv4 } from "uuid";
import api from "../api";
import { UUID } from "crypto";

interface FormData {
  id: UUID;
  cdFamily: UUID;
  cdResourceParent: UUID;
  cdResourceSubResource: UUID;
  vlTimeSetupStart: number;
  cdPeriodSetupStart: UUID;
  vlTimeSetupEnd: number;
  cdPeriodSetupEnd: UUID;
  dtAuditCreated: Date;
  cdAuditCreatedUser: string;
  dtAuditModified: Date;
  cdAuditModifiedUser: string;
}

export async function GetAllSubResource() {
  try {
    return await api.get(`/SubSubResource/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetDataFromId(id: UUID) {
  try {
    return await api.get(`/SubResource/Get/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save(formData: FormData) {
  const rec = {
    id: formData.id,
    cd_Family: formData.cdFamily,
    cd_Resource_Parent: formData.cdResourceParent,
    cd_Resource_Sub_Resource: formData.cdResourceSubResource,
    vl_Time_Setup_Start: formData.vlTimeSetupStart,
    cd_Period_Setup_Start: formData.cdPeriodSetupStart,
    vl_Time_Setup_End: formData.vlTimeSetupEnd,
    cd_Period_Setup_End: formData.cdPeriodSetupEnd,
    dt_Audit_Created: new Date(),
    cd_Audit_Created_User: "Eike",
    dt_Audit_Modified: new Date(),
    cd_Audit_Modified_User: "Eike",
  };
  try {
    const response = await api.post(`/SubResource`, rec);
    console.log(rec);

    return response.data;
  } catch (error) {
    console.error("Erro ao salvar:", error);
    console.log(rec);
    throw error;
  }
}

export async function Update(formData: any) {
  try {
    let data = {
        id: formData.id,
        cd_Family: formData.cdFamily,
        cd_Resource_Parent: formData.cdResourceParent,
        cd_Resource_SubResource: formData.cdResourceSubResource,
        vl_Time_Setup_Start: formData.vlTimeSetupStart,
        cd_Period_Setup_Start: formData.cdPeriodSetupStart,
        vl_Time_Setup_End: formData.vlTimeSetupEnd,
        cd_Period_Setup_End: formData.cdPeriodSetupEnd,
        dt_Audit_Created: formData.dtAuditCreated,
        cd_Audit_Created_User: formData.cdAuditCreatedUser,
        dt_Audit_Modified: formData.dtAuditModified,
        cd_Audit_Modified_User: formData.cdAuditModifiedUser,
    };

    return await api.put(`/SubResource/Update`, data).then((res) => {
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
    return await api.delete(`/SubResource/Delete/${rec.id}`).then((res) => {
      console.log("Deletado com sucesso");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
  }
}

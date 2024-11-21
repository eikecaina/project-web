import api from "../api";
import { UUID } from "crypto";

interface FormData {
  id: UUID;
  dsResource: string;
  dsNotes: string;
  cdCalendar: UUID;
  cdAuditModified_User: string;
  processIds: UUID[];
  familyIds: UUID[];
  resourceAvailable: {};
  startDate: Date;
  endDate: Date;
  vlTime: number;
  periodAvailableId: UUID;
}

interface Consumption {
  period: UUID;
  process: UUID;
  resource: UUID;
  consumDate: UUID;
  vlConsum: UUID;
  note: string;
}

export async function GetAllResource() {
  try {
    return await api
      .get(`/Resource/GetWithFamilyResourceAndAvailability`)
      .then((r) => {
        return r.data;
      });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetByFamilyId(id: UUID) {
  try {
    return await api.get(`/Resource/GetByFamilyId/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao buscar recursos");
  }
}

export async function GetConsumByResourceId(id: UUID) {
  try {
    return await api.get(`/ResourceConsumption/resource/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao buscar recursos");
  }
}

export async function GetDataFromId(id: UUID) {
  try {
    return await api
      .get(`/Resource/GetWithFamiliesProcessesAndAvailabilityById/${id}`)
      .then((res) => {
        return res.data;
      });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save(formData: FormData) {
  try {
    const rec = {
      id: formData.id,
      ds_Resource: formData.dsResource,
      ds_Notes: formData.dsNotes,
      cd_Calendar: formData.cdCalendar,
      processIds: formData.processIds,
      familyIds: formData.familyIds,
      dt_Audit_Created: new Date(),
      cd_Audit_Created_User: "Eike",
      dt_Audit_Modified: new Date(),
      cd_Audit_Modified_User: "Eike",
      resourceAvailable: {
        vlTime: formData.vlTime,
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        periodAvailableId: formData.periodAvailableId,
      },
    };

    console.log(rec);
    const response = await api.post(
      `/Resource/SaveWithFamiliesProcessesAndAvailability`,
      rec
    );
    console.log("Resposta da API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar:", error);
    console.log(formData);
    throw error;
  }
}

export async function SaveConsum(formData: Consumption) {
  try {
    const rec = {
      consumption_date: formData.consumDate,
      note_description: formData.note,
      period_id: "3b090b38-28e8-490b-9438-c54936f47b65",
      process_id: formData.process,
      resource_id: formData.resource,
      vl_consumption: formData.vlConsum,
    };
    console.log(rec);
    const response = await api.post(`/ResourceConsumption`, rec);
    console.log("Resposta da API:", response.data);

    return response.data;
  } catch (error) {
    console.error("Erro ao salvar: ", error);
  }
}

export async function Update(formData: any) {
  try {
    let data = {
      id: formData.id,
      ds_Resource: formData.dsResource,
      ds_Notes: formData.dsNotes,
      cd_Calendar: formData.cdCalendar,
      processIds: formData.processIds,
      familyIds: formData.familyIds,
      dt_Audit_Created: new Date(),
      cd_Audit_Created_User: "Eike",
      dt_Audit_Modified: new Date(),
      cd_Audit_Modified_User: "Eike",
    };

    return await api.put(`/Resource/Update`, data).then((res) => {
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
    return await api.delete(`/Resource/Delete/${rec.id}`).then((res) => {
      console.log("Deletado com sucesso");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
  }
}

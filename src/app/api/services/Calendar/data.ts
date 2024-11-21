import api from "../api";
import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";

interface FormData {
  id: UUID;
  calendar: string;
  shortDesc: string;
  longDesc: string;
  createdUser: string;
  modifiedUser: string;
  calendarDays: [],
}

export async function GetAllCalendar() {
  try {
    return await api.get(`/Calendar/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetDataDaysFromId(id: UUID) {
  try {
    return await api.get(`/Calendar/GetWithDays/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetCalendarWithDays(id: UUID) {
  try {
    return await api.get(`/Calendar/GetWithDays/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save(formData: FormData) {
  const rec = {
    id: formData.id,
    ds_Calendar: formData.calendar,
    ds_Short_Desc: formData.shortDesc,
    ds_Long_Desc: formData.longDesc,
    cd_Audit_Created_User: "Eike",
    cd_Audit_Modified_User: "Eike",
    calendarDays: [],
  };

  try {
    const response = await api.post(`/Calendar`, rec);
    console.log(rec);

    return response.data;
  } catch (error) {
    console.error("Erro ao salvar:", error);
    console.log(rec);
    throw error;
  }
}

export async function Update(formData: FormData) {
  let data = {
    id: formData.id,
    ds_Calendar: formData.calendar,
    ds_Short_Desc: formData.shortDesc,
    ds_Long_Desc: formData.longDesc,
    cd_Audit_Created_User: "Eike",
    cd_Audit_Modified_User: "Eike",
  };
  try {
    return await api.put(`/Calendar/Update`, data).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao Editar:", error);
    console.log(data);
  }
}

export async function Delete(formData: FormData) {
  const rec = {
    id: formData.id,
  };

  try {
    return await api.delete(`/Calendar/Delete/${rec.id}`).then((res) => {
      console.log("Deletado com sucesso");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
  }
}

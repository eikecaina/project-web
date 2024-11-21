import api from "../api";
import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";

interface FormData {
  id: UUID;
  dsCalendarDay: string;
  cdCalendar: UUID;
  idBusinessDay: boolean;
  vlBaseDays: number;
  vlBasePeriod: number;
  vlBasePosition: number;
  vlOcurrenceType: number;
  dtOcurrence: Date;
  vlRepeatEnd: number;
  vlRepeatEndAfter: number;
  idRepeat: boolean;
  vlRepeatEach: number;
  vlRepeatPeriod: UUID;
  vlRepeatBusinessDays: number;
  dtRepeatEnd: Date;
  dtAuditCreated: Date;
  cdAuditCreatedUser: string;
  dtAuditModified: Date;
  cdAuditModifiedUser: string;
}

export async function GetAllDay() {
  try {
    return await api.get(`/CalendarDay/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetDataFromId(id: UUID) {
  try {
    return await api.get(`/CalendarDay/Get/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function SaveDay(formData: FormData) {
  const rec = {
    id: formData.id,
    ds_Calendar_Day: formData.dsCalendarDay,
    cd_Calendar: formData.id,
    id_Business_Day: formData.idBusinessDay,
    vl_Base_Days: undefined,
    vl_Base_Period: undefined,
    vl_Base_Position: undefined,
    vl_Ocurrence_Type: undefined,
    dt_Ocurrence: formData.dtOcurrence,
    vl_Repeat_End: undefined,
    vl_Repeat_End_After: formData.vlRepeatEndAfter,
    id_Repeat: formData.idRepeat,
    vl_Repeat_Each: formData.vlRepeatEach,
    vl_Repeat_Period: formData.vlRepeatPeriod,
    vl_Repeat_Business_Days: undefined,
    dt_Repeat_End: formData.dtRepeatEnd,
    dt_Audit_Created: new Date(),
    cd_Audit_Created_User: "Eike",
    dt_Audit_Modified: new Date(),
    cd_Audit_Modified_User: "Eike",
  };

  try {
    const response = await api.post(`/CalendarDay`, rec);
    console.log(rec);

    return response.data;
  } catch (error) {
    console.error("Erro ao salvar:", error);
    console.log(rec);
    throw error;
  }
}

export async function UpdateDay(formData: FormData) {
  try {
    let data = {
      id: formData.id,
      ds_Calendar_Day: formData.dsCalendarDay,
      cd_Calendar: formData.cdCalendar,
      id_Business_Day: formData.idBusinessDay,
      vl_Base_Days: formData.vlBaseDays,
      vl_Base_Period: formData.vlBasePeriod,
      vl_Base_Position: formData.vlBasePosition,
      vl_Ocurrence_Type: formData.vlOcurrenceType,
      dt_Ocurrence: formData.dtOcurrence,
      vl_Repeat_End: formData.vlRepeatEnd,
      vl_Repeat_End_After: formData.vlRepeatEndAfter,
      id_Repeat: formData.idRepeat,
      vl_Repeat_Each: formData.vlRepeatEach,
      vl_Repeat_Period: formData.vlRepeatPeriod,
      vl_Repeat_Business_Days: formData.vlRepeatBusinessDays,
      dt_Repeat_End: formData.dtRepeatEnd,
      dt_Audit_Created: formData.dtAuditCreated,
      cd_Audit_Created_User: formData.cdAuditCreatedUser,
      dt_Audit_Modified: formData.dtAuditModified,
      cd_Audit_Modified_User: formData.cdAuditModifiedUser,
    };

    return await api.put(`/CalendarDay/Update`, data).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao Editar:", error);
  }
}

export async function DeleteDay(formData: FormData) {
  const rec = {
    id: formData.id,
  };

  try {
    return await api.delete(`/CalendarDay/Delete/${rec.id}`).then((res) => {
      console.log("Deletado com sucesso");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
  }
}

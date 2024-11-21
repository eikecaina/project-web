import lib, { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Calendar,
  Form,
  Input,
  Select,
  Card,
  Row,
  Col,
  Checkbox,
  DatePicker,
  Modal,
  message,
  Divider,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import {
  DeleteButton,
  EditButton,
  NewButton,
  SaveButton,
} from "./ButtonsComponent";
import { useTranslation } from "react-i18next";
import { UUID } from "crypto";
import {
  Delete,
  GetAllCalendar,
  GetCalendarWithDays,
  GetDataDaysFromId,
  Save,
  Update,
} from "@/app/api/services/Calendar/data";
import {
  DeleteDay,
  GetAllDay,
  SaveDay,
  UpdateDay,
} from "@/app/api/services/Day/data";
import { GetAllPeriod } from "@/app/api/services/Period/data";

const { TextArea } = Input;

interface Calendar {
  id: UUID;
  calendar: string;
  shortDesc: string;
  longDesc: string;
  createdUser: string;
  modifiedUser: string;
  calendarDay: UUID;
}

interface Days {
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
  vlRepeatPeriod: number;
  vlRepeatBusinessDays: number;
  dtRepeatEnd: Date;
  dtAuditCreated: Date;
  cdAuditCreatedUser: string;
  dtAuditModified: Date;
  cdAuditModifiedUser: string;
}

interface Period {
  id: UUID;
  period: string;
}

export const CalendarSettings = () => {
  const [value, setValue] = useState(2);
  const [formData, setFormData] = useState<any>({
    idRepeat: false,
    idBussinesDay: false,
  });
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [periods, setPeriods] = useState<Period[]>([]);
  const [days, setDays] = useState<Days[]>([]);
  const [fetchData, setFetchData] = useState(true);

  const { t } = useTranslation("layout");
  const { Option } = Select;

  const clearInputs = () => {
    setFormData({});
  };

  const success = async () => {
    try {
      if (formData.id) {
        await Update(formData);
      } else {
        await Save(formData);
      }
      clearInputs();
      setFetchData(true);
      message.success("Salvo com sucesso!");
    } catch (error) {
      message.error("Não foi possível salvar");
    }
  };

  const successDay = () => {
    message
      .open({
        type: "loading",
        content: "Salvando..",
        duration: 2.5,
      })
      .then(async () => {
        try {
          await SaveDay(formData);
          clearInputs();

          setFetchData(true);
          message.success("Salvo com sucesso!", 2.5);
        } catch (error) {
          message.error("Não foi possível salvar");
          console.log(formData);
        }
      });
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: t("generalButtons.deleteButton"),
      icon: <ExclamationCircleOutlined />,
      content: "Deseja excluir o Calendário?",
      okText: t("generalButtons.confirmButton"),
      cancelText: t("generalButtons.cancelButton"),
      async onOk() {
        try {
          await Delete(formData);
          clearInputs();
          setFetchData(true);
          message.success("Excluido com sucesso!");
        } catch (error) {
          message.error("Não foi possivel excluir!");
        }
      },
    });
  };

  const deleteDay = () => {
    Modal.confirm({
      title: t("generalButtons.deleteButton"),
      icon: <ExclamationCircleOutlined />,
      content: "Deseja excluir o Dia?",
      okText: t("generalButtons.confirmButton"),
      cancelText: t("generalButtons.cancelButton"),
      async onOk() {
        try {
          await DeleteDay(formData);
          clearInputs();
          setFetchData(true);
          message.success("Excluido com sucesso!");
        } catch (error) {
          message.error("Não foi possivel excluir!");
        }
      },
    });
  };

  const formStyle = (
    width: string,
    marginRight?: string
  ): React.CSSProperties => ({
    display: "inline-block",
    width: width,
    marginRight: marginRight,
  });

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleInputDayChange = (fieldName: string, value: any) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleDateChange = (fieldName: string) => (date: any) => {
    const formattedDate = date ? date.toDate().toISOString() : "";
    setFormData({ ...formData, [fieldName]: formattedDate });
  };

  const handleSelectPeriodChange = (vlRepeatPeriod: string) => {
    setFormData({ ...formData, vlRepeatPeriod: vlRepeatPeriod });
  };

  const handleSelectCalendarChange = async (selectedCalendarId: UUID) => {
    try {
      const selectedCalendar = await GetDataDaysFromId(selectedCalendarId);
      if (selectedCalendar) {
        setFormData({
          ...formData,
          id: selectedCalendar.id,
          calendar: selectedCalendar.ds_Calendar,
          shortDesc: selectedCalendar.ds_Short_Desc,
          longDesc: selectedCalendar.ds_Long_Desc,
          createdUser: selectedCalendar.cd_Audit_Created_User,
          modifiedUser: selectedCalendar.cd_Audit_Modified_User,
        });
      }
      console.log(formData);
    } catch (error) {
      console.error("Erro ao buscar dados do calendário:", error);
    }
  };

  const fetchPeriods = async () => {
    try {
      const response = await GetAllPeriod();
      const periodData = response.map(
        (period: { id: UUID; ds_Period: string }) => ({
          id: period.id,
          period: period.ds_Period,
        })
      );
      setPeriods(periodData);
    } catch (error) {
      console.error("Erro ao buscar periodos", error);
    }
  };

  const fetchCalendars = async (setCalendars: any) => {
    try {
      const response = await GetAllCalendar();
      const calendarData = response.map(
        (calendar: {
          id: UUID;
          ds_Calendar: string;
          ds_Short_Desc: string;
          ds_Long_Desc: string;
          cd_Audit_Created_User: string;
          cd_Audit_Modified_User: string;
        }) => ({
          id: calendar.id,
          calendar: calendar.ds_Calendar,
          shortDesc: calendar.ds_Short_Desc,
          longDesc: calendar.ds_Long_Desc,
          createdUser: calendar.cd_Audit_Created_User,
          modifiedUser: calendar.cd_Audit_Modified_User,
        })
      );
      setCalendars(calendarData);
    } catch (error) {
      console.error("Erro ao buscar calendários:", error);
    }
  };

  const fetchCalendarDays = async () => {
    try {
      const response = await GetCalendarWithDays(formData.id);
      const dayData = response.calendarDays.map(
        (day: { id: UUID; ds_Calendar_Day: string }) => ({
          id: day.id,
          dsCalendarDay: day.ds_Calendar_Day,
        })
      );
      setDays(dayData);
      console.log(response);
    } catch (error) {
      console.error("Não foi possível buscar dias", error);
    }
  };

  useEffect(() => {
    if (formData.id) {
      fetchCalendarDays();
    }
  }, [formData.id]);

  useEffect(() => {
    if (fetchData) {
      fetchCalendars(setCalendars).then(() => setFetchData(false));
    }
  }, [fetchData, setCalendars, setFetchData]);

  useEffect(() => {
    fetchPeriods();
  }, []);

  const newFunction = () => {
    setValue(1);
    clearInputs();
  };

  const editFunction = () => {
    setValue(3);
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <Form.Item style={{ width: "50%" }} label={t("labels.calendar")}>
          <Select
            style={formStyle("calc(50% - 8px)", "8px")}
            onChange={handleSelectCalendarChange}
            value={value === 1 ? null : formData.group}
            disabled={value === 1}
          >
            {calendars.map((calendar) => (
              <Option key={calendar.id} value={calendar.id}>
                {calendar.calendar}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Form
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={5}>
          <Col span={15} style={{ display: "flex" }}>
            <Card style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>
              <div style={{ margin: 10 }}>
                <Form.Item
                  rules={[{ required: true, message: "Preencha o Nome" }]}
                  name="calendar"
                  label={t("labels.name")}
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <Input
                    disabled={value === 2}
                    name="calendar"
                    value={formData.calendar}
                    onChange={(e) =>
                      handleInputChange("calendar", e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item label="Base" style={formStyle("calc(50%)")}>
                  <Select />
                </Form.Item>
                <Form.Item label={t("labels.description")}>
                  <Input
                    disabled={value === 2}
                    value={formData.shortDesc}
                    onChange={(e) =>
                      handleInputChange("shortDesc", e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item
                  label={t("labels.comments")}
                  style={{ marginBottom: 0 }}
                >
                  <TextArea
                    disabled={value === 2}
                    style={{ resize: "none", height: "99px" }}
                    value={formData.longDesc}
                    onChange={(e) =>
                      handleInputChange("longDesc", e.target.value)
                    }
                  />
                </Form.Item>
              </div>
            </Card>
          </Col>
          <Col span={4}>
            <Card style={{ height: 325 }} bodyStyle={{ padding: 0 }}>
              {days.map((day) => (
                <li>{day.dsCalendarDay}</li>
              ))}
            </Card>
          </Col>
          <Col span={5}>
            <Card style={{ height: 325 }} bodyStyle={{ padding: 0 }}>
              <Calendar fullscreen={false} style={{ color: "red" }} />
            </Card>
          </Col>
        </Row>
        <div style={{ width: "100%", margin: 10, float: "right" }}>
          <div style={{ float: "right" }}>
            <NewButton onClick={newFunction} />
            <EditButton onClick={editFunction} />
            <DeleteButton onClick={confirmDelete} />
            <SaveButton onClick={success} />
          </div>
        </div>
      </Form>
      <Divider style={{ padding: 0, margin: 0 }} orientation="left">
        Cadastro de dia
      </Divider>
      <Form style={{ marginTop: "30px" }} colon={false}>
        <div style={{ display: "flex" }}>
          <Col span={8}>
            <Card title={t("titles.occurrence")} bodyStyle={{ padding: 10 }}>
              <div style={{ width: "100%" }}>
                <Form.Item
                  rules={[{ required: true, message: "Preencha o Nome" }]}
                  label={t("labels.name")}
                  name="day"
                  style={formStyle("50%")}
                >
                  <Input
                    name="day"
                    size="small"
                    onChange={(e) =>
                      handleInputDayChange("dsCalendarDay", e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  label={t("labels.date")}
                  style={formStyle("calc(70% - 5px)", "5px")}
                >
                  <DatePicker
                    size="small"
                    format={"DD/MM/YYYY"}
                    style={formStyle("80%")}
                    onChange={handleDateChange("dtOcurrence")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("labels.elapsedDays")}
                  style={formStyle("calc(23% - 8px)", "8px")}
                >
                  <Checkbox
                    checked={formData.idBusinessDay}
                    onChange={(e) =>
                      handleInputDayChange("idBusinessDay", e.target.checked)
                    }
                  />
                </Form.Item>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title={t("labels.repeat")} bodyStyle={{ padding: 10 }}>
              <Form.Item style={formStyle("100%")} label="Nunca">
                <Checkbox
                  checked={formData.idRepeat}
                  onChange={(e) =>
                    handleInputDayChange("idRepeat", e.target.checked)
                  }
                />
              </Form.Item>
              <Form.Item style={formStyle("65%")} label="A cada">
                <InputNumber
                  min={0}
                  size="small"
                  style={formStyle("calc(45% - 8px)", "8px")}
                  onChange={() => handleInputDayChange("vlRepeatEach", value)}
                />
                <Select
                  onChange={handleSelectPeriodChange}
                  style={formStyle("55%")}
                  size="small"
                >
                  {periods.slice(3).map((period) => (
                    <Option key={period.id} value={period.id}>
                      {period.period}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>
          </Col>
          <Col span={8}>
            <Card title={t("labels.termination")} bodyStyle={{ padding: 10 }}>
              <Form.Item
                style={formStyle("calc(50% - 6px)", "6px")}
                label={t("labels.in")}
              >
                <DatePicker
                  onChange={handleDateChange("dtRepeatEnd")}
                  format={"DD/MM/YYYY"}
                  size="small"
                />
              </Form.Item>
              <Form.Item label={t("labels.after")} style={formStyle("50%")}>
                <InputNumber
                  size="small"
                  min={0}
                  style={formStyle("40%", "8px")}
                  onChange={() =>
                    handleInputDayChange("vlRepeatEndAfter", value)
                  }
                />
                {t("labels.occurrences")}
              </Form.Item>
              <Form.Item style={formStyle("100%")} hidden></Form.Item>
            </Card>
          </Col>
        </div>
        <div style={{ width: "100%", margin: 10, float: "right" }}>
          <div style={{ float: "right" }}>
            <NewButton onClick={newFunction} />
            <EditButton onClick={editFunction} />
            <DeleteButton onClick={deleteDay} />
            <SaveButton onClick={successDay} />
          </div>
        </div>
      </Form>
    </>
  );
};

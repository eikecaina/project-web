import {
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Tree,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { formStyle } from "./Style";
  
import {
  DeleteButton,
  EditButton,
  NewButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import CustomInputNumber from "components/CustomInputNumber";
import { useTranslation } from "react-i18next";
import {
  Delete,
  GetAllProcess,
  Save,
  Update,
} from "@/app/api/services/Process/data";
import { UUID } from "crypto";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { GetAllCalendar } from "@/app/api/services/Calendar/data";
import { GetAllPeriod } from "@/app/api/services/Period/data";

const { Option } = Select;

interface Process {
  id: UUID;
  process: string;
  description: string;
  quotation: boolean;
  delay: boolean;
  factory: boolean;
  time: number;
  calendar: UUID;
  period: UUID;
}

interface Calendar {
  id: UUID;
  calendar: string;
}

interface Period {
  id: UUID;
  period: string;
}

const ProcessSettings: React.FC = () => {
  const [value, setValue] = useState(2);
  const [formData, setFormData] = useState<any>({});
  const [fetchData, setFetchData] = useState(true);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [calendar, setCalendar] = useState<Calendar[]>([]);
  const [valueTime, setValueTime] = useState(1);
  const [periods, setPeriods] = useState<Period[]>([]);

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

  const confirmDelete = () => {
    Modal.confirm({
      title: t("generalButtons.deleteButton"),
      icon: <ExclamationCircleOutlined />,
      content: "Deseja excluir o Processo?",
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

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSelectProcessChange = (selectedProcessId: any) => {
    const selectedProcess = processes.find(
      (process) => process.id === selectedProcessId
    );
    if (selectedProcess) {
      setFormData({
        ...formData,
        id: selectedProcess.id,
        process: selectedProcess.process,
        description: selectedProcess.description,
        quotation: selectedProcess.quotation,
        delay: selectedProcess.delay,
        factory: selectedProcess.factory,
        time: selectedProcess.time,
        calendar: selectedProcess.calendar,
        period: selectedProcess.period,
      });
    }
    console.log(formData);
  };

  const handleSelectCalendarChange = (calendar: any) => {
    setFormData({ ...formData, calendar: calendar });
  };

  const fetchProcess = async () => {
    try {
      const response = await GetAllProcess();
      const processData = response.map(
        (process: {
          id: UUID;
          ds_Process: string;
          ds_Description: string;
          id_Quotation: boolean;
          id_Delay: boolean;
          id_Factory: boolean;
          vl_Time: number;
          cd_Calendar: UUID;
        }) => ({
          id: process.id,
          process: process.ds_Process,
          description: process.ds_Description,
          quotation: process.id_Quotation,
          delay: process.id_Delay,
          factory: process.id_Factory,
          time: process.vl_Time,
          calendar: process.cd_Calendar,
        })
      );
      setProcesses(processData);
    } catch (error) {
      console.error("Erro ao buscar processos:", error);
    }
  };

  const fetchCalendars = async (setCalendars: any) => {
    try {
      const response = await GetAllCalendar();
      console.log(response);

      const calendarData = response.map(
        (calendar: { id: UUID; ds_Calendar: string }) => ({
          id: calendar.id,
          calendar: calendar.ds_Calendar,
        })
      );
      setCalendars(calendarData);
    } catch (error) {
      console.error("Erro ao buscar calendários:", error);
    }
  };

  useEffect(() => {
    if (fetchData) {
      fetchProcess().then(() => setFetchData(false));
    }
  }, [fetchData, setProcesses, setFetchData]);

  useEffect(() => {
    if (fetchData) {
      fetchCalendars(setCalendar).then(() => setFetchData(false));
    }
  }, [handleSelectCalendarChange]);

  const onChangeTime = (e: RadioChangeEvent) => {
    setValueTime(e.target.value);
  };

  const newFunction = () => {
    setValue(1);
    clearInputs();
  };

  const editFunction = () => {
    setValue(3);
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

  useEffect(() => {
    fetchPeriods();
  }, []);

  const { t } = useTranslation("layout");

  return (
    <>
      <div style={{ display: "flex" }}>
        <Form.Item style={{ width: "50%" }} label={t("labels.process")}>
          <Select
            style={formStyle("calc(50% - 8px)", "8px")}
            disabled={value === 1}
            value={value === 3 ? null : formData.process}
            onChange={handleSelectProcessChange}
          >
            {processes.map((process) => (
              <Option value={process.id} key={process.id}>
                {process.process}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Form layout="vertical">
        <Row gutter={10}>
          <Col span={9}>
            <Card
              style={{ height: "440px" }}
              title={t("titles.definition")}
              bodyStyle={{ padding: 10 }}
            >
              <Form.Item
                style={formStyle("calc(100% - 8px)", "8px")}
                label={t("labels.name")}
              >
                <Input
                  disabled={value === 2}
                  value={formData.process}
                  onChange={(e) => handleInputChange("process", e.target.value)}
                />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(100% - 8px)", "8px")}
                label={t("labels.description")}
              >
                <Input
                  disabled={value === 2}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(100% - 8px)", "8px")}
                label={t("labels.calendar")}
              >
                <Select
                  disabled={value === 2}
                  value={formData.calendar}
                  onChange={handleSelectCalendarChange}
                >
                  {calendar.map((calendar) => (
                    <Option key={calendar.id} value={calendar.id}>
                      {calendar.calendar}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <div style={{ width: "100%", display: "grid" }}>
                <Checkbox
                  disabled={value === 2}
                  checked={formData.quotation}
                  onChange={(e) =>
                    handleInputChange("quotation", e.target.checked)
                  }
                  style={{ margin: "7px" }}
                >
                  {t("labels.visibleQuotations")}
                </Checkbox>
                <Checkbox
                  disabled={value === 2}
                  onChange={(e) => handleInputChange("delay", e.target.checked)}
                  checked={formData.delay}
                  style={{ margin: "7px" }}
                >
                  {t("labels.dalayer")}
                </Checkbox>
                <Checkbox
                  disabled={value === 2}
                  onChange={(e) =>
                    handleInputChange("factory", e.target.checked)
                  }
                  checked={formData.factory}
                  style={{ margin: "7px" }}
                >
                  {t("labels.manufacturingProcess")}
                </Checkbox>
              </div>
            </Card>
          </Col>

          <Col span={15}>
            <Card
              style={{ height: "440px" }}
              title={t("titles.definition")}
              bodyStyle={{ padding: 10, height: "100%" }}
            >
              <Col span={24}>
                <Radio.Group
                  onChange={onChangeTime}
                  style={{ width: "100%" }}
                  value={valueTime}
                >
                  <Radio value={1}>{t("labels.fixedTime")}</Radio>
                  <InputNumber
                    disabled={value === 2}
                    style={{ marginLeft: 5 }}
                    placeholder="0"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e)}
                  />
                  <Select
                    disabled={value === 2}
                    style={{ margin: "0px 5px 0px 5px", width: "20%" }}
                    value={formData.period}
                    onChange={(value) => handleInputChange("period", value)}
                  >
                    {periods.map((period) => (
                      <Option key={period.id} value={period.id}>
                        {period.period}
                      </Option>
                    ))}
                  </Select>
                  <Radio disabled value={2}>{t("labels.familyTime")}</Radio>
                  <Radio disabled value={3}>{t("labels.timeCharacteristic")}</Radio>
                </Radio.Group>
                {valueTime === 2 ? (
                  <>
                    <Form.Item
                      style={formStyle("calc(50% - 5px)", "5px")}
                      label={t("labels.family")}
                    >
                      <Select showSearch />
                    </Form.Item>
                    <Form.Item
                      label={t("labels.period")}
                      style={formStyle("calc(50% - 5px)", "5px")}
                    >
                      <Select />
                    </Form.Item>
                    <Form.Item
                      label={t("labels.newApproval")}
                      style={formStyle("calc(50% - 5px)", "5px")}
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      label={t("labels.newCertificate")}
                      style={formStyle("calc(50% - 5px)", "5px")}
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      label={t("labels.repeatApproval")}
                      style={formStyle("calc(50% - 5px)", "5px")}
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      label={t("labels.certificateRepetition")}
                      style={formStyle("calc(50% - 5px)", "5px")}
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                  </>
                ) : null}
                {valueTime === 3 ? (
                  <Form.Item
                    label="Características"
                    style={{ marginTop: 20, marginBottom: 0 }}
                  >
                    <>
                      <div
                        style={{
                          height: "250px",
                          overflowX: "auto",
                        }}
                      >
                        <Tree
                          style={{
                            height: "100%",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          showLine={true}
                          defaultExpandedKeys={["0-0-0"]}
                        />
                      </div>
                    </>
                  </Form.Item>
                ) : null}
              </Col>
            </Card>
          </Col>
        </Row>
        <div style={{ margin: 10, float: "right" }}>
          <NewButton onClick={newFunction} />
          <EditButton onClick={editFunction} />
          <DeleteButton onClick={confirmDelete} />
          <SaveButton onClick={success} />
        </div>
      </Form>
    </>
  );
};

export default ProcessSettings;

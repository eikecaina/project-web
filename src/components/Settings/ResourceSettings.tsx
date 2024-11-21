import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Tooltip,
  Tree,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import {
  DeleteButton,
  EditButton,
  NewButton,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { useTranslation } from "react-i18next";
import {
  ExclamationCircleOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Delete,
  GetAllResource,
  GetDataFromId,
  Save,
  Update,
} from "@/app/api/services/Resource/data";
import { UUID } from "crypto";
import { GetAllCalendar } from "@/app/api/services/Calendar/data";
import { TreeFamily, TreeProcess, TreeProcessFamily } from "../TreeData";
import { DatePicker, Space } from "antd";
import { GetAllPeriod } from "@/app/api/services/Period/data";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import locale from "antd/locale/pt_BR";

import "dayjs/locale/pt-br";

const { Option } = Select;
const { TextArea } = Input;

interface Resource {
  id: UUID;
  dsResource: string;
  dsNotes: string;
  cdCalendar: UUID;
  processIds: UUID[];
  familyIds: UUID[];
  resourcesAvailable: Array<{
    id: UUID;
    startDate: Date;
    endDate: Date;
    vlTime: number;
    periodAvailableId: UUID;
    resourceId: UUID;
  }>;
}

interface Calendar {
  id: UUID;
  calendar: string;
}

const ResourceSettings: React.FC = () => {
  const [value, setValue] = useState(2);
  const [formData, setFormData] = useState<any>({});
  const [fetchData, setFetchData] = useState(true);
  const [resource, setResource] = useState<Resource[]>([]);
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [period, setPeriod] = useState<any[]>([]);

  const [form] = Form.useForm();

  const clearInputs = () => {
    form.resetFields();
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
      content: "Deseja excluir o Valor?",
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

  const handleSelectCalendarChange = (cdCalendar: any) => {
    setFormData({ ...formData, cdCalendar: cdCalendar });
  };

  const handleSelectResourceChange = (selectedResourceId: any) => {
    try {
      const selectedResource = resource.find(
        (resource) => resource.id === selectedResourceId
      );

      if (selectedResource) {
        setFormData({
          ...formData,
          id: selectedResource.id,
          dsResource: selectedResource.dsResource,
          dsNotes: selectedResource.dsNotes,
          cdCalendar: selectedResource.cdCalendar,
          processIds: selectedResource.processIds,
          familyIds: selectedResource.familyIds,
          resourcesAvailable:
            selectedResource.resourcesAvailable.map((available: any) => ({
              id: available.id,
              resourceId: available.resourceId,
              startDate: available.startDate,
              endDate: available.endDate,
              vlTime: available.vlTime,
              periodAvailableId: available.periodAvailableId,
            })) || [],
        });
        form.setFieldValue("dsResource", selectedResource.dsResource);
        form.setFieldValue("dsNotes", selectedResource.dsNotes);
        form.setFieldValue("cdCalendar", selectedResource.cdCalendar);
        form.setFieldValue(
          "vlTime",
          selectedResource.resourcesAvailable[0].vlTime
        );
        form.setFieldValue(
          "periodAvailableId",
          selectedResource.resourcesAvailable[0]
        );
        form.setFieldValue(
          "startDate",
          dayjs(selectedResource.resourcesAvailable[0].startDate)
        );
        form.setFieldValue(
          "endDate",
          dayjs(selectedResource.resourcesAvailable[0].endDate)
        );
      }
    } catch (error) {
      console.error("Erro ao obter dados do recurso: ", error);
    }
  };

  const newFunction = () => {
    setValue(1);
    clearInputs();
  };

  const editFunction = () => {
    setValue(3);
  };

  const fetchResource = async () => {
    try {
      const response = await GetAllResource();
      const resourceData = response.map(
        (resource: {
          id: UUID;
          ds_Resource: string;
          ds_Notes: string;
          cd_Calendar: UUID;
          processIds: UUID[];
          familyIds: UUID[];
          resourcesAvailable: {
            id: string;
            startDate: string;
            endDate: string;
            vlTime: number;
            periodAvailableId: string;
            resourceId: string;
          }[];
        }) => ({
          id: resource.id,
          dsResource: resource.ds_Resource,
          dsNotes: resource.ds_Notes,
          cdCalendar: resource.cd_Calendar,
          processIds: resource.processIds,
          familyIds: resource.familyIds,
          resourcesAvailable: resource.resourcesAvailable.map((available) => ({
            id: available.id,
            startDate: available.startDate,
            endDate: available.endDate,
            vlTime: available.vlTime,
            periodAvailableId: available.periodAvailableId,
            resourceId: available.resourceId,
          })),
        })
      );
      setResource(resourceData);
      console.log(resourceData);
    } catch (error) {
      console.error("Erro ao buscar Recursos: ", error);
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
      setPeriod(periodData);
    } catch (error) {
      console.error("Erro ao buscar periodos", error);
    }
  };

  useEffect(() => {
    fetchPeriods();
  }, []);

  const fetchCalendar = async () => {
    try {
      const response = await GetAllCalendar();
      const calendarData = response.map(
        (calendar: { id: UUID; ds_Calendar: string }) => ({
          id: calendar.id,
          calendar: calendar.ds_Calendar,
        })
      );
      setCalendars(calendarData);
    } catch (error) {}
  };

  useEffect(() => {
    if (fetchData) {
      fetchResource().then(() => setFetchData(false));
    }
  }, [fetchData]);

  useEffect(() => {
    if (fetchData) {
      fetchCalendar().then(() => setFormData(false));
    }
  }, [fetchData]);

  const { t } = useTranslation("layout");

  return (
    <Form layout="vertical" form={form}>
      <div style={{ display: "flex" }}>
        <Form.Item style={{ width: "50%" }} label={t("labels.resource")}>
          <Select
            onChange={handleSelectResourceChange}
            style={formStyle("calc(50%)")}
            value={value === 1 ? null : formData.group}
            disabled={value === 1}
          >
            {resource.map((resource) => (
              <Option value={resource.id} key={resource.id}>
                {resource.dsResource}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item
              name={"dsResource"}
              style={formStyle("calc(22.15% - 5px)", "5px")}
              label={t("labels.name")}
            >
              <Input
                name={"dsResource"}
                disabled={value === 2}
                value={formData.dsResource}
                onChange={(e) =>
                  handleInputChange("dsResource", e.target.value)
                }
              />
            </Form.Item>

            <Form.Item
              name={"vlTime"}
              colon={false}
              style={formStyle("calc(16.66 - 5px)", "5px")}
              label="Disponibilidade Diária"
            >
              <InputNumber
                name={"vlTime"}
                disabled={value === 2}
                value={formData.resourcesAvailable?.[0]?.vlTime}
                onChange={(value) => handleInputChange("vlTime", value)}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              colon={false}
              style={formStyle("calc(16.66% - 5px)", "5px")}
              label=" "
            >
              <Select
                disabled={value === 2}
                value={formData.resourcesAvailable?.[0]?.periodAvailableId}
                onChange={(value) =>
                  handleInputChange("periodAvailableId", value)
                }
              >
                {period.map((period) => (
                  <Option key={period.id} value={period.id}>
                    {period.period}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="startDate"
              colon={false}
              style={formStyle("calc(16.66% - 5px)", "5px")}
              label="Início"
            >
              <DatePicker
                name="startDate"
                disabled={value === 2}
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                onChange={(value) => handleInputChange("startDate", value)}
              />
            </Form.Item>

            <Form.Item
              colon={false}
              style={formStyle("calc(16.66% - 5px)", "5px")}
              label="Final"
              name="endDate"
            >
              <DatePicker
                name="endDate"
                disabled={value === 2}
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                onChange={(value) => handleInputChange("endDate", value)}
              />
            </Form.Item>

            <Form.Item
              name={"cdCalendar"}
              style={formStyle("calc(17%)")}
              label={t("labels.calendar")}
            >
              <Select
                disabled={value === 2}
                value={formData.cdCalendar}
                onChange={handleSelectCalendarChange}
              >
                {calendars.map((calendar) => (
                  <Option key={calendar.id} value={calendar.id}>
                    {calendar.calendar}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={formStyle("calc(100%)")}
              label={t("labels.description")}
            >
              <TextArea
                disabled={value === 2}
                style={{ height: 100, resize: "none" }}
                value={formData.dsNotes}
                onChange={(e) => handleInputChange("dsNotes", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Card
              title="Famílias que o recurso está disponivel"
              bodyStyle={{ padding: 10 }}
            >
              <div
                style={{
                  height: "220px",
                  overflowX: "auto",
                }}
              >
                <TreeProcessFamily
                  setFormData={setFormData}
                  fetchData={fetchData}
                  setFetchData={setFetchData}
                  checkable
                  checkedKeys={formData.familyIds}
                />
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              bodyStyle={{ padding: 10 }}
              title="Processos que consomem o recurso"
            >
              <div
                style={{
                  height: "220px",
                  overflowX: "auto",
                }}
              >
                <TreeProcess
                  setFormData={setFormData}
                  fetchData={fetchData}
                  setFetchData={setFetchData}
                  checkable
                  checkedKeys={formData.processIds}
                />
              </div>
            </Card>
          </Col>
        </Row>
        <div style={{ margin: 10, float: "right" }}>
          <NewButton onClick={newFunction} />
          <EditButton onClick={editFunction} />
          <DeleteButton onClick={confirmDelete} />
          <SaveButton onClick={success} />
        </div>
      </Card>
    </Form>
  );
};

export default ResourceSettings;

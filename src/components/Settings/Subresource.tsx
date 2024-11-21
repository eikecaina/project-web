import {
  Card,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  RadioChangeEvent,
  Select,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  DeleteButton,
  EditButton,
  NewButton,
  SaveButton,
} from "./ButtonsComponent";
import { formStyle } from "./Style";
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Delete, Save, Update } from "@/app/api/services/SubResource/data";
import { UUID } from "crypto";
import { GetAllResource } from "@/app/api/services/Resource/data";
import { GetAllFamily } from "@/app/api/services/Family/data";
import { GetAllPeriod } from "@/app/api/services/Period/data";

const { Option } = Select;

interface SubResource {
  id: UUID;
  cdFamily: UUID;
  cdResourceParent: UUID;
  cdResourceSubResource: UUID;
  vlTimeSetupStart: number;
  cdPeriodSetupStart: UUID;
  vlTimeSetupEnd: number;
  cdPeriodSetupEnd: UUID;
}

interface Resource {
  id: UUID;
  dsResource: string;
}

interface Family {
  id: UUID;
  dsFamily: string;
}

interface Period {
  id: UUID;
  period: string;
}

const SubResource: React.FC = () => {
  const [value, setValue] = useState(2);
  const [formData, setFormData] = useState<any>([]);
  const [fetchData, setFetchData] = useState(true);
  const [resource, setResource] = useState<Resource[]>([]);
  const [family, setFamily] = useState<Family[]>([]);
  const [periods, setPeriods] = useState<Period[]>([]);

  const { t } = useTranslation("layout");

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

  const handleSelectChange = (value: any, field: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSelectResourceChange = (selectedSubResourceId: any) => {
    console.log(formData);
  };

  const handleSelectNumberChange = (value: number, field: string) => {
    setFormData({ ...formData, [field]: value });
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
        (resource: { id: UUID; ds_Resource: string }) => ({
          id: resource.id,
          dsResource: resource.ds_Resource,
        })
      );
      setResource(resourceData);
    } catch (error) {
      console.error("Erro ao buscar grupos:", error);
    }
  };

  useEffect(() => {
    if (fetchData) {
      fetchResource().then(() => setFetchData(false));
    }
  }, [fetchData]);

  const fetchFamily = async () => {
    try {
      const response = await GetAllFamily();
      const familyData = response.map(
        (family: { id: UUID; ds_Family: string }) => ({
          id: family.id,
          dsFamily: family.ds_Family,
        })
      );
      setFamily(familyData);
    } catch (error) {
      console.error("Erro ao buscar grupos:", error);
    }
  };

  useEffect(() => {
    if (fetchData) {
      fetchFamily().then(() => setFetchData(false));
    }
  }, [fetchData]);

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

  return (
    <>
      <div style={{ display: "flex" }}>
        <Form.Item style={{ width: "50%" }} label={t("labels.resource")}>
          <Select
            style={formStyle("calc(50%)")}
            value={value === 1 ? null : null}
            disabled={value === 1}
          >
            {resource.map((resource) => (
              <Option key={resource.id} value={resource.id}>
                {resource.dsResource}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Card bodyStyle={{ padding: 10 }}>
        <Form layout="vertical">
          <Form.Item
            style={formStyle("calc(50% - 5px", "5px")}
            label={t("labels.resource")}
          >
            <Select
              disabled={value === 2}
              onChange={(value) =>
                handleSelectChange(value, "cdResourceParent")
              }
            >
              {resource.map((resource) => (
                <Option key={resource.id} value={resource.id}>
                  {resource.dsResource}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item style={formStyle("calc(50%)")} label={t("labels.family")}>
            <Select
              disabled={value === 2}
              onChange={(value) => handleSelectChange(value, "cdFamily")}
            >
              {family.map((family) => (
                <Option key={family.id} value={family.id}>
                  {family.dsFamily}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            style={formStyle("calc(20% - 5px", "5px")}
            label={t("labels.subResource")}
          >
            <Select
              disabled={value === 2}
              onChange={(value) =>
                handleSelectChange(value, "cdResourceSubResource")
              }
            >
              {resource.map((resource) => (
                <Option key={resource.id} value={resource.id}>
                  {resource.dsResource}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Preparo" style={formStyle("calc(20% - 5px", "5px")}>
            <InputNumber
              disabled={value === 2}
              style={{ width: "100%" }}
              placeholder="0"
              onChange={(value) =>
                handleSelectNumberChange(value as number, "vlTimeSetupEnd")
              }
            />
          </Form.Item>
          <Form.Item label=" " style={formStyle("calc(20% - 5px", "5px")}>
            <Select
              disabled={value === 2}
              onChange={(value) =>
                handleSelectChange(value, "cdPeriodSetupStart")
              }
              style={formStyle("100%")}
            >
              {periods.slice(3).map((period) => (
                <Option key={period.id} value={period.id}>
                  {period.period}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Liberação"
            style={formStyle("calc(20% - 5px", "5px")}
          >
            <InputNumber
              disabled={value === 2}
              style={{ width: "100%" }}
              placeholder="0"
              onChange={(value) =>
                handleSelectNumberChange(value as number, "vlTimeSetupStart")
              }
            />
          </Form.Item>
          <Form.Item label=" " style={formStyle("calc(20%)")}>
            <Select
              disabled={value === 2}
              onChange={(value) =>
                handleSelectChange(value, "cdPeriodSetupEnd")
              }
              style={formStyle("100%")}
            >
              {periods.slice(3).map((period) => (
                <Option key={period.id} value={period.id}>
                  {period.period}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <div style={{ float: "right" }}>
            <div style={{ margin: 10, float: "right" }}>
              <NewButton onClick={newFunction} />
              <EditButton onClick={editFunction} />
              <DeleteButton onClick={confirmDelete} />
              <SaveButton onClick={success} />
            </div>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default SubResource;

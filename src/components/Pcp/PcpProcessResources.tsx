import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePickerProps,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  message,
} from "antd";
import { DatePicker } from "antd";
import { RadioChangeEvent } from "antd/lib";

const { RangePicker } = DatePicker;

import CustomInputNumber from "components/CustomInputNumber";
import { useTranslation } from "react-i18next";
import { useForm } from "antd/es/form/Form";
import { GetAllFamily } from "@/app/api/services/Family/data";
import { UUID } from "crypto";
import {
  GetAllResource,
  GetByFamilyId,
  GetConsumByResourceId,
  SaveConsum,
} from "@/app/api/services/Resource/data";
import { GetAllProcess, GetByProcessId } from "@/app/api/services/Process/data";
import { formatDateEn, formatDateBr } from "../utilsDays";
const weekFormat = "DD/MM/YYYY";

const { TextArea } = Input;

type Family = {
  id: UUID;
  dsFamily: string;
};

type Resource = {
  id: UUID;
  dsResource: string;
};

type Process = {
  id: UUID;
  dsProcess: string;
};

type ProcessResources = {
  id: UUID;
  dsResource: string;
};

type Consumption = {
  id: UUID;
  consumptionDate: Date;
  vlConsumption: number;
};

const PcpProcessResources: React.FC = () => {
  const { t } = useTranslation("layout");
  const [form] = Form.useForm();
  const { Option } = Select;
  const formatDate = (date: string) => date?.split("T")[0];

  const [selectedRadio, setSelectedRadio] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [familys, setFamilys] = useState<Family[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [process, setProcess] = useState<Process[]>([]);
  const [processResources, setprocessResources] = useState<ProcessResources[]>(
    []
  );
  const [consumption, setConsumption] = useState<Consumption[]>([]);

  const clearInputs = () => {
    form.resetFields();
    setFormData({});
  };

  const success = async () => {
    try {
      await SaveConsum(formData);
      clearInputs();
      message.success("Salvo com sucesso!");
    } catch (error) {
      message.error("Não foi possível salvar");
    }
  };

  /* Get all familys */
  const getFamilys = async () => {
    try {
      const response = await GetAllFamily();

      const familyData = response.map(
        (familys: { id: UUID; ds_Family: string }) => ({
          id: familys.id,
          dsFamily: familys.ds_Family,
        })
      );

      setFamilys(familyData);
    } catch (error) {
      console.error("Erro ao buscar familias", error);
    }
  };

  useEffect(() => {
    getFamilys();
  }, []);

  /* Set IDs */
  const handleSelectChange = (key: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
    console.log(formData);
  };

  /* Get all resources */
  const getResourceByFamilyId = async () => {
    if (formData.familyId) {
      try {
        const response = await GetByFamilyId(formData.familyId);

        const resourceData = response.map(
          (resources: { id: UUID; ds_Resource: string }) => ({
            id: resources.id,
            dsResource: resources.ds_Resource,
          })
        );
        setResources(resourceData);
      } catch (error) {
        console.error("Não foi possivel carregar recursos", error);
      }
    }
  };

  /* Render resource */
  useEffect(() => {
    getResourceByFamilyId();
  }, [formData.familyId]);

  /* Get processos */
  const getAllProcess = async () => {
    try {
      const response = await GetAllProcess();

      const processData = response.map(
        (processes: { id: UUID; ds_Process: string }) => ({
          id: processes.id,
          dsProcess: processes.ds_Process,
        })
      );
      setProcess(processData);
    } catch (error) {
      console.error("Erro ao carregar processos", error);
    }
  };

  /* Render process */
  useEffect(() => {
    getAllProcess();
  }, []);

  //Log process
  useEffect(() => {
    if (process.length > 0) {
      console.log(process);
    }
  }, [process]);

  /* Get processResources */
  const getByProcessId = async () => {
    const response = await GetByProcessId(formData.process);
    console.log(response);

    const resourcesData = response.map(
      (resources: { id: UUID; ds_Resource: string }) => ({
        id: resources.id,
        dsResource: resources.ds_Resource,
      })
    );
    setprocessResources(resourcesData);
  };

  //Log resources
  useEffect(() => {
    if (formData.process) {
      getByProcessId();
    }
  }, [formData.process]);

  useEffect(() => {
    if (process.length > 0) {
      console.log(processResources);
    }
  }, [processResources]);

  /* Get consumption */
  const getResourceConsumption = async () => {
    const response = await GetConsumByResourceId(formData.resource);
    console.log(response);

    const consumptionData = response.map(
      (consumption: {
        id: UUID;
        vl_consumption: number;
        consumption_date: Date;
      }) => ({
        id: consumption.id,
        vlConsum: consumption.vl_consumption,
        consumptionDate: consumption.consumption_date,
      })
    );

    setConsumption(consumptionData);
  };

  /* Render Consumption */

  useEffect(() => {
    if (formData.resource) {
      getResourceConsumption();
    }
  }, [formData.resource]);

  useEffect(() => {
    if (consumption.length > 0) {
      console.log(formData.consumDate);
      // Extrai apenas a parte da data antes do "T"

      console.log(
        consumption
          .filter(
            (item: any) =>
              formatDate(item.consumptionDate) ===
              formatDate(formData.consumDate)
          )
          .map((date: any) => date.consumptionDate)
      );
    }
  }, [consumption, formData.consumDate]);

  /* Log de recursos */
  /*
  useEffect(() => {
    if (resources.length > 0) {
      console.log(resources);
    }
  }, [resources]);
  */

  /* Log recurso id */
  /*
  useEffect(() => {
    if (formData.resourceId) {
      console.log(formData.resourceId);
    }
  }, [formData.resourceId]);
  */

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedRadio(e.target.value);
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleDateChange = (fieldName: string) => (date: any) => {
    const formattedDate = date ? date.toDate().toISOString() : "";
    setFormData({ ...formData, [fieldName]: formattedDate });
  };

  return (
    <Row gutter={15}>
      <Col span={10}>
        <Card
          bodyStyle={{
            padding: 0,
          }}
          style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        >
          <Divider orientation="left">{t("titles.group")}</Divider>
          <div style={{ padding: "5px 10px 5px 10px" }}>
            <Form layout="vertical" form={form}>
              <Form.Item
                label="Familia"
                style={{
                  width: "calc(50% - 8px)",
                  display: "inline-block",
                  margin: "0px 15px 0 0px",
                }}
              >
                <Select
                  onChange={(value) => handleSelectChange("familyId", value)}
                >
                  {familys.map((family: any) => (
                    <Option key={family.id} value={family.id}>
                      {family.dsFamily}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={t("labels.selectDate")}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                }}
              >
                <DatePicker style={{ width: "100%" }} format={weekFormat} />
              </Form.Item>
            </Form>
            <div>
              <Radio.Group
                style={{ width: "100%" }}
                onChange={handleRadioChange}
                value={selectedRadio}
              >
                <Radio
                  value={1}
                  style={{ display: "inline-block", width: "calc(51% - 8px)" }}
                >
                  {t("labels.process")}
                </Radio>
                <Radio
                  value={2}
                  style={{ display: "inline-block", width: "calc(49% - 8px)" }}
                >
                  {t("labels.resource")}
                </Radio>
              </Radio.Group>

              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "0 15px 0 0",
                }}
              >
                <Select
                  placeholder="Selecione o processo"
                  showSearch
                  disabled={selectedRadio === 2}
                ></Select>
              </Form.Item>
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                }}
              >
                <Select
                  placeholder="Selecione o recurso"
                  showSearch
                  disabled={selectedRadio === 1}
                  onChange={(value) => handleSelectChange("resourceId", value)}
                >
                  {resources.map((resources: any) => (
                    <Option key={resources.id} value={resources.id}>
                      {resources.dsResource}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div>
              <Form layout="vertical" form={form}>
                <Form.Item
                  label="Controle final de fila"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 15px 0 0",
                  }}
                >
                  <Select>
                    {consumption
                      .filter(
                        (item: any) =>
                          formatDate(item.consumptionDate) ===
                          formatDate(formData.consumDate)
                      )
                      .map((consumption: any) => (
                        <Option key={consumption.id} value={consumption.id}>
                          Data: {formatDateBr(consumption.consumptionDate)}{" "}
                          Consumo: {consumption.vlConsum}
                        </Option>
                      ))}
                    );
                  </Select>
                </Form.Item>
                <Form.Item
                  label={t("labels.client")}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t("labels.quotation")}
                  style={{
                    margin: "0 15px 0 0",
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Select></Select>
                </Form.Item>
                <Form.Item
                  label={t("labels.salesOrder")}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="process"
                  label="Processo consumido"
                  style={{
                    width: "calc(50% - 8px)",
                    display: "inline-block",
                    margin: "0px 15px 0 0px",
                  }}
                >
                  <Select
                    onChange={(value) => handleSelectChange("process", value)}
                  >
                    {process.map((process: any) => (
                      <Option key={process.id} value={process.id}>
                        {process.dsProcess}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="resource"
                  label="Recurso consumido"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Select
                    onChange={(value) => handleSelectChange("resource", value)}
                  >
                    {processResources.map((resources: any) => (
                      <Option key={resources.id} value={resources.id}>
                        {resources.dsResource}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="vlConsum"
                  label={t("labels.secondsConsum")}
                  style={{
                    width: "calc(50% - 8px)",
                    display: "inline-block",
                    margin: "0px 15px 0 0px",
                  }}
                >
                  <InputNumber
                    name="vlConsum"
                    onChange={(value) => handleInputChange("vlConsum", value)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name="consumDate"
                  label={t("labels.selectDate")}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <DatePicker
                    onChange={handleDateChange("consumDate")}
                    style={{ width: "100%" }}
                    format={weekFormat}
                  />
                </Form.Item>
                <Form.Item name="note" label={t("labels.notes")}>
                  <TextArea
                    onChange={(value) =>
                      handleInputChange("note", value.target.value)
                    }
                    style={{ height: 50, resize: "none" }}
                  />
                </Form.Item>
              </Form>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  type="primary"
                  onClick={success}
                  style={{
                    display: "inline-block",
                    width: "calc(25% - 8px)",
                  }}
                >
                  {t("generalButtons.newButton")}
                </Button>
                <Button
                  type="primary"
                  style={{
                    display: "inline-block",
                    width: "calc(25% - 8px)",
                  }}
                >
                  {t("generalButtons.editButton")}
                </Button>
                <Button
                  type="primary"
                  style={{
                    display: "inline-block",
                    width: "calc(25% - 8px)",
                  }}
                >
                  {t("generalButtons.deleteButton")}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={14} style={{ height: 245 }}></Col>
    </Row>
  );
};
export default PcpProcessResources;

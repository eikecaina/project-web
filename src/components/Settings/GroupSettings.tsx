import {
  Card,
  Checkbox,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  TimePicker,
  message,
} from "antd";

import React, { useEffect, useRef, useState } from "react";
import { formStyle } from "./Style";
import {
  DeleteButton,
  EditButton,
  NewButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { useTranslation } from "react-i18next";
import {
  Delete,
  GetAllGroup,
  Save,
  Update,
} from "@/app/api/services/Group/data";
import { UUID } from "crypto";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { TextArea } = Input;
import dayjs from "dayjs";

interface Group {
  id: UUID;
  group: string;
  desc: string;
  email: string;
  auditCreated: Date;
  idBlocked: boolean;
  dsBlocked: string;
  dtAutoUnlocked: Date;
  idAutoUnlocked: boolean;
}

const GroupSettings: React.FC = () => {
  const [value, setValue] = useState(2);
  const [formData, setFormData] = useState<any>({
    idBlocked: false,
    idAutoUnlocked: false,
  });
  const [groups, setGroups] = useState<Group[]>([]);
  const [fetchData, setFetchData] = useState(true);
  const { t } = useTranslation("layout");
  const { Option } = Select;
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
      content: "Deseja excluir o Grupo?",
      okText: t("generalButtons.confirmButton"),
      cancelText: t("generalButtons.cancelButton"),
      async onOk() {
        try {
          await Delete(formData);
          setFetchData(true);
          clearInputs();
          message.success("Excluido com sucesso!");
        } catch (error) {
          message.error("Não foi possivel excluir!");
        }
      },
    });
  };

  const fetchGroups = async () => {
    if (fetchData) {
      try {
        const response = await GetAllGroup();
       
        const groupData = response.map(
          (group: {
            id: UUID;
            ds_Group: string;
            ds_Desc: string;
            ds_Email: string;
            id_Blocked: boolean;
            ds_Blocked: string;
            id_Auto_Unlocked: boolean;
            dt_Auto_Unlocked: Date;
          }) => ({
            id: group.id,
            group: group.ds_Group,
            desc: group.ds_Desc,
            email: group.ds_Email,
            idBlocked: group.id_Blocked,
            dsBlocked: group.ds_Blocked,
            idAutoUnlocked: group.id_Auto_Unlocked,
            dtAutoUnlocked: group.dt_Auto_Unlocked,
          })
        );
        setGroups(groupData);
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      } finally {
        setFetchData(false);
      }
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [fetchData]);

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSelectGroupChange = (selectedGroupId: any) => {
    const selectedGroup = groups.find((group) => group.id === selectedGroupId);
    if (selectedGroup) {
      const isoDate = selectedGroup.dtAutoUnlocked;

      setFormData({
        ...formData,
        id: selectedGroup.id,
        group: selectedGroup.group,
        desc: selectedGroup.desc,
        email: selectedGroup.email,
        idBlocked: selectedGroup.idBlocked,
        dsBlocked: selectedGroup.dsBlocked,
        idAutoUnlocked: selectedGroup.idAutoUnlocked,
        dtAutoUnlocked: selectedGroup.dtAutoUnlocked,
      });
      form.setFieldValue("group", selectedGroup.group);
      form.setFieldValue("desc", selectedGroup.desc);
      form.setFieldValue("email", selectedGroup.email);
      form.setFieldValue("idBlocked", selectedGroup.idBlocked);
      form.setFieldValue("dsBlocked", selectedGroup.dsBlocked);
      form.setFieldValue("idAutoUnlocked", selectedGroup.idAutoUnlocked);
      form.setFieldValue("dtAutoUnlocked", dayjs(isoDate));
    }
   
  };

  const newFunction = () => {
    setValue(1);
    clearInputs();
  };

  const editFunction = () => {
    setValue(3);
  };

  const handleDateChange = (fieldName: string) => (date: any) => {
    const formattedDate = date ? date.toDate().toISOString() : "";
    setFormData({ ...formData, [fieldName]: formattedDate });
  };

  return (
    <>
      <Form form={form} layout="vertical">
        <div style={{ display: "flex" }}>
          <Form.Item
            name="groups"
            style={{ width: "50%" }}
            label={t("labels.group")}
          >
            <Select
              style={formStyle("calc(50% - 8px)", "8px")}
              onChange={handleSelectGroupChange}
              disabled={value === 1}
            >
              {groups.map((group) => (
                <Option key={group.id} value={group.id}>
                  {group.group}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div>
          <Row>
            <Col span={24} style={{ marginBottom: 20 }}>
              <Card
                style={{ height: 300 }}
                title={t("titles.definition")}
                bodyStyle={{ padding: 10 }}
              >
                <Form.Item
                  name="group"
                  rules={[{ required: true, message: "Preencha o Nome" }]}
                  style={formStyle("calc(50% - 8px)", "8px")}
                  label={t("labels.name")}
                >
                  <Input
                    name="group"
                    value={formData.group}
                    disabled={value === 2}
                    onChange={(e) => handleInputChange("group", e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label={t("labels.email")}
                  style={formStyle("calc(50%)")}
                  rules={[{ required: true, message: "Preencha o Email" }]}
                >
                  <Input
                    disabled={value === 2}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={t("labels.description")}
                  style={{ marginBottom: 20 }}
                  name="desc"
                >
                  <TextArea
                    disabled={value === 2}
                    value={formData.desc}
                    style={{ resize: "none", height: "80px" }}
                    onChange={(e) => handleInputChange("desc", e.target.value)}
                  />
                </Form.Item>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                style={{ height: 300 }}
                title="Bloqueio Temporário"
                bodyStyle={{ padding: 10 }}
              >
                <Form.Item
                  name="idBlocked"
                  valuePropName="checked"
                  style={formStyle("calc(20% - 5px)", "-5px")}
                >
                  <Checkbox
                    name="idBlocked"
                    checked={formData.idBlocked}
                    onChange={(e) =>
                      handleInputChange("idBlocked", e.target.checked)
                    }
                  >
                    Bloqueado
                  </Checkbox>
                </Form.Item>

                <Form.Item
                  name="idAutoUnlocked"
                  valuePropName="checked"
                  style={formStyle("calc(13% - 5px)", "-5px")}
                >
                  <Checkbox
                    name="idAutoUnlocked"
                    checked={formData.idAutoUnlocked}
                    onChange={(e) =>
                      handleInputChange("idAutoUnlocked", e.target.checked)
                    }
                  >
                    Desbloqueio
                  </Checkbox>
                </Form.Item>

                <Form.Item
                  name="dtAutoUnlocked"
                  style={formStyle("calc(23% - 5px)", "-5px")}
                >
                  <DatePicker
                    name="dtAutoUnlocked"
                    onChange={handleDateChange("dtAutoUnlocked")}
                    size="small"
                    format={"DD/MM/YYYY HH:mm:ss"}
                    style={{ width: "100%" }}
                    showTime
                  />
                </Form.Item>

                <Form.Item
                  name="dsBlocked"
                  label="Avisos"
                  style={{ marginBottom: 20 }}
                >
                  <TextArea
                    disabled={value === 2}
                    style={{ resize: "none", height: "80px" }}
                    name="dsBlocked"
                    onChange={(e) =>
                      handleInputChange("dsBlocked", e.target.value)
                    }
                  />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </div>
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

export default GroupSettings;

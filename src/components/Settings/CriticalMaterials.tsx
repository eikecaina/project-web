import {
  Button,
  Card,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Tabs,
  TabsProps,
  Tree,
} from "antd";
import React, { useState } from "react";
import {
  DeleteButton,
  EditButton,
  NewButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { formStyle } from "./Style";

import { searchOptions } from "./SearchFilter";
import {
  EditOutlined,
  ExclamationCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const CriticalMaterials: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Material",
      children: <Material />,
    },
    {
      key: "2",
      label: "Impacto",
      children: <Impact />,
    },
  ];
  return (
    <>
      <Tabs type="line" defaultActiveKey="1" items={items} />
    </>
  );
};

export const Material: React.FC = () => {
  const [value, setValue] = useState(1);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<any>({});

  const clearInputs = () => {
    form.resetFields();
    setFormData({});
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const [valueMaterial, setValueMaterial] = useState(1);

  const onChangeMaterial = (e: RadioChangeEvent) => {
    setValueMaterial(e.target.value);
  };

  /*const success = async () => {
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
  };*/

  const newFunction = () => {
    setValue(1);
    clearInputs();
  };

  const editFunction = () => {
    setValue(3);
  };

  const { t } = useTranslation("layout");

  return (
    <>
      <Form style={{ marginTop: 10 }} layout="vertical">
        <Row gutter={10}>
          <Col span={12}>
            <Card
              bodyStyle={{ padding: 10 }}
              title={t("titles.characteristic")}
            >
              <div
                style={{
                  margin: "5px 0px 10px 0px",
                  height: 250,
                  overflowY: "auto",
                }}
              >
                <Tree
                  checkable
                  style={{
                    height: "100%",
                    maxHeight: 207,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  showLine={true}
                  defaultExpandedKeys={["0-0-0"]}
                />
              </div>
              <SelectRadio
                style={formStyle("97%")}
                type={t("labels.name")}
                value={value}
                onChange={onChange}
              />
              <div style={{ margin: 10, float: "right" }}>
                <NewButton onClick={newFunction} />
                <EditButton onClick={editFunction} />
                <DeleteButton />
                <SaveButton />
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              style={{ height: 480 }}
              title={t("titles.criticalMaterial")}
              bodyStyle={{ padding: 10 }}
            >
              <SelectRadio
                style={formStyle("calc(50% - 5px)", "5px")}
                type={t("labels.criticalMaterial")}
                value={valueMaterial}
                onChange={onChangeMaterial}
              />
              <Form.Item label={t("labels.name")} style={formStyle("50%")}>
                <Input />
              </Form.Item>
              <Form.Item
                label={t("labels.days")}
                style={{
                  width: "calc(30% - 5px)",
                  marginRight: 5,
                  display: "inline-block",
                  marginBottom: 0,
                }}
              >
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
              <Form.Item
                label={t("labels.class")}
                style={{
                  width: "70%",
                  display: "inline-block",
                  marginBottom: 0,
                }}
              >
                <Input />
              </Form.Item>
              <Checkbox style={{ marginTop: 5, width: "100%" }}>
                {t("labels.deadline")}
              </Checkbox>
              <div style={{ margin: 10, float: "right" }}>
                <NewButton onClick={newFunction} />
                <EditButton onClick={editFunction} />
                <DeleteButton />
                <SaveButton />
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export const Impact: React.FC = () => {
  const options = [];
  for (let i = 0; i < 7; i++) {
    options.push({ value: i, label: "Família " + i });
  }

  const [value, setValue] = useState(1);

  const handleChange = () => {
    setValue(value === 1 ? 2 : 1);
  };

  const { t } = useTranslation("layout");

  const [form] = Form.useForm();
  const [formData, setFormData] = useState<any>({});

  const clearInputs = () => {
    form.resetFields();
    setFormData({});
  };

  const newFunction = () => {
    setValue(1);
    clearInputs();
  };

  const editFunction = () => {
    setValue(3);
  };

  return (
    <Form layout="vertical" style={{ marginTop: 10 }}>
      <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
        <div>
          <Button
            onClick={handleChange}
            type="primary"
            style={{ margin: "5px 0px 10px 0px" }}
            icon={<EditOutlined />}
          >
            {t("generalButtons.editButton")}
          </Button>
        </div>
        <Form.Item
          style={formStyle("calc(50% - 5px)", "5px")}
          label={t("labels.material")}
        >
          <Select disabled={value === 2} />
        </Form.Item>
        <Form.Item
          label={t("labels.family")}
          style={formStyle("calc(50% - 5px)", "5px")}
        >
          <Cascader
            disabled={value === 1}
            showSearch={{ filter: searchOptions }}
            style={{ width: "100%" }}
            options={options}
            multiple
            maxTagCount="responsive"
          />
        </Form.Item>
        <Form.Item
          label={t("labels.selectedFamily")}
          style={formStyle("calc(33.33% - 5px)", "5px")}
        >
          <Select />
        </Form.Item>
        <Form.Item
          label={t("labels.realeseProcess")}
          style={formStyle("calc(33.33% - 5px)", "5px")}
        >
          <Select />
        </Form.Item>
        <Form.Item
          label={t("labels.impactedProcess")}
          style={formStyle("33.33%")}
        >
          <Select />
        </Form.Item>
      </Card>
      <div style={{ margin: 10, float: "right" }}>
        <NewButton onClick={newFunction} />
        <EditButton onClick={editFunction} />
        <DeleteButton />
        <SaveButton />
      </div>
    </Form>
  );
};

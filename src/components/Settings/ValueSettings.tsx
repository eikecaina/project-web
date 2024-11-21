import {
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  RadioChangeEvent,
  Row,
  Select,
  Tree,
  message,
} from "antd";
  
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import {
  DeleteButton,
  EditButton,
  NewButton,
  RadioButtons,
  SaveButton,
} from "./ButtonsComponent";
import { useEffect, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import {
  Delete,
  GetAllValue,
  GetDataFromId,
  GetWithChild,
  Save,
  Update,
} from "@/app/api/services/Value/data";
import { UUID } from "crypto";
import {
  GetAllCharact,
  GetCharactFromId,
} from "@/app/api/services/Characteristc/data";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import type { TreeDataNode, TreeProps } from "antd";
import { TreeValues } from "../TreeData";

const { Option } = Select;

interface Value {
  id: UUID;
  value: string;
  charact: UUID;
  position: number;
  newApproved: boolean;
  repeatApproved: boolean;
  newCertificate: boolean;
  repeatCertificate: boolean;
  parent_value_id: UUID;
}

interface Charact {
  id: UUID;
  charact: string;
  position: number;
}

const ValueSettings: React.FC = () => {
  const { t } = useTranslation("layout");

  const [value, setValue] = useState(2);
  const [formData, setFormData] = useState<any>({});
  const [values, setValues] = useState<Value[]>([]);
  const [characts, setCharacts] = useState<Charact[]>([]);
  const [fetchData, setFetchData] = useState(true);

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

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSelectValueChange = (selectedValueId: any) => {
    const selectedValue = values.find((value) => value.id === selectedValueId);
    if (selectedValue) {
      setFormData({
        ...formData,
        id: selectedValue.id,
        value: selectedValue.value,
        charact: selectedValue.charact,
        position: selectedValue.position,
        newApproved: selectedValue.newApproved,
        repeatApproved: selectedValue.repeatApproved,
        newCertificate: selectedValue.newCertificate,
        repeatCertificate: selectedValue.repeatCertificate,
        parent_value_id: selectedValue.parent_value_id,
      });
    }
    console.log(formData);
  };

  const handleSelectCaractChange = (charact: any) => {
    setFormData({ ...formData, charact: charact });
  };

  const fetchValues = async () => {
    try {
      const response = await GetAllValue();
      console.log(response);
      
      const valueData = response.map(
        (value: {
          value_id: UUID;
          ds_Value: string;
          cd_Caract: UUID;
          vl_Position: number;
          id_Allow_New_Approved: boolean;
          id_Allow_Repeat_Approved: boolean;
          id_Allow_New_Certificate: boolean;
          id_Allow_Repeat_Certificate: boolean;
          parent_value_id: UUID;
        }) => ({
          id: value.value_id,
          value: value.ds_Value,
          charact: value.cd_Caract,
          position: value.vl_Position,
          newApproved: value.id_Allow_New_Approved,
          repeatApproved: value.id_Allow_Repeat_Approved,
          newCertificate: value.id_Allow_New_Certificate,
          repeatCertificate: value.id_Allow_Repeat_Certificate,
          parent_value_id: value.parent_value_id,
        })
      );
      setValues(valueData);
    } catch (error) {
      console.error("Erro ao buscar valores:", error);
    }
  };

  const fetchCharacts = async () => {
    try {
      const response = await GetAllCharact();
      const charactData = response.map(
        (charact: { id: UUID; ds_Caract: string }) => ({
          id: charact.id,
          charact: charact.ds_Caract,
        })
      );
      setCharacts(charactData);
    } catch (error) {
      console.error("Erro ao buscar características:", error);
    }
  };

  useEffect(() => {
    if (fetchData) {
      fetchValues().then(() => setFetchData(false));
    }
  }, [fetchData]);

  useEffect(() => {
    if (fetchData) {
      fetchCharacts();
    }
  }, [fetchData, handleSelectCaractChange]);

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
        <Form.Item style={{ width: "50%" }} label={t("labels.values")}>
          <Select
            onChange={handleSelectValueChange}
            style={formStyle("calc(50% - 8px)", "8px")}
            value={value === 1 ? null : formData.group}
            disabled={value === 1}
          >
            {values.map((value) => (
              <Option key={value.id} value={value.id}>
                {value.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <Row gutter={10}>
        <Col span={12}>
          <Card
            title={t("titles.definitionFamily")}
            style={{ height: "450px", overflowX: "auto" }}
          >
            <TreeValues
              setFormData={setFormData}
              fetchData={fetchData}
              setFetchData={setFetchData}
              checkable
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
            <Form layout="vertical">
              <Form.Item style={formStyle("100%")} label={t("labels.name")}>
                <Input
                  disabled={value === 2}
                  value={formData.value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(50% - 8px)", "8px")}
                label={t("labels.charact")}
              >
                <Select
                  disabled={value === 2}
                  onChange={handleSelectCaractChange}
                  value={formData.charact}
                >
                  {characts.map((charact) => (
                    <Option key={charact.id} value={charact.id}>
                      {charact.charact}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item style={formStyle("50%")} label={t("labels.position")}>
                <InputNumber
                  disabled={value === 2}
                  min={1}
                  style={{ width: "100%" }}
                  value={formData.position}
                  onChange={(value) => handleInputChange("position", value)}
                />
              </Form.Item>
              <Divider orientation="left">{t("titles.condition")}</Divider>
              <div style={{ display: "grid" }}>
                <Checkbox
                  disabled={value === 2}
                  checked={formData.newApproved}
                  style={{ margin: "7px" }}
                  onChange={(e) =>
                    handleInputChange("newApproved", e.target.checked)
                  }
                >
                  {t("labels.newAprovattion")}
                </Checkbox>
                <Checkbox
                  disabled={value === 2}
                  checked={formData.repeatApproved}
                  style={{ margin: "7px" }}
                  onChange={(e) =>
                    handleInputChange("repeatApproved", e.target.checked)
                  }
                >
                  {t("labels.repetitionAprovattion")}
                </Checkbox>
                <Checkbox
                  disabled={value === 2}
                  checked={formData.newCertificate}
                  style={{ margin: "7px" }}
                  onChange={(e) =>
                    handleInputChange("newCertificate", e.target.checked)
                  }
                >
                  {t("labels.newCertificate")}
                </Checkbox>
                <Checkbox
                  disabled={value === 2}
                  checked={formData.repeatCertificate}
                  style={{ margin: "7px" }}
                  onChange={(e) =>
                    handleInputChange("repeatCertificate", e.target.checked)
                  }
                >
                  {t("labels.repetitionCertificate")}
                </Checkbox>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
      <div style={{ margin: 10, float: "right" }}>
        <NewButton onClick={newFunction} />
        <EditButton onClick={editFunction} />
        <DeleteButton onClick={confirmDelete} />
        <SaveButton onClick={success} />
      </div>
    </>
  );
};

export default ValueSettings;

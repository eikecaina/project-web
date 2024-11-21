import {
  Card,
  Col,
  Form,
  Input,
  Modal,
  RadioChangeEvent,
  Row,
  Select,
  Tree,
  TreeDataNode,
  message,
} from "antd";

import { formStyle } from "./Style";
  
import {
  DeleteButton,
  EditButton,
  NewButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UUID } from "crypto";
import {
  Delete,
  Save,
  GetAllFamily,
  Update,
  GetDataFromId,
} from "@/app/api/services/Family/data";
import { GetAllGroup } from "@/app/api/services/Group/data";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { TreeFamily } from "../TreeData";

const { Option } = Select;

interface Group {
  id: UUID;
  group: string;
}

interface Family {
  id: UUID;
  family: string;
  plan: string;
  group: UUID;
  values_ids: UUID[];
}

const FamilySttings: React.FC = () => {
  const [form] = Form.useForm();

  const [value, setValue] = useState(2);
  const [formData, setFormData] = useState<any>({});
  const [groups, setGroups] = useState<Group[]>([]);
  const [familys, setFamilys] = useState<Family[]>([]);
  const [fetchData, setFetchData] = useState(true);

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
      content: "Deseja excluir a Família?",
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

  const fetchGroups = async () => {
    try {
      const response = await GetAllGroup();
      const groupData = response.map(
        (group: { id: UUID; ds_Group: string }) => ({
          id: group.id,
          group: group.ds_Group,
        })
      );
      setGroups(groupData);
    } catch (error) {
      console.error("Erro ao buscar grupos:", error);
    }
  };
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchFamilys = async () => {
    try {
      const response = await GetAllFamily();
      console.log(response);

      const familyData = response.map(
        (family: {
          id: UUID;
          ds_Family: string;
          id_Group: UUID;
          ds_Family_Planej: string;
          value_ids: UUID[];
        }) => ({
          id: family.id,
          family: family.ds_Family,
          group: family.id_Group,
          plan: family.ds_Family_Planej,
          values_ids: family.value_ids,
        })
      );
      setFamilys(familyData);
      console.log(familyData);
    } catch (error) {
      console.error("Erro ao buscar famílias:", error);
    }
  };

  useEffect(() => {
    if (fetchData) {
      fetchFamilys().then(() => setFetchData(false));
    }
  }, [fetchData]);

  const handleSelectFamilyChange = (selectedFamilyId: any) => {
    const selectedFamily = familys.find(
      (family) => family.id === selectedFamilyId
    );
    if (selectedFamily) {
      setFormData({
        ...formData,
        id: selectedFamily.id,
        group: selectedFamily.group,
        plan: selectedFamily.plan,
        family: selectedFamily.family,
        value_ids: selectedFamily.values_ids,
      });
      form.setFieldValue("family", selectedFamily.family);
    }
    console.log(formData);
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSelectGroupChange = (group: any) => {
    setFormData({ ...formData, group: group });
  };

  const newFunction = () => {
    setValue(1);
    clearInputs();
  };

  const editFunction = () => {
    setValue(3);
  };

  const { t } = useTranslation("layout");
  return (
    <Form form={form} layout="vertical">
      <div style={{ display: "flex" }}>
        <Form.Item
          name="familys"
          style={{ width: "50%" }}
          label={t("labels.family")}
        >
          <Select
            style={formStyle("calc(50% - 8px)", "8px")}
            value={value === 1 ? null : formData.family}
            disabled={value === 1}
            onChange={handleSelectFamilyChange}
          >
            {familys.map((family) => (
              <Option key={family.id} value={family.id}>
                {family.family}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div>
        <Row gutter={10}>
          <Col span={24}>
            <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
              <Form.Item
                name="family"
                rules={[{ required: true, message: "Preencha o Nome" }]}
                style={formStyle("calc(33% - 8px", "8px")}
                label={t("labels.family")}
              >
                <Input
                  name="family"
                  disabled={value === 2}
                  value={formData.family}
                  onChange={(e) => handleInputChange("family", e.target.value)}
                />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(33% - 8px", "8px")}
                label={t("labels.planner")}
              >
                <Input
                  disabled={value === 2}
                  value={formData.plan}
                  onChange={(e) => handleInputChange("plan", e.target.value)}
                />
              </Form.Item>
              <Form.Item style={formStyle("33%")} label={t("labels.group")}>
                <Select
                  disabled={value === 2}
                  onChange={handleSelectGroupChange}
                  value={formData.group}
                >
                  {groups.map((group, index) => (
                    <Option key={group.id || index} value={group.id}>
                      {group.group}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>
          </Col>
          <Col span={24}>
            <Card
              style={{ marginTop: 10 }}
              title={t("titles.valuesFamily")}
              bodyStyle={{ height: "300px", overflowX: "auto", padding: 5 }}
            >
              <TreeFamily
                checkedKeys={formData.value_ids}
                checkable={true}
                setFormData={setFormData}
                fetchData={fetchData}
                setFetchData={setFetchData}
              />
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
  );
};

export default FamilySttings;

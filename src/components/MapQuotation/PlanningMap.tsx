import {
  Button,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  Select,
  Table,
  Tooltip,
  theme,
} from "antd";
import type { TableColumnsType, TableProps } from "antd";
import type { ColorPickerProps } from "antd";
import { generate, green, presetPalettes, red } from "@ant-design/colors";
import {
  CloseOutlined,
  EditOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Presets = Required<ColorPickerProps>["presets"][number];

const { RangePicker } = DatePicker;

interface DataType {
  key: React.Key;
  name: string;
  exibir: React.ReactNode;
  tempo: React.ReactNode;
  abrev: string;
  quebra: React.ReactNode;
  cor: React.ReactNode;
}

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors,
  }));

const PlanningMap: React.FC = () => {

  const { t } = useTranslation("layout");
  const { token } = theme.useToken();
  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
  });

  const columns: TableColumnsType<DataType> = [
    {
      width: 30,
      title: t("labels.display"),
      dataIndex: "exibir",
      key: "exibir",
    },
    {
      width: 30,
      title: t("labels.time"),
      dataIndex: "tempo",
      key: "tempo",
    },
    {
      width: 250,
      title: t("labels.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      width: 30,
      title: t("labels.abbrev"),
      dataIndex: "abrev",
      key: "abrev",
    },
    {
      width: 30,
      title: t("labels.display"),
      dataIndex: "quebra",
      key: "quebra",
    },
    {
      width: 30,
      title: t("labels.color"),
      dataIndex: "cor",
      key: "cor",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      exibir: <Checkbox />,
      tempo: <Checkbox />,
      name: "DT - PROD Bobinagem AT",
      abrev: "AT",
      quebra: <Checkbox />,
      cor: <ColorPicker presets={presets} size="small" />,
    },
    {
      key: "2",
      exibir: <Checkbox />,
      tempo: <Checkbox />,
      name: "DT - PROD Fechamento",
      abrev: "FECH",
      quebra: <Checkbox />,
      cor: <ColorPicker presets={presets} size="small" />,
    },
  ];

  const [isDisableInput, setDisableInput] = useState(true);

  const handleDisableInput = () => {
    setDisableInput(!isDisableInput);
  };
  const weekFormat = "DD/MM/YYYY";

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form
          style={{
            marginTop: 5,
            display: "flex",
            width: "82%",
          }}
        >
          <Form.Item label={t("labels.model")} style={{ width: "33.33%" }}>
            <Select
              disabled={!isDisableInput}
              defaultValue={"Mapa 1"}
              options={[{ value: "Mapa 1" }]}
            />
          </Form.Item>
          <Form.Item
            label={t("labels.date")}
            style={{ width: "36.33%", margin: "0 7px 0 7px" }}
          >
            <RangePicker format={weekFormat} />
          </Form.Item>
          <Form.Item label={t("labels.name")} style={{ width: "33.33%" }}>
            <Input defaultValue={"Mapa 1"} disabled={isDisableInput} />
          </Form.Item>
        </Form>
        <div
          style={{
            marginTop: 5,
            display: "flex",
            width: "15%",
            justifyContent: "space-between",
          }}
        >
          <Tooltip title={t("labels.newModel")}>
            <Button icon={<FileAddOutlined />} type="primary"></Button>
          </Tooltip>
          <Tooltip title={t("labels.edit")}>
            <Button
              onClick={handleDisableInput}
              icon={<EditOutlined />}
              type="primary"
            ></Button>
          </Tooltip>
          <Tooltip title={t("labels.save")}>
            <Button icon={<SaveOutlined />} type="primary"></Button>
          </Tooltip>
          <Tooltip title={t("labels.delete")}>
            <Button icon={<CloseOutlined />} type="primary"></Button>
          </Tooltip>
        </div>
      </div>
      <Table
        scroll={{ y: 400, x: "auto" }}
        style={{ height: 470 }}
        pagination={false}
        dataSource={data}
        columns={columns}
      />
    </>
  );
};

export default PlanningMap;

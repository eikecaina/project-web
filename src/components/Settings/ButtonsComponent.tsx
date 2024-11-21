import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Select,
  Tooltip,
} from "antd";
import { useTranslation } from "react-i18next";
import React, { FormEventHandler, MouseEventHandler, useState } from "react";

const { Option } = Select;

interface RadioValue {
  value: number;
  onChange?: (e: RadioChangeEvent) => void;
  type?: string;
  style?: React.CSSProperties;
  typeOfDatas?: any;
}

interface Buttons {
  onChange?: FormEventHandler;
  onClick?: MouseEventHandler;
}
const buttonStyle: React.CSSProperties = {
  marginRight: 5,
};

export const DeleteButton: React.FC<Buttons> = ({
  onChange: onChange,
  onClick: onClick,
}) => {
  const { t } = useTranslation("layout");
  return (
    <Tooltip title={t("generalButtons.deleteButton")}>
      <Button
        onChange={onChange}
        onClick={onClick}
        style={buttonStyle}
        type="primary"
        icon={<DeleteOutlined />}
      >
        {t("generalButtons.deleteButton")}
      </Button>
    </Tooltip>
  );
};

export const SaveButton: React.FC<Buttons> = ({
  onChange: onChange,
  onClick: onClick,
}) => {
  const { t } = useTranslation("layout");
  return (
    <Tooltip title={t("generalButtons.saveButton")}>
      <Button
        htmlType="submit"
        onChange={onChange}
        onClick={onClick}
        style={buttonStyle}
        type="primary"
        icon={<SaveOutlined />}
      >
        {t("generalButtons.saveButton")}
      </Button>
    </Tooltip>
  );
};

export const EditButton: React.FC<Buttons> = ({
  onChange: onChange,
  onClick: onClick,
}) => {
  const { t } = useTranslation("layout");
  return (
    <Tooltip title={t("generalButtons.editButton")}>
      <Button
        onChange={onChange}
        onClick={onClick}
        style={buttonStyle}
        type="primary"
        icon={<EditOutlined />}
      >
        {t("generalButtons.editButton")}
      </Button>
    </Tooltip>
  );
};

export const NewButton: React.FC<Buttons> = ({
  onChange: onChange,
  onClick: onClick,
}) => {
  const { t } = useTranslation("layout");
  return (
    <Tooltip title={t("generalButtons.newButton")}>
      <Button
        onChange={onChange}
        onClick={onClick}
        style={buttonStyle}
        type="primary"
        icon={<PlusOutlined />}
      >
        {t("generalButtons.newButton")}
      </Button>
    </Tooltip>
  );
};

export const RadioButtons: React.FC<RadioValue> = ({
  value: value,
  onChange: onChange,
}) => {
  const { t } = useTranslation("layout");
  return (
    <Radio.Group
      disabled
      value={value}
      onChange={onChange}
      defaultValue={1}
      optionType="button"
      buttonStyle="solid"
      style={{ marginBottom: 10 }}
    >
      <Radio value={1}>{t("generalButtons.newButton")}</Radio>
      <Radio value={2}>{t("generalButtons.editButton")}</Radio>
    </Radio.Group>
  );
};

export const SelectRadio: React.FC<RadioValue> = ({
  value: value,
  type: type,
  style: style,
  typeOfDatas: typeOfDatas,
}) => {
  return (
    <>
      {value === 1 ? (
        <>
          <Form.Item label={type} style={style}>
            <Select disabled />
          </Form.Item>
        </>
      ) : null}
      {value === 2 ? (
        <>
          <Form.Item label={type} style={style}>
            <Select>
              {typeOfDatas.map((type: any) => (
                <Option key={type.id} value={type.id}>
                  {type.group}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      ) : null}
    </>
  );
};

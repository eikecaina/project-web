import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Radio,
  Row,
  Space,
} from "antd";
import CustomInputNumber from "components/CustomInputNumber";
import React, { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useTranslation } from "react-i18next";

export const ItemConfigModal: React.FC = () => {
  const [disabelInput, setDisabelInput] = useState(1);
  const [repMaterial, setRepMaterial] = useState(false);
  const { t } = useTranslation("layout");
  return (
    <Card style={{ height: "100%", minHeight: 420 }} bodyStyle={{ padding: 0 }}>
      <Divider orientation="left">{t("titles.itensConfig")}</Divider>
      <div style={{ padding: 10 }}>
        <Radio.Group
          onChange={(e) => setDisabelInput(e.target.value)}
          value={disabelInput}
        >
          <Space direction="vertical" style={{ marginBottom: 20 }}>
            <Radio value={1}>{t("labels.cerificate")}</Radio>
            <Radio value={2}>
              {t("labels.aproved")}
              <CustomInputNumber
                disabled={disabelInput === 1}
                min={0}
                maxLength={3}
                style={{ width: 50, margin: "0 10px" }}
              />
            </Radio>
          </Space>
        </Radio.Group>
        <Form layout="vertical">
          <Form.Item label={t("labels.claim")}>
            <CustomInputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label={t("labels.newMaterial")}>
            <CustomInputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label={
              <Checkbox
                checked={repMaterial}
                onChange={(e) => setRepMaterial(e.target.checked)}
              >
              {t("labels.repetition")}
              </Checkbox>
            }
          >
            <CustomInputNumber
              disabled={!repMaterial}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export const DeliveryModal: React.FC = () => {
  const listDates = () => {
    const datasExample = [
      { data: "24/02/2024", peça: 1 },
      { data: "22/04/2024", peça: 3 },
      { data: "21/07/2024", peça: 6 },
      { data: "26/09/2024", peça: 7 },
      { data: "28/01/2024", peça: 8 },
      { data: "21/07/2024", peça: 3 },
      { data: "21/07/2024", peça: 2 },
      { data: "22/07/2024", peça: 4 },
      { data: "23/07/2024", peça: 1 },
      { data: "25/07/2024", peça: 10 },
    ];

    return (
      <ul style={{ listStyle: "none", padding: 0, margin: 0, height: 180 }}>
        {datasExample.map((item, index) => (
          <li
            style={{
              marginBottom: 3,
              background: index % 2 === 0 ? "white" : "#f0f0f0",
              padding: 2,
            }}
            key={index}
          >
            {item.data + " - " + item.peça + " peças"}
          </li>
        ))}
      </ul>
    );
  };

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  dayjs.extend(customParseFormat);

  const { t } = useTranslation("layout");

  return (
    <Card style={{ height: "100%", minHeight: 420 }} bodyStyle={{ padding: 0 }}>
      <Divider orientation="left">{t("titles.deliveries")}</Divider>
      <div style={{ padding: 10 }}>
        <Form.Item label={t("labels.delivery")}>
          <DatePicker
            style={{ width: "100%" }}
            defaultValue={dayjs("00/00/0000", dateFormatList[0])}
            format={dateFormatList}
          />
        </Form.Item>
        <Form.Item
          label={t("labels.quantity")}
        >
          <CustomInputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Row style={{ justifyContent: "space-evenly" }}>
          <Button
            type="primary"
            style={{
              width: "40%",
            }}
          >
            {t("generalButtons.saveButton")}
          </Button>
          <Button
            style={{
              width: "40%",
            }}
            type="primary"
          >
            {t("generalButtons.cleanButton")}
          </Button>
        </Row>
        <Checkbox style={{ marginTop: 10 }}>{t("labels.lastPart")}</Checkbox>
        <div
          style={{
            marginTop: 15,
            overflowY: "auto",
            height: "100%",
            maxHeight: 147,
            maxWidth: "100%",
          }}
        >
          {listDates()}
        </div>
      </div>
    </Card>
  );
};

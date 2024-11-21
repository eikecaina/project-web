import React, { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input,
  List,
  MenuProps,
  Radio,
  Row,
  Select,
  Space,
  Tree,
} from "antd";

  
import { ExclamationCircleOutlined, FlagOutlined } from "@ant-design/icons";
import CustomInputNumber from "components/CustomInputNumber";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const PcpData: React.FC = () => {
  const [editForm, setEditForm] = useState(true);

  const editPcpForm = () => {
    setEditForm(!editForm);
  };

  const { t } = useTranslation("layout");

  const onMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const items = [
    {
      key: "1",
      label: t("labels.recalculateAll"),
    },
  ];

  return (
    <Row gutter={6}>
      <Col span={8}>
        <Card
          bodyStyle={{ padding: 0 }}
          style={{
            height: "100%",
            borderTop: "none",
            maxHeight: 714,
            padding: 0,
            width: "100%",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          
          <>
            <Divider orientation="left">{t("titles.details")}</Divider>
            <div
              style={{
                overflowY: "auto",
                height: "100%",
                maxHeight: 387,
                padding: 10,
              }}
            >
              <Form layout="vertical">
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(33.33% - 8px)",
                  }}
                  label={t("labels.salesOrder")}
                  colon={false}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(33.33% - 8px)",
                    margin: "0 8px",
                  }}
                  label={t("labels.itemSo")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(33.33% - 8px)",
                  }}
                  label={t("labels.itemFert")}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                  label={
                    <span
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t("labels.claimPlanning")}
                    </span>
                  }
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                  }}
                  label={
                    <span
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t("labels.productionOrder")}
                    </span>
                  }
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                  label={t("labels.power")}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                  }}
                  label={t("labels.voltage")}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ margin: "0 8px 20px 0px" }}
                  label={t("labels.observation")}
                >
                  <TextArea
                    placeholder="Digite suas observações aqui"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </Form.Item>
              </Form>
            </div>
            <div
              style={{
                margin: 15,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Form.Item colon={false} label={t("labels.inspection")}>
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary">{t("generalButtons.saveButton")}</Button>
              </Form.Item>
            </div>
          </>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          bodyStyle={{ padding: 0 }}
          style={{
            borderTop: "none",
            padding: 0,
            width: "100%",
            height: "100%",
            maxHeight: 714,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          
        </Card>
      </Col>
      <Col span={8}>
        <Card
          bodyStyle={{ padding: 0 }}
          style={{
            width: "100%",
            borderTop: "none",
            height: "100%",
            maxHeight: 714,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <>
            <Divider orientation="left">{t("titles.planning")}</Divider>
            <Form style={{ margin: 15 }}>
              <Radio.Group defaultValue={1}>
                <Space direction="vertical" style={{ marginBottom: 15 }}>
                  <Radio value={1} disabled={editForm}>
                    {t("labels.automatic")}
                  </Radio>
                  <Radio value={2} disabled={editForm}>
                    {t("labels.manual")}
                  </Radio>
                </Space>
              </Radio.Group>

              <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                  label={t("labels.start")}
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    defaultValue={dayjs("00/00/0000", dateFormatList[0])}
                    format={dateFormatList[0]}
                    disabled={editForm}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                  }}
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    defaultValue={dayjs("00/00/0000", dateFormatList[0])}
                    format={dateFormatList[0]}
                    disabled={editForm}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item
                label={t("labels.duration")}
                style={{ display: "inline-block", width: "calc(60% - 8px)" }}
              >
                <CustomInputNumber
                  value={1102}
                  disabled={editForm}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(40% - 8px)",
                  margin: "0 8px",
                }}
              >
                <Select value={"Minutos"} disabled={editForm} />
              </Form.Item>
              <Form.Item
                label={t("labels.resource")}
                style={{ display: "inline-block", width: "calc(100% - 8px)" }}
              >
                <Input
                  value={"TS - Elétrico - Rodrigo (lauffer)"}
                  disabled={editForm}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Form>
          </>
          
        </Card>
      </Col>
    </Row>
  );
};

export default PcpData;

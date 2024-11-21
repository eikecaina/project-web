"use client";
import { Button, Card, Col, Divider, Row } from "antd";
import { FloatMenu, GeneralData } from "./ItensConfig";
import Resume from "./Resume";
import { useTranslation } from "react-i18next";

const Quotation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={10} style={{ height: "100%" }}>
      <Col span={10}>
        <Card style={{ height: "100%" }} bodyStyle={{ padding: 0 }}>
          <Divider orientation="left">{t("titles.itensConfig")}</Divider>
          <GeneralData />
          <FloatMenu />
        </Card>
      </Col>
      <Col span={14}>
        <div style={{ overflowY: "auto", width: "100%", height: "100%" }}>
          <Resume />
        </div>
      </Col>
    </Row>
  );
};

export default Quotation;

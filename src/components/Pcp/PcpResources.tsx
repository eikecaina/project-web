import { Button, Card, Col, DatePicker, Form, Row, Select } from "antd";


import { useTranslation } from "react-i18next";
import { FilterFilled } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const PcpResources: React.FC = () => {
  const { t } = useTranslation("layout");
  const dateFormat = "DD/MM/YYYY";

  return (
    <Row>
      <Col span={24}>
        <Form style={{ display: "flex", marginTop: "8px" }}>
          <Form.Item
            label={t("labels.group")}
            style={{ display: "inline-block", width: "30%" }}
          >
            <Select
              options={[
                { value: "Todos" },
                { value: "Transformador a Seco" },
                { value: "Transformador de Distribuição" },
                { value: "Transformador de Meia Força" },
              ]}
              defaultValue={"Todos"}
            />
          </Form.Item>

          <Form.Item
            label={t("labels.resource")}
            style={{
              display: "inline-block",
              width: "30%",
              margin: "0 5px 0 5px",
            }}
          >
            <Select
              mode="multiple"
              defaultValue={"TS - Elétrico - Ruan NÃO USAR"}
              options={[
                { value: "TS - Elétrico - Ruan NÃO USAR" },
                { value: "TS - Elétrico - Rodrigo" },
                { value: "TS - Mecânico - Bruna" },
                { value: "TS - Mecânico - Lucas" },
                { value: "TS - Bobinagem - Vanessa" },
                { value: "TS - Montagem - Felipe" },
                { value: "TS - Elétrico - Isabela" },
                { value: "TS - Mecânico - André" },
                { value: "TS - Bobinagem - João" },
              ]}
            />
          </Form.Item>
          <Form.Item
            style={{ display: "inline-block", width: "30%" }}
            label="Data"
          >
            <RangePicker format={dateFormat} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{ display: "inline-block", width: "6%", marginLeft: 8 }}
          >
            <Button type="primary" icon={<FilterFilled />}>
              {t("generalButtons.filterButton")}
            </Button>
          </Form.Item>
        </Form>

          <Col style={{ height: 580, marginTop: 100 }}>
        
          </Col>
        
      </Col>
    </Row>
  );
};

export default PcpResources;

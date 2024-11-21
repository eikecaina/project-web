import { Card, Tabs, TabsProps } from "antd";
import { Cotacao, Detalhado, Resumido } from "./ResumeData";
import { useTranslation } from "react-i18next";

const Resume: React.FC = () => {
  const { t } = useTranslation("layout");
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("generalButtons.quotationButton"),
      children: <Cotacao />,
    },
    {
      key: "2",
      label: t("generalButtons.resumeButton"),
      children: <Resumido />,
    },
    {
      key: "3",
      label: t("generalButtons.detailsButton"),
      children: <Detalhado />,
    },
  ];

  return (
    <Card bodyStyle={{ padding: 0 }} style={{ height: "100%" }}>
      <Tabs
      
        tabBarStyle={{ padding: "0 0 0 15px", margin: 0 }}
        tabBarGutter={20}
        type="line"
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          margin: 0,
        }}
        defaultActiveKey="1"
        items={items}
      />
    </Card>
  );
};

export default Resume;

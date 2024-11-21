import React from "react";
import { Tabs } from "antd";
import { TabsProps } from "antd";
import PcpData from "./PcpData";
import PcpProcessResources from "./PcpProcessResources";
import { useTranslation } from "react-i18next";
import Reports from "./PcpReports";
import PcpResources from "./PcpResources";

const PcpPage: React.FC = () => {
  const { t } = useTranslation("layout");
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("generalButtons.dataButton"),
      children: <PcpData />,
    },
    {
      key: "2",
      label: t("generalButtons.processResourcesButton"),
      children: <PcpProcessResources />,
    },
    {
      key: "3",
      label: t("generalButtons.reportsButton"),
      children: <Reports />,
    },
    {
      key: "4",
      label: t("generalButtons.consolidatedresourcesButton"),
      children: <PcpResources/>,
    },
  ];

  return (
    <Tabs tabBarStyle={{ margin: 0 }} defaultActiveKey="1" items={items} />
  );
};

export default PcpPage;

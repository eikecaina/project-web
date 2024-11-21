import { Tabs, TabsProps } from "antd";
import { CalendarSettings } from "./CalendarSettings";
import GroupSettings from "./GroupSettings";
import CharacteristicsSettings from "./CharacteristicsSettings";
import ValueSettings from "./ValueSettings";
import ProcessSettings from "./ProcessSettings";
import ResourceSettings from "./ResourceSettings";
import { CriticalMaterials } from "./CriticalMaterials";
import { Connections } from "./Connections";
import SubResource from "./Subresource";
import { useTranslation } from "react-i18next";
import FamilySettings from "./FamilySettings";

const GeneralSettings: React.FC = () => {
  const { t } = useTranslation("layout");

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("generalButtons.groupButton"),
      children: <GroupSettings />,
    },
    {
      key: "2",
      label: t("generalButtons.familiesButton"),
      children: <FamilySettings />,
    },
    {
      key: "3",
      label: t("generalButtons.characteristicsButton"),
      children: <CharacteristicsSettings />,
    },
    {
      key: "4",
      label: t("generalButtons.valuesButton"),
      children: <ValueSettings />,
    },
    {
      key: "5",
      label: t("generalButtons.calendarsButton"),
      children: <CalendarSettings />,
    },
    {
      key: "6",
      label: t("generalButtons.processesButton"),
      children: <ProcessSettings />,
    },
    {
      key: "7",
      label: t("generalButtons.connectionsButton"),
      children: <Connections />,
    },
    {
      key: "8",
      label: t("generalButtons.resourcesButton"),
      children: <ResourceSettings />,
    },
    {
      key: "9",
      label: t("generalButtons.subResourcesButton"),
      children: <SubResource />,
    },
    {
      key: "10",
      label: t("generalButtons.criticalMaterialsButton"),
      children: <CriticalMaterials />,
    },
  
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default GeneralSettings;
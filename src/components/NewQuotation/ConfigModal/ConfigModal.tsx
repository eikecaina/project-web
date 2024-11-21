import { Col, Modal, Row, message } from "antd";
import { DeliveryModal, ItemConfigModal } from "./ItemConfigModal";
import { useTranslation } from "react-i18next";

interface ConfigModalProps {
  setIsModalConfigOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ setIsModalConfigOpen }) => {
  const handleCancel = () => {
    setIsModalConfigOpen(false);
  };

  const handleOk = () => {
    setIsModalConfigOpen(false);
  };
  const { t } = useTranslation("layout");
  return (
    <Modal
      title={t("titles.config")}
      open={true}
      onCancel={handleCancel}
      onOk={handleOk}
      width={990}
      okText={t("generalButtons.confirmButton")}
      cancelText={t("generalButtons.cancelButton")}
    >
      <Row gutter={10}>
        <Col span={12} style={{ height: "100%" }}>
          <ItemConfigModal />
        </Col>
        <Col span={12} style={{ height: "100%" }}>
          <DeliveryModal />
        </Col>
      </Row>
    </Modal>
  );
};

export default ConfigModal;

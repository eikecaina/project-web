"use client";
import * as React from "react";

import { Button, Result } from "antd";
// import { useTranslation } from "next-i18next";
import { useTranslation } from "react-i18next";

import * as Styled from "./styled";

export const UnauthorizedPage: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);

  return (
    <Styled.Wrapper>
      <Result
        status="403"
        title="403"
        subTitle={t("unauthorized.message")}
        extra={
          <Button type="primary" onClick={() => setVisible(true)}>
            {t("unauthorized.button")}
          </Button>
        }
      />
    </Styled.Wrapper>
  );
};

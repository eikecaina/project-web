"use client";

import * as React from "react";
import * as Styled from "./styled";
import AuthStatus from "./authStatus";
import LanguageChanger from "./LanguageChanger";
import { useSession } from "next-auth/react";
import { Spin } from "antd";

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const siteName = process.env.SITE_NAME;
  const {data: session, status} = useSession();

  return (
    <Styled.Wrapper className={className}>
      {status != "loading" && <>
      <Styled.Content>
        <img src="/assets/images/WEGLogo.png" alt="WEGLogo" />
        <Styled.Title>{siteName}</Styled.Title>
        <AuthStatus />
      </Styled.Content>
      <LanguageChanger />
      </>}
    </Styled.Wrapper>
  );
};

"use client";
import * as React from "react";

import { Spin } from "antd";
import { Footer } from "../Footer";

import * as Styled from "./styled";
import { withHOCs } from "hocs/withHOCs";
import { withTheme } from "hocs/withTheme";
import { useSession } from "next-auth/react";

const BaseLayout: React.FC<any> = ({ children }) => {
  const {data: session, status} = useSession();
  return (
  <Styled.Wrapper>
      <Styled.PlacedHeader />
      {/* <Styled.PlacedSider /> */}
      <Styled.ContentWrapper>
        <React.Suspense fallback={
            <Styled.SpinnerWrapper>
              <Spin />
            </Styled.SpinnerWrapper>
          }>
          {status == "loading" && <>
            <Styled.SpinnerWrapper>
              <Spin />
            </Styled.SpinnerWrapper>
          </>}
          {status != "loading" && <>
            <div>{children}</div>
          </>}
        </React.Suspense>
        <Footer />
      </Styled.ContentWrapper>
    </Styled.Wrapper>
  )
};

export default withHOCs(withTheme)(BaseLayout);
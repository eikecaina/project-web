import { useTranslation } from "react-i18next";

import * as Styled from "./styled";

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  // const { t } = useTranslation("layout");

  const siteName = process.env.SITE_NAME + ' - ' + process.env.APP_ENV?.toUpperCase();
  // const siteName = "WTPC"

  return (
    <Styled.Wrapper className={className}>
      {/* {t("footer.copyright", { siteName })} */}
    </Styled.Wrapper>
  );
};

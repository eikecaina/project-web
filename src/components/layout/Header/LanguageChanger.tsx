'use client';

import * as Styled from "./styled";

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, MenuProps, Select, Skeleton, Space } from "antd";
import { Suspense, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import i18nConfig from "../../../../i18nConfig";
import Loader from "../loader/Loader";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { BrazilIcon, USIcon, SpainIcon } from "@/locales/flags/FlagsIcons";

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const currentPathname: any = usePathname();
  const [currentLocale, setCurrentLocale] = useState(currentPathname.slice(1,6));

  const ChangeRoute = (newLocale: string, currentPath: string)=>{
    router.push('/' + newLocale + currentPath);
    setCurrentLocale(newLocale)
    i18n.changeLanguage(newLocale)
    setLoading(false)
  }
  const isInLangList = (locale: string)=>{
    let found = i18nConfig.locales.find( k => k == locale)
    return found
  }
  let [cookie, setCookie, removeCookie] =useCookies(["NEXT_LOCALE"]);
  let cookieLocale = isInLangList(cookie.NEXT_LOCALE)
  
  if(!isInLangList(currentLocale) && cookieLocale != undefined){
    setLoading(true)
    ChangeRoute(cookieLocale, currentPathname) 
  } else if(!isInLangList(currentLocale) && i18nConfig.defaultLocale!=undefined){
    setLoading(true)
    ChangeRoute(i18nConfig.defaultLocale, currentPathname) 
  }
  

  const handleChange = (e: string) => {
    // setLoading(true)
    const newLocale = e
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;
    let path = currentPathname.replace(`/${currentLocale}`, `/`)
    ChangeRoute(newLocale, path)
  };

  const items: MenuProps['items'] = [
    {
      key: 'pt-BR',
      icon: <BrazilIcon />,
      label: 'Português',
    },
    {
      key: 'en-US',
      icon: <USIcon />,
      label: 'English',
    },
    {
      key: 'es-ES',
      icon: <SpainIcon />,
      label: 'Español',
    },
  ];

  return (
    <Styled.LanguageChangerWrapper>
      <Suspense fallback={<Loader visible />}>
        <Select
            onChange={handleChange}
            style={{ width: 140 }}
            loading={loading}
            options={[{ value: 'pt-BR', emoji: <BrazilIcon />, label: 'Português' },
            { value: 'en-US', emoji: <USIcon />, label: 'Inglês' },
            { value: 'es-ES', emoji: <SpainIcon />, label: 'Espanhol' }]}
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.data.label}>
                  {option.data.emoji}
                </span>
                {option.data.label}
              </Space>
            )}
            value={currentLocale}
          />
      </Suspense>
     </Styled.LanguageChangerWrapper>
  );
}


import i18nConfig from '@/../i18nConfig';
// import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense, lazy, useState } from 'react';
import { dir } from 'i18next';
import Layout from './[locale]'
import { Skeleton } from 'antd';
import Loader from '@/components/layout/loader/Loader';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "WTPC",
    description: 'Generated by create next app'
};

//Definição para as rotas dinâmicas -- pasta [locale] definida
export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
    children,
    params: { locale }
  }: {
    children: ReactNode;
    params: { locale: string };
  }) {
    return (
        <html lang={locale} >
            <body className={inter.className}>
                <Suspense fallback={<Loader visible />}>
                  {/* Comentário abaixo é necessário para typescript quando componente é assíncrono - https://github.com/vercel/next.js/issues/42292  */}
                  {/* @ts-expect-error Server Component */}
                  <Layout
                  params={{locale: locale}}
                  children={children}
                  ></Layout>
                </Suspense>
            </body>
        </html>
    );
}





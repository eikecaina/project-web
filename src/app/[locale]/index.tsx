import { ReactNode, Suspense, useEffect, useState } from 'react';
import SessionProviderWrapper from '@/lib/utils/sessionProviderWrapper';
import BaseLayout from '@/components/layout/BaseLayout';
import Loader from '@/components/layout/loader/Loader';
import initTranslations from '../i18n';
import TranslationsProvider from '@/lib/utils/translationsProvider';

const i18nNamespaces = ['layout'];

async function Layout({
    children,
    params: { locale }
  }: {
    children: ReactNode;
    params: { locale: string };
  }) {
    const {t, resources} = await initTranslations(locale, i18nNamespaces)
    
    return (                            
                <SessionProviderWrapper>
                <TranslationsProvider
                    namespaces={i18nNamespaces}
                    locale={locale}
                    resources={resources}>
                    <BaseLayout>
                        <Suspense fallback={<Loader visible />}>
                            {children}
                        </Suspense>
                    </BaseLayout>
                </TranslationsProvider>
                </SessionProviderWrapper>
    );
}
  

export default Layout;
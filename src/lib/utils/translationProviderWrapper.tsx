import React, { ReactNode } from "react";
import TranslationsProvider from "./translationsProvider";
import initTranslations from "@/app/i18n";

const i18nNamespaces = ['layout', 'common'];

async function TranslationProviderWrapper({ params: { locale, children } }: { params: { locale: string, children: ReactNode } }) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);
    return (
        <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}>
            <main>{children}</main>
        </TranslationsProvider>
    )
}

export default TranslationProviderWrapper;
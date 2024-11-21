# Boilerplate WMO Next.js

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting-started)

## 🧐 About

Este é o projeto base (boilerplate) de desenvolvimento de aplicações web criado pela Seção de Otimização e Automatização de Processos (SOAP) do Departamento de Pesquisa e Desenvolvimento de Produto da WMO.

Este projeto tem como objetivo providenciar uma estrutura inicial padronizada e com estruturas comuns nas aplicações já configuradas e/ou desenvolvidas. Com ele pretendemos agilizar o processo inicial de novos desenvolvimentos, além de manter algumas boas práticas de organização, segurança, etc. para também manter uma certa similaridade entre projetos, dessa forma faciliando o compartilhamento de conhecimento e mão-de-obra.

Recursos incluídos neste repositório:

- [Typescript](https://www.typescriptlang.org/): superset do JavaScript com tipagem estática, completamente opcional, porém recomendado.
- [React](https://reactjs.org/): biblioteca de desenvolvimento de interface web em componentes através do JavaScript;
- [Next.js](https://nextjs.org/): framework desenvolvido em cima do React com vários recursos comuns integrados, incluindo possibilidade de renderização em servidor e desenvolvimento de APIs;
- [Ant Design](https://ant.design/): biblioteca de interfaces React com vários componentes complexos comuns já estilizados;
- Layout padrão: com recursos básicos integrados e expansíveis;
- Autenticação: utilizando o AD da WEG, com login automático por cookies JWT de tempo limitado;
- Navegação: por rotas em URL;
- i18n: etrutura de localização por tradução de chaves;
- CI/CD: deploy automatizado para ambientes de QA e produção para frontend e APIs.

## 🏁 Getting Started

### Instalação

Para instalar as bibliotecas da aplicação basta rodar o seguinte comando na pasta do projeto:

```
npm install
```

OBS: Algumas das bibliotecas que utilizamos dentro deste e outros projetos estão localizadas somente dentro do registro de pacotes interno da WEG, por isso é necessário configurar a variável de ambiente `NPM_TOKEN` no seu sistema para que seja possível acessar estes pacotes. Este procedimento só precisa ser executado uma vez, sendo que este token pessoal já será utilizado para todas as aplicações que seguem este padrão.

#### Adquirindo o token npm

Para adiquirir um token de acesso o procedimento é bem simples:

1. Execute o seguinte comando na aplicação de prompt de sua preferência:

```sh
npm login --registry=https://nexus3.weg.net/repository/npm-group/
```

2. Preencha os dados requisitados nos prompts (login, senha, e email WEG);
3. Navegue até a pasta `$HOME` do seu sistema (tipicamente `C:\Users\<seu login>`) e encontre um arquivo `.npmrc`;
4. Abra este aquivo em um editor de texto, e veja que nele há uma linha similar a esta:

```
//nexus3.weg.net/repository/npm-group/:_authToken=<seu token npm>
```

5. Adicione este valor a uma variável de ambiente (`NPM_TOKEN`) para o seu usuário em sua máquina.

### Rodando a aplicação

Antes de rodar a aplicação pela primeira vez você precisa criar um arquivo chamado `.env` na pasta raiz do projeto, nele você colocará quaisquer configurações de variáves de ambiente que a aplicação precisa para funcionar. Em produção estas variáveis de ambiente serão determinadas pela configuração do projeto no GitLab. Este arquivo não deve ser commitado junto ao código pois pode conter informações sigilosas de segurança.

Como referência criamos o arquivo `example.env` com a única variável que a aplicação base precisa inicialmente o `TOKEN_KEY`, uma chave que segura o cookie que utilizamos para autenticação, pode ser qualquer string, sugerimos gerar aleatóriamente (por exemplo: [aqui](https://www.uuidgenerator.net/)) e trocar com certa frequência.

Criamos alguns comandos para rodar a aplicação tanto em desenvolvimento quanto em produção:

- `npm run dev`: roda a aplicação com _refresh_ automático na alteração de qualquer parte do código. Abra seu browser de preferência na url `localhost:3000` para visualizar a interface;
- `npm run build`: compila a aplicação para uma versão final otimizada, utilizado durante o deploy;
- `npm start`: roda a aplicação compilada pelo comando aterior, útil para testar a velocidade da aplicação como em produção, já que o sistema em `dev` é bem mais lento;
- `npm run format`: formata todos os arquivos do repositório segundo o padrão setado em `.prettierrc`, recomendamos instalar a extensão `Prettier` no VSCode se estiver utilizando, para formatar autimaticamente os arquivos ao fazer alterações;
- `npm run check-types`: busca por qualquer erro de tipagem estática, caso esteja usando o Typescript. Se seu editor de texto tiver integração com a linguagem, já mostrará os erros diretamente na interface.
- `npm run commit`: roda a CLI do `commitzen`, que gera uma mensagem de commit formatada interativamente. O uso é opcional.

## Recursos

### Navegação

Para navegação utilizamos a estrutura fornecida pelo Next.js ([referência](https://nextjs.org/docs/routing/introduction)).

Cada arquivo na pasta `src/pages` representa uma rota (URL), para criar uma nova página é só criar um novo arquivo ou pasta dentro desta pasta.

Um exemplo de arquivo inicial está disponível em `examples/page.tsx`.

Para adicionar um item no menu lateral, você deve adicionar sua configuração ao arquivo `src/configs/nav.tsx` seguindo o padrão já existente. A tradução do item deve ser registrado no arquivo de tradução `layout.json`.

### Traduções

O controle de traduções é feito utilizando o padrão `i18n` ([referência](https://www.i18next.com/)).

Na pasta `public/locales` temos uma pasta para cada língua com múltiplos arquivos de tradução, é daqui que todas as traduções de cada língua serão determinadas.

Um exemplo de utilização está disponível em `examples/Component/index.ts`.

Você pode carregar estes arquivos dinâmica (carregado quando necessário) ou estaticamente (carregado junto com a página na hora do _build_). Para carregar estaticamente você deve adicionar o nome do arquivo na chamada da função `getServerSideTranslations` da sua página (exemplo em `examples/page.tsx`), os outros arquivos serão carregados dinâmicamente.

Na parte superior direita da página há um seletor de língua padrão, este componente está localizado em `src/components/layout/Header/LanguageChanger.tsx`.

Para configurar mais línguas:

1. Adicionar o nome da língua (exemplo `zh-CN` para a língua chinesa) ao arquivo `next.config.js` na pasta raiz do projeto (`i18n.locales`);
2. Adicionar um arquivo `.png` da bandeira do país, com o mesmo nome da língua, à pasta `public/assets/langFlags`. Você pode encontrar elas [aqui](https://github.com/hampusborgos/country-flags/tree/main/png100px);
3. Criar uma pasta, com o mesmo nome da língua, na pasta `public/locales`, contendo os arquivos de tradução.

### Autenticação

O processo de autenticação utiliza o AD da WEG para validar a identidade do usuário, este processo foi abstraído a um microserviço externo ao projeto criado pela equipe. Junto com a API criamos a biblioteca `@wmo-dev/login-utils`, que utiliza desse serviço e oferece algumas utilidades ao `React`.

Dentro da pasta `src/api/auth` criamos três rotas de autenticação, `login`, `logout` e `token`, através delas que o frontend se comunica com o serviço de login. Qualquer necessidade extra no processo de login é dado nestas rotas.

Em específico na rota de `login` é onde podemos registrar novos "claims" dentro do token de acesso que o sistema grava nos cookies do navegador. Por padrão o serviço retorna o seguinte JSON:

```json
{
  "username": "login do usuário",
  "name": "nome completo do usuário",
  "role": "user"
}
```

A biblioteca `@wmo-dev/login-utils` providencia uma função chamada `createLoginHandler` onde você pode criar seu próprio _handler_ de login, onde você conseguirá alterar estas _claims_ (trocar o `role` por exemplo) e adicionar outras referentes à sua aplicação.

```javascript
import { createLoginHandler } from "@wmo-dev/login-utils/handlers";

const login = createLoginHandler(async (info) => {
  // Aqui poderíamos buscar o role do usuário em uma base de dados
  const role = await getRole(info.username);

  return { ...info, role };
});
```

No lado do frontend, a biblioteca providencia dois utilitários, um _hook_ onde é possível acessar os _claims_ do login (`useAuth`), e um _high order component_ que envolve um componente, limitando a visualização dele dependendo das configurações de autenticação.

```javascript
import { useAuth } from "@wmo-dev/login-utils";
const { user } = useAuth();
```

```javascript
import { withAuth } from "@wmo-dev/login-utils";
const ComponenteProtegido = withAuth({
  fallback: () => <span>Não Autorizado</span>,
  // roles: ["admin"] // caso só alguns roles tenham acesso
})(Componente);
```

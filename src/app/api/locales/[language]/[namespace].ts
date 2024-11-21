import { NextApiHandler } from "next";

function removeExtension(namespace: string) {
  return namespace.split(".")[0];
}

async function fetchTranslations(language: string, namespace: string) {
  // Fetch some dynamic translations here

  if (namespace === "dynamic") {
    return {
      teste: language === "pt-BR" ? "Teste" : "Test",
    };
  }

  return {};
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const language = req.query.language as string;
  const namespace = removeExtension(req.query.namespace as string);

  const translations = await fetchTranslations(language, namespace);

  return res.json(translations);
};

export default handler;

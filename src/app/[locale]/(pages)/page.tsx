import Quotation from "@/components/NewQuotation/Quotation";
import { GetDataFromId, Save } from "@/app/api/services/Example/data";

async function Home() {
  let res = await GetDataFromId(1);
  let save = await Save();
  console.log(
    "-------------------------------- TESTE DA API ----------------------------"
  );
  console.log(res);
  console.log(save);
  console.log(
    "--------------------------------------------------------------------------"
  );
  return (
      <Quotation />
  );
  //Quando não precisar mais da referência -- Voltar ao return abaixo
  //  return <Quotation/>;
}

export default Home;

import { List, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const Cotacao: React.FC = () => {
  const data = [
    "-283 [24/10/2023] [24/10/2023] TS - PROD Ensaios (1 dia)",
    "-274 [02/11/2023] [02/11/2023] 1 peça(s) liberada(s) para embarque",
  ];

  return (
    <List
      dataSource={data}
      style={{
        height: "100%",
        overflowY: "auto",
        maxHeight: "720px",
        width: "100%",
      }}
      size="small"
      renderItem={(item, index) => (
        <List.Item
          style={{ background: index % 2 === 0 ? "white" : "#f0f0f0" }}
        >
          <Typography.Text mark>[DIAS]</Typography.Text> {item}
        </List.Item>
      )}
    />
  );
};

export const Resumido: React.FC = () => {
  const data = [
    "-365 [03/08/2023] [03/08/2023] TS - CONT Avaliação da Adm. Contratos (1 dia)",
    "-364 [04/08/2023] [04/08/2023] TS - PCP Planejar PCP (1 dia)",
    "-361 [07/08/2023] [21/08/2023] TS - SUP Compra materiais da LT Final (15 dias)",
    "-291 [16/10/2023] [16/10/2023] TS - PROD Bobinagem AT (32400 segundos)",
    "-290 [17/10/2023] [17/10/2023] TS - PROD Impregnação (1 dia)",
    "-289 [18/10/2023] [18/10/2023] TS - PROD Montagem de Núcleo (31800 segundos)",
    "-288 [19/10/2023] [20/10/2023] TS - PROD Montagem de Parte Ativa (31020 segundos)",
    "-284 [23/10/2023] [23/10/2023] TS - PROD Montagem Final (1 dia)",
    "-283 [24/10/2023] [24/10/2023] TS - PROD Ensaios (1 dia)",
    "-282 [25/10/2023] [25/10/2023] TS - PROD Liberar (1 dia)",
    "-281 [26/10/2023] [01/11/2023] TS - PROD Tempo de Espera (5 dias)",
    "-274 [02/11/2023] [02/11/2023] 1 peça(s) liberada(s) para embarque",
    "-273 [03/11/2023] [03/11/2023] TS - QC Inspeção final (1 dia)",
    "-272 [06/11/2023] [06/11/2023] TS - LOG Planejamento de embarque (1 dia)",
    "-270 [07/11/2023] [08/11/2023] TS - LOG Embalagem (2 dias)",
    "-268 [09/11/2023] [09/11/2023] TS - LOG Carregamento (1 dia)",
    "-267 [10/11/2023] [10/11/2023] TS - LOG Documentação de embarque (1 dia)",
    "-266 [13/11/2023] [13/11/2023] TS - FIN Faturamento (1 dia)",
    "-265 [14/11/2023] [14/11/2023] TS - QC Inspeção pós-embarque (1 dia)",
    "-264 [15/11/2023] [15/11/2023] TS - SUP Verificação de materiais (1 dia)",
    "-263 [16/11/2023] [16/11/2023] TS - ENG Revisão de projeto (1 dia)",
    "-262 [17/11/2023] [17/11/2023] TS - PROD Preparação de documentos (1 dia)",
    "-261 [20/11/2023] [20/11/2023] TS - SUP Solicitação de novos materiais (1 dia)",
    "-260 [21/11/2023] [21/11/2023] TS - SUP Aprovação de fornecedores (1 dia)",
    "-259 [22/11/2023] [22/11/2023] TS - PCP Ajuste no cronograma (1 dia)",
    "-258 [23/11/2023] [23/11/2023] TS - ENG Validação final (1 dia)",
  ];

  return (
    <List
      dataSource={data}
      style={{
        height: "100%",
        overflowY: "auto",
        maxHeight: "720px",
        width: "100%",
      }}
      size="small"
      renderItem={(item, index) => (
        <List.Item
          style={{ background: index % 2 === 0 ? "white" : "#f0f0f0" }}
        >
          <Typography.Text mark>[DIAS]</Typography.Text> {item}
        </List.Item>
      )}
    />
  );
};

export const Detalhado: React.FC = () => {
  const data = [
    "-366 [02/08/2023]",
    "-365 [03/08/2023] TS - CONT Avaliação da Adm. Contratos (1 dia)",
    "-364 [04/08/2023] TS - PCP Planejar PCP (1 dia)",
    "-363 [05/08/2023] Sábado",
    "-362 [06/08/2023] Domingo",
    "-361 [07/08/2023] TS - SUP Compra materiais da LT Final (15 dias)",
    "-360 [08/08/2023]",
    "-359 [09/08/2023]",
    "-358 [10/08/2023]",
    "-357 [11/08/2023]",
    "-356 [12/08/2023] Sábado",
    "-355 [13/08/2023] Domingo",
    "-354 [14/08/2023]",
    "-353 [15/08/2023]",
    "-352 [16/08/2023]",
    "-351 [17/08/2023]",
    "-350 [18/08/2023]",
    "-349 [19/08/2023] Sábado",
    "-348 [20/08/2023] Domingo",
    "-347 [21/08/2023]",
    "-346 [22/08/2023]",
    "-345 [23/08/2023]",
    "-344 [24/08/2023]",
    "-343 [25/08/2023]",
    "-342 [26/08/2023] Sábado",
    "-341 [27/08/2023] Domingo",
    "-340 [28/08/2023]",
    "-339 [29/08/2023]",
    "-338 [30/08/2023]",
    "-337 [31/08/2023]",
    "-336 [01/09/2023]",
    "-335 [02/09/2023] Sábado",
    "-334 [03/09/2023] Domingo",
    "-333 [04/09/2023]",
    "-332 [05/09/2023]",
    "-331 [06/09/2023]",
    "-330 [07/09/2023]",
    "-329 [08/09/2023]",
    "-328 [09/09/2023] Sábado",
    "-327 [10/09/2023] Domingo",
    "-326 [11/09/2023]",
    "-325 [12/09/2023]",
    "-324 [13/09/2023]",
    "-323 [14/09/2023]",
    "-322 [15/09/2023]",
    "-321 [16/09/2023] Sábado",
    "-320 [17/09/2023] Domingo",
    "-319 [18/09/2023]",
    "-318 [19/09/2023]",
    "-317 [20/09/2023]",
    "-316 [21/09/2023]",
    "-315 [22/09/2023]",
    "-314 [23/09/2023] Sábado",
    "-313 [24/09/2023] Domingo",
    "-312 [25/09/2023]",
    "-311 [26/09/2023]",
    "-310 [27/09/2023]",
    "-309 [28/09/2023]",
    "-308 [29/09/2023]",
    "-307 [30/09/2023] Sábado",
    "-306 [01/10/2023] Domingo",
    "-305 [02/10/2023]",
    "-304 [03/10/2023]",
    "-303 [04/10/2023]",
    "-302 [05/10/2023]",
    "-301 [06/10/2023]",
    "-300 [07/10/2023] Sábado",
    "-299 [08/10/2023] Domingo",
    "-298 [09/10/2023]",
    "-297 [10/10/2023]",
    "-296 [11/10/2023]",
    "-295 [12/10/2023]",
    "-294 [13/10/2023]",
    "-293 [14/10/2023] Sábado",
    "-292 [15/10/2023] Domingo",
    "-291 [16/10/2023] TS - PROD Bobinagem AT (32400 segundos)",
    "-290 [17/10/2023] TS - PROD Impregnação (1 dia)",
    "-289 [18/10/2023] TS - PROD Montagem de Núcleo (31800 segundos)",
    "-288 [19/10/2023] TS - PROD Montagem de Parte Ativa (31020 segundos)",
    "-287 [20/10/2023]",
    "-286 [21/10/2023] Sábado",
    "-285 [22/10/2023] Domingo",
    "-284 [23/10/2023] TS - PROD Montagem Final (1 dia)",
    "-283 [24/10/2023] TS - PROD Ensaios (1 dia)",
    "-282 [25/10/2023] TS - PROD Liberar (1 dia)",
    "-281 [26/10/2023] TS - PROD Tempo de Espera (5 dias)",
    "-280 [27/10/2023]",
    "-279 [28/10/2023] Sábado",
    "-278 [29/10/2023] Domingo",
    "-277 [30/10/2023]",
    "-276 [31/10/2023]",
    "-275 [01/11/2023]",
    "-274 [02/11/2023] 1 peça(s) liberada(s) para embarque",
  ];

  return (
    <List
      dataSource={data}
      style={{
        height: "100%",
        overflowY: "auto",
        maxHeight: "720px",
        width: "100%",
      }}
      size="small"
      renderItem={(item, index) => (
        <List.Item
          style={{ background: index % 2 === 0 ? "white" : "#f0f0f0" }}
        >
          <Typography.Text mark>[DATA]</Typography.Text> {item}
        </List.Item>
      )}
    />
  );
};

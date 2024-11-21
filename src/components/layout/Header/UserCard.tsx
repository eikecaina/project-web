import { Avatar, Dropdown, MenuProps, Space } from "antd";

import * as Styled from "./styled";
import { keycloakSessionLogOut } from "./authStatus";
import {useSession, signIn, signOut} from "next-auth/react"
import { Session } from "next-auth";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { useState } from "react";

export interface Props {
  className?: string;
  user?: any
}

export const UserCard: React.FC<Props> = ({ className = "", user = {}}) => {
  const { t } = useTranslation();
  let [cookie, setCookie, removeCookie] = useCookies(["PLANT"]);
  let itemsChildren:any = []
  let selectedKeys:string[] = [];
  let initial1=''
  let initial2=''
  let qtyRoles = 0;

  if(!!user){
    const names = user.user?.name?.split(" ")
    initial1 = names[0]?.substring(0, 1)
    initial2 = names[names.length-1].substring(0, 1)
    let roles = user.roles;

    qtyRoles = roles.length;

    if(qtyRoles>1){
      //loop pra cada grupo de acesso que o usuário possui (cadastrado no Developers Portal)
      roles.forEach( (k: string) => {
        //se o nome do grupo de acesso possui "-" no texto
        if(k.includes("-")){
          //extrai os 4 últimos dígitos que deveriam ser os números da planta
          let plantOption = k.substring( k.length-4, k.length )

          if(!itemsChildren.find((e:any) => e.key === "plant"+plantOption)){
            itemsChildren.push({
              label: (<div>{plantOption}</div>),
              key: "plant"+plantOption.trim(),
              onClick: ()=>changeCurrentPlant(plantOption.trim())
            })
          }
        }
      })
    }
  }

  if(itemsChildren.length > 0 && cookie!=null && cookie!=undefined){
    let found = itemsChildren.find((e:any) => e.key === cookie.PLANT)

    if(found){
      selectedKeys = [found.key];
    } else {
      selectedKeys = [itemsChildren[0].key];
      document.cookie = `PLANT=${itemsChildren[0].key};`;
    }
    
  }

  let currentPlant = selectedKeys.length == 0 ? "":(t("userCard.plant")+": "+ selectedKeys[0].substring( selectedKeys[0].length-4, selectedKeys[0].length )).toString()

  const [plant, setPlant] = useState(currentPlant)
  
  const PlantGroup = (qtyRoles<=1)? {
    label: (plant),
    key: "currentPlant"
  } : {
    label: plant,
    key: "currentPlant",
    children: (itemsChildren)
  }

  function changeCurrentPlant(newPlant: string){
    selectedKeys = ["plant"+newPlant];
    document.cookie = `PLANT=${"plant"+newPlant};`;
    setPlant((t("userCard.plant")+": "+ newPlant))
  }

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        selectable: true,
        defaultSelectedKeys: selectedKeys,
        items: [
          PlantGroup,          
          {
            type: "divider"
          },
          {
            label: (<div>{t("userCard.menus.logout")}</div>),
            // label:"Teste de click",
            key: "logout",
            icon: <UserOutlined />,
            danger: true,
            onClick: () => {keycloakSessionLogOut().then(() => signOut({callbackUrl: "/"}))}
          },
        ],
      }}
    >
      <Styled.UserCardWrapper className={className}>
          <Space>
            <Avatar>{initial1}{initial2}</Avatar>
            {user?.given_name}
            <DownOutlined />
          </Space>
      </Styled.UserCardWrapper>
    </Dropdown>
  );
};

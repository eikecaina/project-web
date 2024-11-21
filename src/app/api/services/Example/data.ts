// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
const api = axios.create({
  headers: { 'Content-Type': 'text/plain', 'Accept': 'Application/json; charset=UTF-8' },
  baseURL: '//jsonplaceholder.typicode.com',
  // baseURL: '//localhost:3000/',
  // baseURL: '//dcqas012168.weg.net:3255/',
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    //database
  const body = req.body;  
  console.log(body);
  res.status(204).send(null);
}

export async function GetAllData() {
  try {
    return await api.get(`/todos`).then(r => {
      return r.data
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function GetDataFromId(id: number) {
  try {
    return await api.get(`/todos/${id}`).then(res => {
      return res.data
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function GetDataCommmentsForId(id: number, formData: any) {
  try {
    return await api.get(`/todos/${id}/comments`).then(res => {
      return res.data
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function GetDataCommentsWithFilterParam(id: number, formData: any) {
  try {
    console.log(id)
    console.log(formData)
    let res = { success: true}
    let postId = 1;
    let email = "Jayne_Kuhic@sydney.com";
    fetch(`https://jsonplaceholder.typicode.com/todos/1/comments?postId=${postId}`)
    .then(response => response.json())
    .then(json => {console.log(json); res = json;})

    // await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    return res;
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save() {
  try {
    let data = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    }

    let config = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }

    return await api.post(`/posts`, data, config).then(res => {
      return res.data
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Update(id: number, formData: any) {
  try {
    let res = { success: true}
    let id = 1
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
      .then(json => {console.log(json); res = json;})

    // await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    return res;
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Delete() {
  try {
    let res = { success: true}
    let id = 1
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });

    // await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    return res;
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

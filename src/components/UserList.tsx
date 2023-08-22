"use client";

import instance from "@/app/libs/axios";
import { useQuery } from "@tanstack/react-query";

const getData = async () =>
  (await instance.get("http://localhost:3000/api/user")).data;

export default function UserList() {
  const { data } = useQuery([], getData);

  return (
    <>
      {data?.map((v) => (
        <div key={v.email}>{v.name}</div>
      ))}
    </>
  );
}

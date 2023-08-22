"use client";

import instance from "@/app/libs/axios";
import { useQuery } from "@tanstack/react-query";

const getData = async () => (await instance.get("/user")).data;

export default function UserList() {
  const { data } = useQuery([], getData);

  return (
    <>
      {data?.map((v: any) => (
        <div key={v.email}>{v.name}</div>
      ))}
    </>
  );
}

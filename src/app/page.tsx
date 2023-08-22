import Button from "@/components/Button";
import UserList from "@/components/UserList";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello
      <UserList />
      <Button />
    </main>
  );
}

import { getSession } from "@/lib/auth";
import { Header } from "./header";

export default async function Default() {
  const user = await getSession();
  return <Header userName={user.name} />;
}

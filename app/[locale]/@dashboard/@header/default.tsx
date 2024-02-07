import { getCurrentUser } from "@/data/auth";
import { Header } from "./header";

export default async function Default() {
  const user = await getCurrentUser();
  return <Header userName={user.name} />;
}

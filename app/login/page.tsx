import FormLogin from "@/components/FormLogin";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  _params: any,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Login | Aeroxee Blog",
    description: "Halaman login akun aeroxee blog",
  };
}

export default function Login() {
  return <FormLogin />;
}

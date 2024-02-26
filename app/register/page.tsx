import FormRegister from "@/components/FormRegister";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  _params: any,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Register | Aeroxee Blog",
    description: "Halaman pendaftaran akun aeroxee blog",
  };
}

export default function Register() {
  return <FormRegister />;
}

import Layout1 from "@/components/common/Layout1";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TrySlug() {
  const router = useRouter();

  console.log(router.query);
  return (
    <Layout1>
      <pre>{JSON.stringify(router.query, null, 4)}</pre>
    </Layout1>
  );
}

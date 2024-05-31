import Layout1 from "@/components/common/Layout1";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TryRouter() {
  const router = useRouter();

  console.log(router.query);
  return (
    <Layout1>
      <div>
        <Link href="?a=1">a=1</Link>
      </div>
      <div>
        <Link href="?a=10">a=10</Link>
      </div>
      <div>
        <Link href="?a=100">a=100</Link>
      </div>
    </Layout1>
  );
}

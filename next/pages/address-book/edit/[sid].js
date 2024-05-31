import Head from "next/head";
import Layout1 from "@/components/common/Layout1";
import AbEditForm from "@/components/ab-edit-form";
import { useRouter } from "next/router";

export default function AbEdit() {
  const router = useRouter();
  return (
    <Layout1 pageName="ab-edit">
      <Head>
        <title>{router.query.sid} 修改通訊錄</title>
      </Head>
      <AbEditForm sid={router.query.sid} />

    </Layout1>
  );
}

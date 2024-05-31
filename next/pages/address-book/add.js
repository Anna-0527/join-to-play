import Head from "next/head";
import Layout1 from "@/components/common/Layout1";
import AbAddForm from "@/components/ab-add-form";

export default function AbAdd() {

  return (
    <Layout1 pageName="ab-add">
      <Head>
        <title>新增通訊錄</title>
      </Head>
      <AbAddForm />

    </Layout1>
  );
}

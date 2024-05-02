export const dynamic = "force-dynamic";

import Editor from "@/components/editor";
import { getDocument } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";

const Page = async ({
  params,
}: {
  params: {
    documentId: string;
  };
}) => {
  const { data: document, error } = await getDocument(params.documentId);

  if (error || !document.length) {
    redirect("/dashboard");
  }

  return <Editor initialContent={document[0].data || ""} />;
};

export default Page;

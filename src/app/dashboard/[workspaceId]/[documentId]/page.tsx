export const dynamic = "force-dynamic";

import Editor from "@/components/editor";
import { getDocument, updateDocument } from "@/lib/supabase/queries";
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

  return (
    <div className="md:max-w-3xl lg:max-w-4xl mx-auto h-full">
      <Editor
        initialContent={document[0].data || ""}
        documentId={params.documentId}
      />
    </div>
  );
};

export default Page;

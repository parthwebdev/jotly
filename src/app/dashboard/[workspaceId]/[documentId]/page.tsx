export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

import { getDocument } from "@/lib/supabase/queries";
import Banner from "@/components/banner";
import Toolbar from "@/components/toolbar";
import Editor from "@/components/editor";
import TrashBanner from "@/components/trash-banner";

const Page = async ({
  params,
}: {
  params: {
    workspaceId: string;
    documentId: string;
  };
}) => {
  const { data: document, error } = await getDocument(params.documentId);

  if (error || !document.length) {
    redirect("/dashboard");
  }

  return (
    <>
      <TrashBanner
        documentId={document[0].id}
        workspaceId={params.workspaceId}
      />
      <Banner workspaceId={params.workspaceId} documentId={params.documentId} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto h-full">
        <Toolbar initialData={document[0]} />
        <Editor
          initialContent={document[0].data || ""}
          documentId={params.documentId}
        />
      </div>
    </>
  );
};

export default Page;

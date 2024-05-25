export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

import { getDocument } from "@/lib/supabase/queries";
import Banner from "@/components/banner";
import Toolbar from "@/components/toolbar";
import Editor from "@/components/editor";

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
    <div>
      <Banner />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto h-full">
        <Toolbar initialData={document[0]} />
        <Editor
          initialContent={document[0].data || ""}
          documentId={params.documentId}
        />
      </div>
    </div>
  );
};

export default Page;

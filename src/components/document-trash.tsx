"use client";

import { SelectDocument } from "@/lib/supabase/schema";
import { Button } from "./ui/button";

const DocumentTrash = ({ document }: { document: SelectDocument }) => {
  const onRestore = () => {};

  const onDelete = () => {};

  return (
    <>
      {
        <article className="py-2 z-40 bg-[#EB5757] flex  md:flex-row flex-col justify-center items-center gap-4 flex-wrap">
          <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
            <span className="text-white">This document is in the trash.</span>
            <Button
              size="sm"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#EB5757]"
              onClick={onRestore}
            >
              Restore
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white
             hover:text-[#EB5757]"
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </article>
      }
    </>
  );
};
export default DocumentTrash;

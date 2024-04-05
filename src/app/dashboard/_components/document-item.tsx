import { ChevronRight, Plus } from "lucide-react";

import { SelectDocument } from "@/lib/supabase/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface DocumentItemProps {
  document: SelectDocument;
  onExpand: (documentId: string) => void;
  level: number;
}

const DocumentItem = ({ document, onExpand, level = 0 }: DocumentItemProps) => {
  return (
    <div
      key={document.id}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className="py-1 pr-3 flex items-center hover:bg-primary/10"
    >
      <div
        role="button"
        className="h-full rounded-sm hover:bg-muted mr-1"
        onClick={() => onExpand(document.id)}
      >
        <ChevronRight className="size-[18px] text-muted-foreground/60" />
      </div>

      <div className="mr-2">{document.icon}</div>
      <span className="text-muted-foreground">{document.title}</span>

      <div
        role="button"
        className="h-full p-[1px] ml-auto rounded-sm hover:bg-muted mr-1"
      >
        <Plus className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default DocumentItem;

DocumentItem.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

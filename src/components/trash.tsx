import CustomDialogTrigger from "./custom-dialog-trigger";
import TrashBox from "./trash-box";

const Trash = ({
  workspaceId,
  children,
}: {
  children: React.ReactNode;
  workspaceId: string;
}) => {
  return (
    <CustomDialogTrigger
      header="Trash"
      content={<TrashBox workspaceId={workspaceId} />}
      className="w-full"
    >
      {children}
    </CustomDialogTrigger>
  );
};
export default Trash;

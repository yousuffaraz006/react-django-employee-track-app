import { useContext } from "react";
import CommonForm from "../common-form";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { ContextComponent } from "@/context";

function CommonDialog({
  showDialog,
  setShowDialog,
  title,
  formControls,
  formData,
  handleSubmit,
  btnText,
}) {
  const { setCurrentEditId } = useContext(ContextComponent);
  return (
    <Dialog
      open={showDialog}
      onOpenChange={() => {
        setShowDialog(false);
        formData.reset();
        setCurrentEditId(null);
      }}
    >
      <DialogContent className="sm:max-w-screen h-[450px] overflow-auto">
        <DialogTitle>{title}</DialogTitle>
        <div>
          <CommonForm
            formControls={formControls}
            formData={formData}
            handleSubmit={handleSubmit}
            btnText={btnText}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CommonDialog;

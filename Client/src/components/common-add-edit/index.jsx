import { addNewEmployeeFormControls } from "@/config";
import { ContextComponent } from "@/context";
import { useContext } from "react";
import CommonDialog from "../common-dialog";

function CommonAddEdit({ handleSubmit }) {
  const { employeeFormData, showDialog, setShowDialog, currentEditId } =
    useContext(ContextComponent);
  return (
    <CommonDialog
      formControls={addNewEmployeeFormControls}
      formData={employeeFormData}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      title={currentEditId ? "Edit Employee" : "Add New Employees"}
      btnText={currentEditId ? "Save" : "Add"}
      handleSubmit={handleSubmit}
    />
  );
}

export default CommonAddEdit;

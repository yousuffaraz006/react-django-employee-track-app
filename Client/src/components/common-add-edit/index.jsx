import { addNewEmployeeFormControls } from "@/config";
import { ContextComponent } from "@/context";
import { useContext } from "react";
import CommonDialog from "../common-dialog";

function CommonAddEdit({ handleSubmit }) {
  const { showDialog, setShowDialog, currentEditId, currentDeleteId } =
    useContext(ContextComponent);
  return (
    <CommonDialog
      formControls={currentDeleteId ? [] : addNewEmployeeFormControls}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      title={currentEditId ? "Edit Employee" : currentDeleteId ? "Delete Employee" : "Add Employee"}
      btnText={currentEditId ? "Save" : currentDeleteId ? "Delete" : "Add"}
      handleSubmit={handleSubmit}
    />
  );
}

export default CommonAddEdit;

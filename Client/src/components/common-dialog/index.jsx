import { useContext } from "react";
import CommonForm from "../common-form";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { ContextComponent } from "@/context";
import CommonButton from "../common-button";
import api from "@/api";

function CommonDialog({
  showDialog,
  setShowDialog,
  title,
  formControls,
  handleSubmit,
  btnText,
}) {
  const {
    setFullname,
    setEmail,
    setPhone,
    setSalary,
    setDepartment,
    setEmployeesList,
    setCurrentEditId,
    currentDeleteId,
    setCurrentDeleteId,
    toast,
  } = useContext(ContextComponent);
  const getEmployee = () => {
    api
      .get("/employees/")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        const plural = data.length > 1 ? "s" : "";
        if (data?.length > 0 ? true : false) {
          setEmployeesList(data);
          console.log(data.length + ` Employee${plural} fetched successfully.`);
        } else {
          console.log("You have no employees yet.");
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "" + err,
          variant: "failure",
        });
      });
  };
  const deleteEmployee = () => {
    api
      .delete(`/employee/delete/${currentDeleteId}/`)
      .then((res) => {
        if (res.status === 204) {
          toast({
            title: "Employee deleted successfully",
          });
          setEmployeesList([]);
          setShowDialog(false);
          getEmployee();
        } else {
          toast({
            title: "Error",
            description: "Employee not deleted : " + res.status,
            variant: "failure",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "" + err,
          variant: "failure",
        });
      });
  };
  return (
    <Dialog
      open={showDialog}
      onOpenChange={() => {
        setShowDialog(false);
        setCurrentEditId(null);
        setCurrentDeleteId(null);
        setFullname("");
        setEmail("");
        setPhone("");
        setSalary("");
        setDepartment("");
      }}
    >
      <DialogContent className="sm:max-w-screen h-[450px] overflow-auto">
        <DialogTitle>{title}</DialogTitle>
        <div>
            <CommonForm
              formControls={formControls}
              handleSubmit={handleSubmit}
              btnText={btnText}
            />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CommonDialog;

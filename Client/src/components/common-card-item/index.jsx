import { useContext } from "react";
import CommonButton from "../common-button";
import CommonEmployeeCard from "../common-employee-card";
import { ContextComponent } from "@/context";

function CommonCardItem({ employee, deleteEmployee }) {
  const { setShowDialog, setCurrentEditId, employeeFormData } = useContext(ContextComponent);
  return (
    <CommonEmployeeCard
      fullname={employee.fullname}
      email={employee.email}
      phone={employee.phone}
      department={employee.department}
      salary={employee.salary}
      footerContent={
        <div className="w-full flex justify-between items-center">
          <CommonButton
            buttonText={"Edit"}
            onClick={() => {
              setShowDialog(true);
              setCurrentEditId(employee?.id);
              employeeFormData.setValue("fullname", employee?.fullname);
              employeeFormData.setValue("email", employee?.email);
              employeeFormData.setValue("phone", employee?.phone);
              employeeFormData.setValue("department", employee?.department);
              employeeFormData.setValue("salary", employee?.salary);
            }}
          />
          <CommonButton
            buttonText={"Delete"}
            onClick={() => deleteEmployee(employee.id)}
          />
        </div>
      }
    />
  );
}

export default CommonCardItem;

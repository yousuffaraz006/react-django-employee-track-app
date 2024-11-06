import { useContext } from "react";
import CommonButton from "../common-button";
import CommonEmployeeCard from "../common-employee-card";
import { ContextComponent } from "@/context";

function CommonCardItem({ employee, deleteEmployee }) {
  const { setShowDialog, setCurrentEditId, employeeFormData, navigate } = useContext(ContextComponent);
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
              navigate(`/detail/${employee.id}`)
              setCurrentEditId(employee?.id);
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

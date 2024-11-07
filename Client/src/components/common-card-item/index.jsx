import { useContext } from "react";
import CommonButton from "../common-button";
import CommonEmployeeCard from "../common-employee-card";
import { ContextComponent } from "@/context";
import { ACCESS_TOKEN } from "@/constants";
import axios from "axios";

function CommonCardItem({ employee }) {
  const {
    setFullname,
    setEmail,
    setPhone,
    setSalary,
    setDepartment,
    setShowDialog,
    setCurrentEditId,
    setCurrentDeleteId,
  } = useContext(ContextComponent);
  const fetchEmployeeDetail = async () => {
    try {
      const apiResponse = await axios.get(
        `http://127.0.0.1:8000/employee/detail/${employee.id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        }
      );
      setFullname(apiResponse.data.fullname);
      setEmail(apiResponse.data.email);
      setPhone(apiResponse.data.phone);
      setSalary(apiResponse.data.salary);
      setDepartment(apiResponse.data.department);
      setCurrentEditId(apiResponse.data.id);
    } catch (error) {
      console.log(error);
    }
  };
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
              fetchEmployeeDetail();
              setCurrentEditId(employee?.id);
              setShowDialog(true);
            }}
          />
          <CommonButton
            buttonText={"Delete"}
            onClick={() => {
              setCurrentDeleteId(employee?.id);
              setShowDialog(true);
            }}
          />
        </div>
      }
    />
  );
}

export default CommonCardItem;

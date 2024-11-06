import api from "@/api";
import CommonEmployeeForm from "@/components/common-form";
import Header from "@/components/common-header";
import { addNewEmployeeFormControls } from "@/config";
import { ACCESS_TOKEN } from "@/constants";
import { ContextComponent } from "@/context";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

function DetailPage() {
  const {
    setFullname,
    fullname,
    setEmail,
    email,
    setPhone,
    phone,
    setSalary,
    salary,
    setDepartment,
    department,
    currentEditId,
    setCurrentEditId,
    toast,
    navigate,
  } = useContext(ContextComponent);
  const { pk } = useParams();
  const fetchEmployeeDetail = async () => {
    try {
      const apiResponse = await axios.get(
        `http://127.0.0.1:8000/employee/detail/${pk}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        }
      );
      console.log(apiResponse.data);
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
  useEffect(() => {
    console.log(pk);
    fetchEmployeeDetail();
  }, [pk]);
  const updateEmployee = (e) => {
    e.preventDefault();
    api
      .put(`/employee/detail/${currentEditId}/`, {
        fullname,
        email,
        phone,
        salary,
        department,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 204) {
          // Check for both 200 and 204
          toast({
            title: "Employee updated successfully",
          });
          navigate("/")
          setFullname("");
          setEmail("");
          setPhone("");
          setSalary("");
          setDepartment("");
        } else {
          toast({
            title: "Error",
            description: "Employee not updated: " + res.status,
            variant: "failure",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: String(err),
          variant: "failure",
        });
      });
  };
  return (
    <div className="px-5">
      <Header />
      <div>Detail Page</div>
      <CommonEmployeeForm
        formControls={addNewEmployeeFormControls}
        btnText={"Save"}
        handleSubmit={updateEmployee}
      />
    </div>
  );
}

export default DetailPage;

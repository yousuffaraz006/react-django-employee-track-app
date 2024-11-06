import CommonEmployeeForm from "@/components/common-form";
import Header from "@/components/common-header";
import { addNewEmployeeFormControls } from "@/config";
import { ACCESS_TOKEN } from "@/constants";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function DetailPage() {
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
      console.log(apiResponse.data)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    console.log(pk);
    fetchEmployeeDetail();
  }, [pk]);
  const updateEmployee = (e, employeeId) => {
    e.preventDefault();
    setLoading(true);
    api
      .put(`/employee/update/${employeeId}/`, {
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
          getEmployee();
          setLoading(false);
          setShowDialog(false);
        } else {
          toast({
            title: "Error",
            description: "Employee not updated: " + res.status,
            variant: "failure",
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: String(err),
          variant: "failure",
        });
        setLoading(false);
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

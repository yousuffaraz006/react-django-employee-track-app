import api from "@/api";
import CommonAddEdit from "@/components/common-add-edit";
import CommonButton from "@/components/common-button";
import CommonCardItem from "@/components/common-card-item";
import Header from "@/components/common-header";
import { Skeleton } from "@/components/ui/skeleton";
import { ContextComponent } from "@/context";
import { useContext, useEffect } from "react";

function HomePage() {
  const {
    toast,
    loading,
    setLoading,
    employeesList,
    setEmployeesList,
    setShowDialog,
    currentEditId,
    setCurrentEditId,
    currentDeleteId,
    setCurrentDeleteId,
    fullname,
    setFullname,
    email,
    setEmail,
    phone,
    setPhone,
    salary,
    setSalary,
    department,
    setDepartment,
  } = useContext(ContextComponent);
  useEffect(() => {
    setLoading(true);
    getEmployee();
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <Skeleton
        className={`w-full h-screen  rounded-[6px] bg-black opacity-50`}
      />
    );
  }
  const getEmployee = () => {
    setLoading(true);
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
          setLoading(false);
        } else {
          console.log("You have no employees yet.");
          setLoading(false);
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "" + err,
          variant: "failure",
        });
        setLoading(false);
      });
  };
  const createEmployee = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post("/employees/", {
        fullname,
        email,
        phone,
        salary,
        department,
      })
      .then((res) => {
        if (res.status === 201) {
          toast({
            title: "Employee created successfully",
          });
          setFullname("");
          setEmail("");
          setPhone("");
          setSalary("");
          setDepartment("");
          getEmployee();
          setLoading(false);
          setShowDialog(false);
        } else {
          toast({
            title: "Error",
            description: "Employee not created : " + res.status,
            variant: "failure",
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "" + err,
          variant: "failure",
        });
        setLoading(false);
      });
  };
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
          toast({
            title: "Employee updated successfully",
          });
          setFullname("");
          setEmail("");
          setPhone("");
          setSalary("");
          setDepartment("");
          setCurrentEditId("");
          setShowDialog(false);
          getEmployee();
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
  const deleteEmployee = () => {
    setLoading(true);
    api
      .delete(`/employee/delete/${currentDeleteId}/`)
      .then((res) => {
        if (res.status === 204) {
          toast({
            title: "Employee deleted successfully",
          });
          setEmployeesList([]);
          getEmployee();
          setLoading(false);
          setCurrentDeleteId("");
          setShowDialog(false);
        } else {
          toast({
            title: "Error",
            description: "Employee not deleted : " + res.status,
            variant: "failure",
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "" + err,
          variant: "failure",
        });
        setLoading(false);
      });
  };
  function handleSubmit(e) {
    if (currentEditId) {
      updateEmployee(e);
    }
    else if (currentDeleteId) {
      deleteEmployee(e);
    }
    else {
      createEmployee(e);
    }
  }
  return (
    <div className="px-5">
      <Header />
      <div className="mt-5 flex flex-col">
        <div>
          <CommonButton
            buttonText={"Add Employees"}
            onClick={() => setShowDialog(true)}
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3">
          {employeesList?.length > 0 ? (
            employeesList?.map((employee) => (
              <CommonCardItem key={employee.id} employee={employee} deleteEmployee={deleteEmployee} />
            ))
          ) : (
            <h3>You have no employees.</h3>
          )}
        </div>
        <CommonAddEdit handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
}

export default HomePage;

//  ###  Added BASE CODE FILE
import { useToast } from "@/hooks/use-toast";
import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const ContextComponent = createContext(null);
function ProviderComponent({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);            //   ### Added Base Code
  const [loading, setLoading] = useState("");                     //   ### Added Base Code
  const [firstname, setFirstname] = useState("");                //   ### Added Base Code
  const [lastname, setLastname] = useState("");                   //   ### Added Base Code
  const [username, setUsername] = useState("");                   //   ### Added Base Code
  const [password, setPassword] = useState("");                  //   ### Added Base Code
  const [employeesList, setEmployeesList] = useState([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("");
  const [currentEditId, setCurrentEditId] = useState(null);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();                                    //   ### Added Base Code
  const navigate = useNavigate();                                  //   ### Added Base Code
  const formData = useForm({                                       //   ### Added Base Code
    defaultValues: {                                                 //   ### Added Base Code
      firstname: "",                                                  //   ### Added Base Code
      lastname: "",                                                 //   ### Added Base Code
      username: "",                                                 //   ### Added Base Code
      password: "",                                                 //   ### Added Base Code
      fullname: "",                                                 //   ### Added Base Code
      email: "",                                                  //   ### Added Base Code
      phone: "",                                                  //   ### Added Base Code
      salary: "",                                                 //   ### Added Base Code
      department: "",                                                 //   ### Added Base Code
    },                                                  //   ### Added Base Code
  });                                                 //   ### Added Base Code
  return (                                                //   ### Added Base Code
    <ContextComponent.Provider                                                //   ### Added Base Code
      value={{                                                //   ### Added Base Code
        isAuthorized,                                               //   ### Added Base Code
        setIsAuthorized,                                           //   ### Added Base Code
        loading,                                                //   ### Added Base Code
        setLoading,                                               //   ### Added Base Code
        toast,                                                    //   ### Added Base Code
        navigate,                                                   //   ### Added Base Code
        firstname,                                                //   ### Added Base Code
        setFirstname,                                               //   ### Added Base Code
        lastname,                                               //   ### Added Base Code
        setLastname,                                                //   ### Added Base Code
        username,                                               //   ### Added Base Code
        setUsername,                                                //   ### Added Base Code
        password,                                               //   ### Added Base Code
        setPassword,                                                //   ### Added Base Code
        formData,                                               //   ### Added Base Code
        employeesList,
        setEmployeesList,
        fullname,
        setFullname,
        email,
        setEmail,
        department,
        setDepartment,
        salary,
        setSalary,
        phone,
        setPhone,
        currentEditId,
        setCurrentEditId,
        currentDeleteId,
        setCurrentDeleteId,
        showDialog,
        setShowDialog,
      }}                                                            //   ### Added Base Code
    >
      {children}
    </ContextComponent.Provider>                                     //   ### Added Base Code
  );                                                            //   ### Added Base Code
}                                                           //   ### Added Base Code

export default ProviderComponent;                              //   ### Added Base Code
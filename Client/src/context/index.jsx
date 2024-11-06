import { useToast } from "@/hooks/use-toast";
import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const ContextComponent = createContext(null);
function ProviderComponent({ children }) {
  const [loading, setLoading] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employeesList, setEmployeesList] = useState([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("");
  const [currentEditId, setCurrentEditId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const authFormData = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const employeeFormData = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      salary: "",
      department: "",
    },
  });
  return (
    <ContextComponent.Provider
      value={{
        loading,
        setLoading,
        firstname,
        setFirstname,
        lastname,
        setLastname,
        username,
        setUsername,
        password,
        setPassword,
        authFormData,
        employeeFormData,
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
        showDialog,
        setShowDialog,
        toast,
        navigate,
      }}
    >
      {children}
    </ContextComponent.Provider>
  );
}

export default ProviderComponent;
import { ContextComponent } from "@/context";
import CommonButton from "../common-button";
import LoadingIndicator from "../common-loader";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useContext, useEffect } from "react";

function CommonForm({ formControls = [], formData, btnText, handleSubmit }) {
  const {
    loading,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    username,
    setUsername,
    password,
    setPassword,
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
    currentEditId,
  } = useContext(ContextComponent);
  // const setValue = (label) => {
  //   label === "First Name"
  //     ? firstname
  //     : label === "Last Name"
  //     ? lastname
  //     : label === "Email"
  //     ? username
  //     : label === "Password"
  //     ? password
  //     : label === "Full Name"
  //     ? fullname
  //     : label === "Email "
  //     ? email
  //     : label === "Phone"
  //     ? phone
  //     : label === "Salary"
  //     ? salary
  //     : label === "Department"
  //     ? department
  //     : null;
  // };
  const setValue = (label) => {
    if (formData) {
      return formData[label]; // Assuming your formData keys match the label.
    }
    return label === "First Name"
      ? firstname
      : label === "Last Name"
      ? lastname
      : label === "Email"
      ? username
      : label === "Password"
      ? password
      : label === "Full Name"
      ? fullname
      : label === "Email "
      ? email
      : label === "Phone"
      ? phone
      : label === "Salary"
      ? salary
      : label === "Department"
      ? department
      : null;
  };
  const setState = (label, value) => {
    console.log(label, value);
    label === "First Name"
      ? setFirstname(value)
      : label === "Last Name"
      ? setLastname(value)
      : label === "Email"
      ? setUsername(value)
      : label === "Password"
      ? setPassword(value)
      : label === "Full Name"
      ? setFullname(value)
      : label === "Email "
      ? setEmail(value)
      : label === "Phone"
      ? setPhone(value)
      : label === "Salary"
      ? setSalary(value)
      : label === "Department"
      ? setDepartment(value)
      : null;
  };
  useEffect(() => {
    if (formData) {
      setFirstname(formData.firstname || "");
      setLastname(formData.lastname || "");
      setUsername(formData.username || "");
      setPassword(formData.password || "");
      setFullname(formData.fullname || "");
      setEmail(formData.email || "");
      setPhone(formData.phone || "");
      setSalary(formData.salary || "");
      setDepartment(formData.department || "");
    }
  }, [formData]);
  const inputStyles =
    "w-full rounded h-[50px] border-none text-black bg-gray-200 text-[16px] outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:bg-gray-100 focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0";
  return (
    <Form {...formData}>
      <form onSubmit={handleSubmit}>
        {formControls?.length > 0
          ? formControls.map((controlItem) => (
              <FormField
                control={formData.control}
                key={controlItem.id}
                name={controlItem.id}
                render={({ field }) => {
                  console.log(field);
                  return (
                    <FormItem>
                      <FormLabel>{controlItem.label}</FormLabel>
                      {controlItem.componentType === "input" ? (
                        <FormControl>
                          <Input
                            placeholder={controlItem.placeholder}
                            type={controlItem.type}
                            // {...field}
                            value={
                              // currentEditId
                                //  field.value
                                 setValue(controlItem.label)
                            }
                            onChange={
                              // currentEditId
                              //   ? field.onChange
                                 (e) =>
                                    setState(controlItem.label, e.target.value)
                            }
                            className={inputStyles}
                          />
                        </FormControl>
                      ) : controlItem.componentType === "select" ? (
                        <Select
                          onValueChange={(selectedId) => {
                            const selectedOption = controlItem.options.find(
                              (optionItem) => optionItem.id === selectedId
                            );
                            if (selectedOption) {
                              // currentEditId ? 
                              // (field.onChange(selectedOption.label)) 
                              setState(controlItem.label, selectedOption.label)
                            }
                          }}
                          value={
                            // currentEditId
                              //  controlItem.options.find(
                              //     (optionItem) =>
                              //       optionItem.label === field.value
                              //   )?.id
                               setValue(controlItem.label)
                          }
                        >
                          <FormControl>
                            <SelectTrigger className={inputStyles}>
                              <SelectValue
                                placeholder={controlItem.placeholder}
                                className="text-black focus:text-black"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            {controlItem.options.map((optionItem) => (
                              <SelectItem
                                value={optionItem.id}
                                className="text-black cursor-pointer focus:text-black"
                                key={optionItem.id}
                              >
                                {optionItem.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : null}
                    </FormItem>
                  );
                }}
              />
            ))
          : null}
        {loading && <LoadingIndicator />}
        <div className="flex mt-4 justify-center items-center">
          <CommonButton type={"submit"} buttonText={btnText} />
        </div>
      </form>
    </Form>
  );
}

export default CommonForm;

export const signUpFormControls = [
  {
    id: "firstname",
    label: "First Name",
    placeholder: "Enter your first name...",
    componentType: "input",
    type: "text",
  },
  {
    id: "lastname",
    label: "Last Name",
    placeholder: "Enter your last name...",
    componentType: "input",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email...",
    componentType: "input",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Enter your password...",
    componentType: "input",
    type: "password",
  },
];

export const signInFormControls = [
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email...",
    componentType: "input",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Enter your password...",
    componentType: "input",
    type: "password",
  },
];

export const departmentOptions = [
  {
    id: "generalmanagement",
    label: "General Management",
  },
  {
    id: "finance",
    label: "Finance",
  },
  {
    id: "humanresources",
    label: "Human Resources",
  },
  {
    id: "marketing",
    label: "Marketing",
  },
  {
    id: "operations",
    label: "Operations",
  },
  {
    id: "sales",
    label: "Sales",
  },
];

export const addNewEmployeeFormControls = [
  {
    componentType: "input",
    type: "text",
    id: "fullname",
    label: "Full Name",
    placeholder: "Enter your full name...",
  },
  {
    componentType: "input",
    type: "email",
    id: "email",
    label: "Email ",
    placeholder: "Enter your email...",
  },
  {
    componentType: "input",
    type: "tel",
    id: "phone",
    label: "Phone",
    placeholder: "Enter your phone number...",
  },
  {
    componentType: "select",
    options: [
      { id: "0 - 3", label: "0 - 3,00,000" },
      { id: "3 - 6", label: "3,00,000 - 6,00,000" },
      { id: "6 - 9", label: "6,00,000 - 9,00,000" },
    ],
    id: "salary",
    label: "Salary",
    placeholder: "Select your salary range...",
  },
  {
    componentType: "select",
    options: departmentOptions,
    id: "department",
    label: "Department",
    placeholder: "Select your department of expertise...",
  },
];

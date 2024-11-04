import api from "@/api";
import CommonButton from "@/components/common-button";
import CommonForm from "@/components/common-form";
import { signUpFormControls } from "@/config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";
import { ContextComponent } from "@/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { setLoading, firstname, lastname, username, password, authFormData, toast } =
    useContext(ContextComponent);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
    try {
      const first_name = firstname;
      const last_name = lastname;
      await api.post("/user/register/", { first_name, last_name, username, password });
      const { data } = await api.post("/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, data.access);
      localStorage.setItem(REFRESH_TOKEN, data.refresh);
      navigate("/");
      toast({
        title: "Signed Up Successfully",
        description:
          "Welcome to ABC XYZ Co. We hope you a seemingless expperience.",
      });
    } catch (error) {
      toast({
        title: "ERROR!",
        description: "" + error,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-auto flex-col min-h-screen h-full">
      <div className="flex flex-col h-full justify-center items-center bg-white">
        <h3 className="text-3xl font-bold">Welcome</h3>
        <div className="mt-4 ">
          <CommonForm
            formControls={signUpFormControls}
            formData={authFormData}
            btnText={"Sign Up"}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="mt-5">
          <CommonButton
            onClick={() => navigate("/signin")}
            className="text-white mt-6 px-4 py-3 font-extralight border-none"
            buttonText={"Switch to Sign In"}
            type={"button"}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;

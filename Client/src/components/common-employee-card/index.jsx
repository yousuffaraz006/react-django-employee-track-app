import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

function CommonEmployeeCard({
  fullname,
  email,
  department,
  salary,
  phone,
  extraStyles,
  headerRightContent,
  footerContent,
}) {
  return (
    <Card
      className="flex flex-col gap-6 p-5 rounded-2xl bg-gray-300 transition duration-300 hover:bg-white hover:shadow-2xl 
    hover:shadow-black cursor-pointer"
    >
      <CardHeader className="p-0 mb-0">
        <div className="flex justify-between">
          {fullname ? (
            <CardTitle
              className={`text-2xl max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap font-semibold text-gray-950 ${
                extraStyles ? extraStyles : ""
              }`}
            >
              {fullname}
            </CardTitle>
          ) : null}
          {headerRightContent ? headerRightContent : null}
        </div>
        {email ? (
          <CardDescription className="text-gray-600 mt-3 grid grid-cols-11 gap-0">
              <span className="mt-1">
                <FaEnvelope />
              </span>
              <span>{email}</span>
          </CardDescription>
        ) : null}
        {phone ? (
          <CardDescription className="text-gray-600 mt-3 grid grid-cols-11 gap-0">
              <span className="mt-1">
                <FaPhone />
              </span>
              <span>+91</span>
              <span className="ml-1">{phone}</span>
          </CardDescription>
        ) : null}
      </CardHeader>
      {department && salary ? (
        <CardContent className="p-0 mb-0">
          Department : {department} <br /> Salary : &#8377; {salary}
        </CardContent>
      ) : null}
      <CardFooter className="p-0">{footerContent}</CardFooter>
    </Card>
  );
}

export default CommonEmployeeCard;

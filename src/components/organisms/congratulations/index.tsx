import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

const Congratulations = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const page: string | undefined = pathname?.split("/").pop();
  console.log(pathname);

  //

  return (
    <div className="flex flex-col items-center gap-11 py-14">
      <div className=" bg-background-light rounded-full flex justify-center items-center   size-36 ">
        <span className="rounded-full  bg-linear-[#A990DD,#7046C6]  flex items-center justify-center size-24">
          <CheckIcon size={50} className="  text-white font-extrabold" />
        </span>
      </div>
      <div className=" flex flex-col gap-2 items-center">
        <h1 className=" text-2xl font-bold text-[#1A191C]">Congratulations!</h1>
        <p className=" text-sm font-normal text-center text-[#696572]">
          {`${
            page === "congratulations"
              ? "Your account is successfully created"
              : "You’ve successfully created a new password."
          }`}
        </p>
      </div>
      <Button
        onClick={() => navigate("/")}
        type="button"
        className="bg-primary text-white w-full py-6 rounded-[0.625rem] text-base"
      >
        {` ${page === "congratulations" ? "Continue" : "Continue to Login"}`}
      </Button>
    </div>
  );
};
export default Congratulations;

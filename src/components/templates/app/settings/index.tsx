import { useAuthStore } from "@/store/auth.store";
import { ArrowLeft } from "iconsax-reactjs";
import { Link, NavLink, Outlet } from "react-router";

const Settings = () => {
  const { user } = useAuthStore();
  const check = user?.adminAccess.toLowerCase() !== "sub_admin";
  return (
    <div className="space-y-10">
      <Link to={"/dashboard"} className="inline-flex items-center gap-2.5">
        <ArrowLeft size={20} color="#696572" />
        <h4 className="font-family-satoshi text-text-secondary text-base font-medium">
          Settings
        </h4>
      </Link>

      <div className="bg-white p-5 md:p-10 border border-background-light rounded-md overflow-clip">
        <h3 className="text-xl font-bold font-family-satoshi">Settings</h3>

        <div className="inline-flex gap-2.5 mt-2 md:mt-5 flex-wrap">
          {[
            "profile",
            check && "admins",
            check && "product_category",
            check && "pricing",
          ]
            .filter(Boolean)
            .map((nav) => (
              <NavLink
                to={`${nav !== "profile" ? `/settings/${nav}` : ""}`}
                end={nav === "profile"}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary border-b border-b-primary capitalize sm:text-base font-bold font-family-satoshi p-1 transition-all duration-300"
                    : "capitalize text-base text-[#837E8E] font-medium font-family-satoshi p-1 sm:text-base text-nowrap transition-all duration-300"
                }
              >
                {(nav as string).replaceAll("_", " ")}
              </NavLink>
            ))}
        </div>

        <div className=" py-5 md:py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Settings;

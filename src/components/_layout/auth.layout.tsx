import { Outlet, useLocation } from "react-router";
// import Autoplay from "embla-carousel-autoplay";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import { type CarouselApi } from "@/components/ui/carousel";

import { Link } from "react-router";

import logo from "@/assets/images/logo.svg";
import onboardingImage from "@/assets/images/onboarding.jpg";

import stackIcon from "@/assets/images/icons/stack.svg";
// import { useEffect, useRef, useState } from "react";

const pageTitles = {
  login: {
    title: "Welcome back",
    description: "Login to continue from where you stopped",
    goto: "create-account",
  },
  "create-account": {
    title: "Create Account",
    description: "Let’s get you started by creating your account",
    goto: "/",
  },
  "verify-otp": {
    title: "Verification",
    description: "Check your email for the verification code",
    goto: "/",
  },
  "forgot-password": {
    title: "Don’t panic, let’s reset your password together",
    description: "Enter your email to receive reset password code",
    goto: "",
  },
  "reset-otp": {
    title: "Reset code",
    description: "Enter the code sent to your email",
    goto: "",
  },
  "reset-password": {
    title: "Reset password",
    description: "Create a new password and continue to login",
    goto: "",
  },
};

const AuthLayout = () => {
  const { pathname } = useLocation();
  // const [currentCarousel, setCurrentCarousel] = useState(0);
  // const [api, setApi] = useState<CarouselApi>();
  // const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  let page = pathname.split("/").pop() as keyof typeof pageTitles;
  const pageKey = Object.keys(pageTitles).includes(page) ? page : "login";
  const pageTitle = pageTitles[pageKey];

  // useEffect(() => {
  //   if (!api) return;

  //   setCurrentCarousel(api.selectedScrollSnap() + 1);

  //   api.on("select", () => {
  //     setCurrentCarousel(api.selectedScrollSnap() + 1);
  //   });
  // }, [api]);

  return (
    <div className="bg-white w-full">
      <div className="grid sm:grid-cols-2 relative">
        {/* Left Side */}
        <div className="pt-10 px-5 sm:px-10 lg:px-20 overflow-y-auto h-screen relative z-10 bg-white scroll-m-0 scrollbar-hide">
          <Link to="/" className="">
            <img src={logo} alt="" loading="lazy" />
          </Link>

          <div className="pt-8 pb-6">
            {page.toString() !== "congratulations" &&
              page.toString() !== "congratulations_" && (
                <header className="flex flex-col items-start mb-10">
                  <div className="rounded-full p-1 inline-flex justify-center items-center bg-background-light size-12">
                    <img src={stackIcon} className="size-7" />
                  </div>
                  <h2 className="text-2xl mt-3 font-bold text-text-primary">
                    {pageTitle?.title}
                  </h2>
                  <p className="text-text-secondary">
                    {pageTitle?.description}
                  </p>
                </header>
              )}

            <Outlet />

            {["", "create-account"].includes(page) && (
              <div className="inline-flex w-full items-center justify-center gap-2 py-4 font-medium text-sm">
                <p className="text-text-secondary">
                  {page.toString() == "create-account"
                    ? "Already have an account?"
                    : "You don’t have an account?"}
                </p>
                <Link to={pageTitle?.goto} className="text-primary">
                  {page.toString() == "" ? "Create one" : "Log in"}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Carousel */}
        <div className="fixed right-0 top-0 hidden sm:block w-1/2 h-screen z-0">
          {/* <Carousel
            plugins={[plugin.current]}
            setApi={setApi}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index}> */}
          <div
            className="relative flex flex-col overflow-hidden h-screen"
            style={{
              background: `url(${onboardingImage}) no-repeat center center/cover`,
            }}
          ></div>
          {/* </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel> */}

          {/* Carousel Overlay Content */}
          {/* <div className="absolute bottom-30 py-10 px-20 text-white z-10">
            <h1 className="text-[2.5rem] font-bold font-family-bricolage">
              Your one-stop app
            </h1>
            <p className="text-lg font-family-satoshi font-medium">
              Your one-stop app for all things vehicle-related.
            </p>
            <div className="inline-flex items-center gap-1.5 mt-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <span
                  key={index}
                  className={`h-2 ${
                    index + 1 === currentCarousel
                      ? "bg-primary w-6"
                      : "bg-white w-2"
                  } rounded-full`}
                ></span>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

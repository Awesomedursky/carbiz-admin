import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React from "react";

const CustomButton = ({
  loading,
  ...props
}: React.ComponentProps<typeof Button> & { loading?: boolean }) => {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Spinner />}
      {props.children}
    </Button>
  );
};

export default CustomButton;

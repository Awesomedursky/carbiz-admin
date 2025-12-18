"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Control } from "react-hook-form";
import { cn } from "@/lib/utils";

function formatDateOnly(date?: Date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function CalendarOnly({
  control,
  name,
  label,
  description,
  placeholder = "Pick a date...",
  className,
}: {
  control?: Control<any>;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected = field.value ? new Date(field.value) : undefined;

        const handleSelectDate = (newDate?: Date) => {
          if (!newDate) return;

          const updated = new Date(newDate);

          field.onChange(updated?.toISOString());
          setOpen(false);
        };

        return (
          <FormItem
            className={cn("flex flex-col gap-3 mb-0 py-2.5", className)}
          >
            {label && <FormLabel>{label}</FormLabel>}

            <div className="relative flex gap-2">
              <FormControl>
                <Input
                  readOnly
                  value={formatDateOnly(selected)}
                  placeholder={placeholder}
                  className="bg-background pr-10 py-6"
                  onClick={() => setOpen(true)}
                />
              </FormControl>

              <Popover open={open} onOpenChange={setOpen} modal>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                  >
                    <CalendarIcon className="size-3.5" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="end">
                  <div className="flex flex-col p-3">
                    <Calendar
                      className="w-xs"
                      mode="single"
                      selected={selected}
                      onSelect={handleSelectDate}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {description && <FormDescription>{description}</FormDescription>}
          </FormItem>
        );
      }}
    />
  );
}

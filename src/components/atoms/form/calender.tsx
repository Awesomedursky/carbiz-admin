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

function formatDate(date?: Date) {
  if (!date) return "";
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function FormCalendar({
  control,
  name,
  label,
  description,
  placeholder = "Pick a date...",
  className,
}: {
  control: Control<any>;
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

        // Always keep time when selecting a new date
        const handleSelectDate = (newDate?: Date) => {
          if (!newDate) return;

          const updated = new Date(newDate);

          if (selected) {
            updated.setHours(selected.getHours());
            updated.setMinutes(selected.getMinutes());
          }

          field.onChange(updated.toISOString());
        };

        // Time picker handler
        const handleTimeChange = (value: string) => {
          if (!selected) return;

          const [h, m] = value.split(":");
          const updated = new Date(selected);
          updated.setHours(Number(h));
          updated.setMinutes(Number(m));

          field.onChange(updated.toISOString());
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
                  value={formatDate(selected)}
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
                  <div className="flex flex-col p-3 gap-3">
                    <Calendar
                      className=" w-xs"
                      mode="single"
                      selected={selected}
                      onSelect={handleSelectDate}
                    />

                    {/* Time Picker */}
                    <div className="inline-flex items-center gap-2">
                      <Input
                        type="time"
                        value={
                          selected
                            ? `${String(selected.getHours()).padStart(
                                2,
                                "0"
                              )}:${String(selected.getMinutes()).padStart(
                                2,
                                "0"
                              )}`
                            : "00:00"
                        }
                        onChange={(e) => handleTimeChange(e.target.value)}
                      />

                      <Button size="sm" onClick={() => setOpen(false)}>
                        Done
                      </Button>
                    </div>
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

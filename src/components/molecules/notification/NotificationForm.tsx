import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputField from "@/components/atoms/form/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form";
import { useDrawerStore } from "@/store/drawer.store";

import {
  NotificationSchema,
  NotificationSchemaType,
} from "@/schema/notification.schema";

import { NotificationEntity } from "@/columns/notifications.columns";

type NotificationFormProps = {
  onClose: () => void;
  onCreate: (newNotification: NotificationEntity) => void;
  initialData?: NotificationEntity;
};

const NotificationForm = ({ onCreate, initialData }: NotificationFormProps) => {
  const { closeModal } = useDrawerStore();

  const [scheduleOption, setScheduleOption] = useState<"now" | "later">(
    initialData?.isScheduled ? "later" : "now"
  );
  const [scheduledDate, setScheduledDate] = useState<string>("");

  const form = useForm<NotificationSchemaType>({
    resolver: zodResolver(NotificationSchema),
    defaultValues: {
      title: initialData?.title || "",
      message: initialData?.message || "",
      audience: initialData?.audience || "",
      method: (initialData?.method as any) || "Email",
      recurringType: (initialData?.recurringType as any) || "One Time",
      isScheduled: initialData?.isScheduled || false,
      scheduledDate: initialData?.scheduledDate || "",
      dateTime:
        initialData?.dateTime instanceof Date
          ? initialData.dateTime.toISOString()
          : initialData?.dateTime || "",
    },
  });

  const onSubmit = (data: NotificationSchemaType) => {
    const newNotification: NotificationEntity = {
      ...data,
      id: initialData?.id ?? Date.now(),
      isScheduled: scheduleOption === "later",
      dateTime: scheduleOption === "later"
        ? scheduledDate
        : new Date().toISOString(),
      status: scheduleOption === "later" ? "Scheduled" : "Sent",
      sentBy: ""
    };

    onCreate(newNotification);
    closeModal();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 mt-0 mb-0"
      >
        {/* Title */}
        <div>
          <FormLabel>Notification Title</FormLabel>
          <InputField
            control={form.control}
            name="title"
            placeholder="Enter notification title"
          />
        </div>

        {/* Message */}
        <div>
          <FormLabel>Message</FormLabel>
          <Textarea
            {...form.register("message")}
            placeholder="Write the message here..."
          />
        </div>

        {/* Delivery & Audience */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FormLabel>Delivery Method</FormLabel>
            <Select
              onValueChange={(value) =>
                form.setValue("method", value as any)
              }
              value={form.watch("method")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Push">Push</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
                <SelectItem value="In-App">In-App</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <FormLabel>Audience</FormLabel>
            <InputField
              control={form.control}
              name="audience"
              placeholder="e.g., Customers, Merchants"
            />
          </div>
        </div>

        {/* Schedule */}
        <div>
          <Label>Schedule Option</Label>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={scheduleOption === "now"}
                onCheckedChange={() => setScheduleOption("now")}
              />
              <span>Send Now</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={scheduleOption === "later"}
                onCheckedChange={() => setScheduleOption("later")}
              />
              <span>Send Later</span>
            </div>
          </div>
        </div>

        {scheduleOption === "later" && (
          <div>
            <Label>Pick Date and Time</Label>
            <Input
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
            />
          </div>
        )}

        {/* Recurrence */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Repeat Every</Label>
            <Select
              onValueChange={(value) =>
                form.setValue("recurringType", value as any)
              }
              value={form.watch("recurringType")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="One Time">One Time</SelectItem>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Bi-Weekly">Bi-Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>End Date</Label>
            <Input
              type="datetime-local"
              {...form.register("dateTime")}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" variant="default">
            Save Notification
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NotificationForm;

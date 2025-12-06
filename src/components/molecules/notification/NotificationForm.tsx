import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/atoms/form/input";
import { useDrawerStore } from "@/store/drawer.store";

import {
  NotificationSchema,
  NotificationSchemaType,
} from "@/schema/notification.schema";
import TextArea from "@/components/atoms/form/textarea";
import SelectField from "@/components/atoms/form/select";
import FormRadioGroup from "@/components/atoms/form/radio-group";
import { BracketRadioItem } from "@/components/ui/radio-group";
import { FormCalendar } from "@/components/atoms/form/calender";
import { useCreateNotificationCenter } from "@/queries/notifications.query";
import CustomButton from "@/components/atoms/button/CustomButton";
import { NotificationCenterOutput } from "@/types/notification-center.type";
import React from "react";

const NotificationForm = (notification?: NotificationCenterOutput) => {
  const { closeModal, title } = useDrawerStore();
  const { createComplaint, loading } = useCreateNotificationCenter();

  const form = useForm<NotificationSchemaType>({
    resolver: zodResolver(NotificationSchema),
    defaultValues: {},
  });

  React.useEffect(() => {
    if (notification) {
      form.reset({
        notificationTitle: notification.notificationTitle,
        notificationMessage: notification.notificationMessage,
        deliveryMethod: notification.deliveryMethod,
        notificationAudience: notification.notificationAudience,
        broadcastDateTime: notification.broadcastDateTime ?? undefined,
        time: notification.broadcastDateTime ? "later" : undefined,
        recurring: !!notification.makeBroadcastRecurringType,
        makeBroadcastRecurringType:
          notification.makeBroadcastRecurringType ?? undefined,
      });
    }
  }, [notification]);

  const onSubmit = (data: NotificationSchemaType) => {
    const { time, recurring, ...others } = data;
    createComplaint({ variables: { input: others } });
  };

  const scheduleOption = form.watch("time");
  const recurring = form.watch("recurring");
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 mt-0 mb-0"
      >
        <div className="flex items-center flex-col  w-full">
          <h2 className="text-lg md:text-xl font-bold text-center">{title}</h2>
          <p className="text-base text-center">
            Fill the correct information in the field provided below.
          </p>
        </div>

        <InputField
          label="Notification Title"
          control={form.control}
          name="notificationTitle"
          placeholder="Enter notification title"
        />
        <TextArea
          label="Message"
          name="notificationMessage"
          control={form.control}
          placeholder="Write the message here..."
        />
        {/* Delivery & Audience */}
        <div className="grid grid-cols-2 gap-3">
          <SelectField
            placeholder="select method"
            control={form.control}
            name="deliveryMethod"
            label="Delivery Method"
            items={[
              { label: "Email", value: "Email" },
              { label: "Push Notification", value: "Push_Notification" },
            ]}
          />

          <SelectField
            placeholder="select message audience"
            control={form.control}
            name="notificationAudience"
            label="Audience"
            items={[
              { label: "Merchant", value: "Merchants" },
              { label: "Rider", value: "Riders" },
              { label: "Customer", value: "Customers" },
              { label: "All Users", value: "All_Users" },
            ]}
          />
        </div>
        {/* Schedule */}
        <FormRadioGroup
          control={form.control}
          name="time"
          label="Schedule Option"
          options={[
            { label: "Send Now", value: "now" },
            { label: "Schedule for later", value: "later" },
          ]}
          renderRadio={(value) => <BracketRadioItem value={value} />}
        />

        {scheduleOption === "later" && (
          <div>
            <FormCalendar
              control={form.control}
              name="broadcastDateTime"
              label="Pick Date and Time"
            />

            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={recurring || false}
                onChange={(e) => form.setValue("recurring", e.target.checked)}
              />
              <label className="text-sm font-medium">
                Make this notification recurring
              </label>
            </div>
          </div>
        )}

        {recurring && (
          <div>
            <SelectField
              placeholder="Select recurring frequency"
              control={form.control}
              name="makeBroadcastRecurringType"
              label="Repeat Every"
              items={[
                { label: "Once", value: "One_Type" },
                { label: "Daily", value: "Daily" },
                { label: "Weekly", value: "Weekly" },
                { label: "Every 2 Weeks", value: "Bi_Weekly" },
              ]}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button
            size={"lg"}
            type="button"
            variant="outline"
            onClick={closeModal}
          >
            Cancel
          </Button>

          <CustomButton
            loading={loading}
            size={"lg"}
            type="submit"
            variant="default"
          >
            Save Notification
          </CustomButton>
        </div>
      </form>
    </Form>
  );
};

export default NotificationForm;

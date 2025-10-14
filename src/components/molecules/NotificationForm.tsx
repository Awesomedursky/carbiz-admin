import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { NotificationEntity } from "@/columns/notifications.columns";

type NotificationFormProps = {
  onClose: () => void;
  onCreate: (newNotification: any) => void;
   initialData?: NotificationEntity;
};

const NotificationForm = ({ onClose, onCreate }: NotificationFormProps) => {
  const [scheduleOption, setScheduleOption] = useState<"now" | "later">("now");
  const [scheduledDate, setScheduledDate] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    audience: "",
    method: "Email",
    isScheduled: false,
    scheduleOption,
    scheduledDate: "",
    dateTime: "",
    recurringType: "One Time",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotification = {
      ...formData,
      isScheduled: scheduleOption === "later",
      dateTime:
        scheduleOption === "later" ? scheduledDate : new Date().toISOString(),
      status: scheduleOption === "later" ? "Scheduled" : "Sent",
    };
    onCreate(newNotification);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <Label>Notification Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter notification title"
          required
        />
      </div>

      <div>
        <Label>Message</Label>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write the message here..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Delivery Method</Label>
          <Select
            value={formData.method}
            onValueChange={(value) =>
              setFormData({ ...formData, method: value as any })
            }
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
          <Label>Audience</Label>
          <Input
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            placeholder="e.g., Customers, Merchants"
          />
        </div>
      </div>

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
            required
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Repeat Every</Label>
          <Select
            value={formData.recurringType}
            onValueChange={(value) =>
              setFormData({ ...formData, recurringType: value as any })
            }
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
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="default">
          Save Notification
        </Button>
      </div>
    </form>
  );
};

export default NotificationForm;

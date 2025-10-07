type NotificationRecipient = {
  id: string;
  name: string;
  email: string;
  status: string;
};

type NotificationEntity = {
  id: string;
  title: string;
  message: string;
  audience: string;
  method: string;
  sentBy: string;
  dateTime: Date;
  isScheduled: boolean;
  recurringType: string;
  status: string;
  recipients?: NotificationRecipient[];
};

export default NotificationEntity;

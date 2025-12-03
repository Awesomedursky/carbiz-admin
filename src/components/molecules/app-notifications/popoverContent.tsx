import CustomButton from "@/components/atoms/button/CustomButton";
import { PopoverContent } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useAppNotificationQuery } from "@/queries/app-notification.query";
import { useDrawerStore } from "@/store/drawer.store";
import { AppNotificationOutput } from "@/types/app-notification.type";
import moment from "moment";
import { useEffect } from "react";

export const Content = () => {
  const { items, unreadCount, all, loading, loadMore, page, totalPages } =
    useAppNotificationQuery();
  const { setAppNotificationCount } = useDrawerStore();

  useEffect(() => {
    if (unreadCount) {
      setAppNotificationCount(unreadCount ?? 0);
    }
  }, [all]);

  return (
    <PopoverContent className="w-96 p-0 shadow-xl rounded-2xl border bg-card overflow-clip">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="font-semibold">Notifications</h2>
      </div>

      <Tabs defaultValue="inbox" className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-muted/40 rounded-none border-b p-2">
          <TabsTrigger value="inbox">{`All (${all})`}</TabsTrigger>
          <TabsTrigger value="unread">{`Unread (${unreadCount})`}</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="max-h-96 overflow-y-auto">
          {loading &&
            !loadMore &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 border-b flex gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}

          {(Array.isArray(items) ? items : []).map(
            (n: AppNotificationOutput) => (
              <div key={n?.notificationID}>
                <div
                  className={cn(
                    "p-4 !flex gap-3 rounded-none border-b last:border-b-0 bg-background hover:bg-accent/40 transition-all duration-300",
                    n?.isRead && "bg-muted/40"
                  )}
                >
                  <div className="flex-1">
                    <p className="text-sm leading-tight">
                      <span className="font-semibold text-foreground">
                        {n.subject}
                      </span>
                      {" - "}
                      {n?.message}
                    </p>

                    <p className="text-xs text-muted-foreground mt-1">
                      {moment(n?.date).fromNow()} • {n.account}
                    </p>
                  </div>

                  {!n.isRead && (
                    <span className="w-2 h-2 bg-primary rounded-full self-center" />
                  )}
                </div>
              </div>
            )
          )}
          {(totalPages == null || page <= totalPages) && (
            <div className="p-2 flex items-center justify-center">
              <CustomButton onClick={loadMore} loading={loading}>
                Load More
              </CustomButton>
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="unread"
          className="text-center max-h-96 overflow-y-auto"
        >
          {(Array.isArray(items) ? items : [])
            ?.filter((i) => i?.isRead == false)
            ?.map((n: AppNotificationOutput) => (
              <div key={n?.notificationID}>
                <div
                  className={cn(
                    "p-4 !flex gap-3 rounded-none border-b last:border-b-0 bg-background hover:bg-accent/40 transition-all duration-300",
                    n?.isRead && "bg-muted/40"
                  )}
                >
                  <div className="flex-1">
                    <p className="text-sm leading-tight">
                      <span className="font-semibold text-foreground">
                        {n.subject}
                      </span>
                      {" -  "}
                      {n?.message}
                    </p>

                    <p className="text-xs text-muted-foreground mt-1">
                      {moment(n?.date).fromNow()} • {n.account}
                    </p>

                    {/* {n.invite && (
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                          >
                            Decline
                          </Button>
                          <Button size="sm" className="rounded-xl">
                            Accept
                          </Button>
                        </div>
                      )} */}
                  </div>

                  {!n.isRead && (
                    <span className="w-2 h-2 bg-primary rounded-full self-center" />
                  )}
                </div>
              </div>
            ))}

          {(totalPages == null || page <= totalPages) && (
            <div className="p-2 flex items-center justify-center">
              <CustomButton onClick={loadMore} loading={loading}>
                Load More
              </CustomButton>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PopoverContent>
  );
};

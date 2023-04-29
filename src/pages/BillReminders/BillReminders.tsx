import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { CalendarEvent } from "./utils/calendar-event.interface";
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import React from "react";
import Drawer from "./components/Drawer";
import CreateBillReminder from "./components/CreateBillReminder";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  billReminders,
  updateBillReminder,
} from "../../api/bill-reminders/bill-reminders";
import { format } from "date-fns";
import _ from "lodash";
import EditBillReminder from "./components/EditBillReminder";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";

interface BillRemindersProps {}

const Wrapper = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  borderRadius: "5px",
  boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
  background: "white",
  position: "relative",
  // height: "100%",
  width: "100%",
}));

// const initialEvents: CalendarEvent[] = [
const initialEvents = [
  {
    title: "Event 1",
    date: "2023-04-28",
    customData: {
      foo: "bar",
      baz: 123,
    },
  },
  {
    title: "Event 2",
    date: "2023-04-29",
    customData: {
      foo: "qux",
      baz: 456,
    },
  },
];

const BillReminders: React.FunctionComponent<BillRemindersProps> = () => {
  const theme = useTheme();
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [open, setOpen] = useState<{
    state: boolean;
    date: Date | null | string;
  }>({
    state: false,
    date: null,
  });

  const [edit, setEdit] = useState<{
    state: boolean;
    id: number | null;
  }>({
    state: false,
    id: null,
  });

  const [updatedReminder, setUpdatedReminder] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const query = useQuery(["billRemindersData"], () => billReminders(), {
    retry: 1,
    onSuccess: (data) => {
      data.map((item: any) => {
        item.reminderId = item.id;
        return item;
      });
    },
    onError: (error: any) => {
      // console.log(error.response.status);
    },
  });

  const editMutation = useMutation({
    mutationFn: updateBillReminder,
    onSuccess: (data) => {
      toast.success("Reminder updated successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries(["billRemindersData"], { exact: true });
      queryClient.invalidateQueries(["billRemindersData", updatedReminder], {
        exact: true,
      });
      setUpdatedReminder(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message, {
        position: "top-right",
      });
    },
  });

  const handleEventDrop = (eventDropInfo: any) => {
    setUpdatedReminder(eventDropInfo.event._def.extendedProps.reminderId);
    editMutation.mutate({
      id: eventDropInfo.event._def.extendedProps.reminderId,
      date: eventDropInfo.event.start,
    });
  };

  // const handleEventResize = (eventResizeInfo: any) => {
  //   const updatedEvents = events.map((event) => {
  //     if (event.title === eventResizeInfo.event.title) {
  //       return {
  //         ...event,
  //         start: eventResizeInfo.event.start,
  //         end: eventResizeInfo.event.end,
  //       };
  //     }
  //     return event;
  //   });
  //   setEvents(updatedEvents);
  // };

  const handleEventClick = (info: any) => {
    setEdit({ state: true, id: info.event._def.extendedProps.reminderId });
  };

  const handleDateClick = (info: any) => {
    // console.log(info.date);
    setOpen({ state: true, date: format(info.date, "yyyy-MM-dd") });
  };

  return (
    <Wrapper>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        // events={events}
        events={query.data ? query.data : []}
        eventContent={(eventInfo) => renderEventContent(eventInfo, theme)}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        // eventResize={handleEventResize}
        themeSystem="mui"
        editable={true} // enable drag and drop
      />
      <Drawer open={open.state} setOpen={setOpen}>
        <CreateBillReminder open={open} setOpen={setOpen} />
      </Drawer>
      <Drawer open={edit.state} setOpen={setEdit}>
        <EditBillReminder open={edit} setOpen={setEdit} />
      </Drawer>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={editMutation.isLoading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Wrapper>
  );
};

function renderEventContent(eventInfo: any, theme: any) {
  const status = eventInfo.event._def.extendedProps.isCompleted;
  return (
    <>
      <div
        style={{
          // background: "gray",
          width: "100%",
          padding: "5px",
          color: "white",
          background:
            status === 0
              ? theme.palette.error.main
              : theme.palette.success.main,
          borderRadius: "5px",
        }}
      >
        {/* <b>{eventInfo.timeText}</b> */}
        <Typography
          sx={{
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            paddingX: "5px",
          }}
        >
          <span style={{ flexGrow: 1 }}>{eventInfo.event.title}</span>
          {/* <IconButton>
            <ClearIcon sx={{ width: "20px", color: "white", flexGrow: 1 }} />
          </IconButton> */}
        </Typography>
        {/* <p style={{ margin: 0, padding: 0 }}>{eventInfo.event.title}</p> */}
      </div>
    </>
  );
}

export default BillReminders;

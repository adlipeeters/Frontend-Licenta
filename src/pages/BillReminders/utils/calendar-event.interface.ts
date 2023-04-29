export interface CalendarEvent {
  title?: string;
  start?: Date;
  end?: Date;
  date?: Date | string;
  resizable?: boolean;
  eventResizableFromStart?: boolean;
  eventResizableFromEnd?: boolean;
  isStartResizable?: boolean;
  isEndResizable?: boolean;
  isResizing?: boolean;
}

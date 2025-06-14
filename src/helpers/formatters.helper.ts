import {format} from "date-fns";
export function formatDate(date: string | Date, withHour = true) {
  return format(date, withHour ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy").replace(
    " ",
    ", "
  );
}

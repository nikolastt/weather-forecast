import { DateTime } from "luxon";

export const transformTimesTampToDate = (timestamp, timeZone) => {
  const date = DateTime.fromSeconds(timestamp + timeZone).toUTC();

  return date;
};

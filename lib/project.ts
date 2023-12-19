export type ProjectDateType = {
  projectStartYear?: number | null;
  projectEndYear?: number | null;
  projectStartMonth?: number | null;
  projectEndMonth?: number | null;
};

export function formatProjectDate(date: ProjectDateType, inProgress: boolean) {
  let startDate = "";
  let endDate = "";
  let dateRange = "";

  if (date.projectStartYear && date.projectStartMonth) {
    startDate = `${date.projectStartMonth < 10 ? `0${date.projectStartMonth}` : date.projectStartMonth}/${date.projectStartYear}`;
  }

  if (date.projectEndYear && date.projectEndMonth) {
    endDate = `${
      date.projectEndMonth < 10
        ? `0${date.projectEndMonth}`
        : date.projectEndMonth
    }/${date.projectEndYear}`;
  } else if (inProgress) {
    endDate = "TBA";
  }

  if (startDate && endDate) {
    dateRange = `${startDate} - ${endDate}`;
  } else if (endDate && !startDate) {
    dateRange = endDate;
  }

  return dateRange;
}
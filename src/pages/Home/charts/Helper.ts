// const _ = require("lodash");
import _ from "lodash";
import {
  startOfMonth,
  endOfMonth,
  parseISO,
  isWithinInterval,
  eachDayOfInterval,
  format,
} from "date-fns";

// example transactions array

export const calcExpenses = (transactions: any) => {
  // get current month start and end dates
  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());

  // group transactions by date
  const groupedTransactions = _.groupBy(transactions, (transaction) => {
    if (transaction?.type === "expense") {
      const transactionDate = new Date(transaction.createdAt);
      return format(transactionDate, "dd");
    }
  });

  // iterate over each day of the current month and calculate total expenses for that day
  const daysOfMonth = eachDayOfInterval({
    start: currentMonthStart,
    end: currentMonthEnd,
  });

  let categories = daysOfMonth.map((day: any) => format(day, "dd"));

  let series = daysOfMonth.map((day) => {
    const dayFormatted = format(day, "dd");
    // console.log(dayFormatted);
    const dayTransactions = groupedTransactions[dayFormatted] || [];
    return _.sumBy(dayTransactions, "amount");
  });

  //   console.log(categories, data);

  return { categories, series };
};

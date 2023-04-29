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

export const calcExpenseVsIncome = (
  transactions: any,
  periodFilter: any = null,
  accountFilter: any = null,
  categoryFilter: any = null
) => {
  // console.log(accountFilter);
  // get current month start and end dates
  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());

  if (accountFilter.length > 0) {
    let copy = [...transactions];
    transactions = [];
    transactions = copy.filter((transaction: any, _i: any) => {
      if (accountFilter.includes(transaction.account.id)) {
        return transaction;
      }
    });
  }

  // group income transactions by date
  const incomeGroupedTransactions = _.groupBy(transactions, (transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    return format(transactionDate, "dd");
  });

  // group expense transactions by date
  const expenseGroupedTransactions = _.groupBy(transactions, (transaction) => {
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

  let incomeSeries = daysOfMonth.map((day) => {
    const dayFormatted = format(day, "dd");
    const dayTransactions = incomeGroupedTransactions[dayFormatted] || [];
    return _.sumBy(dayTransactions, "amount");
  });

  let expenseSeries = daysOfMonth.map((day) => {
    const dayFormatted = format(day, "dd");
    const dayTransactions = expenseGroupedTransactions[dayFormatted] || [];
    return _.sumBy(dayTransactions, "amount");
  });

  return { categories, incomeSeries, expenseSeries };
};

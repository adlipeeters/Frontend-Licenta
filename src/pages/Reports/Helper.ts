// const _ = require("lodash");
import _ from "lodash";
import {
  startOfMonth,
  endOfMonth,
  parseISO,
  isWithinInterval,
  eachDayOfInterval,
  format,
  parse,
} from "date-fns";

// example transactions array

export const getReport = (
  reportType: any,
  transactions: any,
  periodFilter: any = null,
  accountFilter: any = null,
  categoryFilter: any = null
) => {
  // get current month start and end dates
  let monthStart: any = null;
  let monthEnd: any = null;

  if (periodFilter === null) {
    monthStart = startOfMonth(new Date());
    monthEnd = endOfMonth(new Date());
  } else {
    monthStart = startOfMonth(periodFilter);
    monthEnd = endOfMonth(periodFilter);
  }
  console.log(monthStart, monthEnd);

  let copy = [...transactions];
  transactions = [];
  transactions = copy.filter((transaction: any, _i: any) => {
    if (
      isWithinInterval(new Date(transaction?.createdAt), {
        start: monthStart,
        end: monthEnd,
      })
    ) {
      return transaction;
    }
  });

  if (accountFilter.length > 0) {
    let copy = [...transactions];
    transactions = [];
    transactions = copy.filter((transaction: any, _i: any) => {
      if (accountFilter.includes(transaction.account.id)) {
        return transaction;
      }
    });
  }

  if (categoryFilter.length > 0) {
    let copy = [...transactions];
    transactions = [];
    transactions = copy.filter((transaction: any, _i: any) => {
      if (!categoryFilter.includes(transaction.category.id)) {
        return transaction;
      }
    });
  }

  switch (reportType) {
    case 0:
      return incomeVsExpense(transactions, monthStart, monthEnd);
    case 1:
      return expenseByCategory(transactions);
    case 2:
      return incomeByCategory(transactions);
    default:
      return incomeVsExpense(transactions, monthStart, monthEnd);
  }
};

const incomeVsExpense = (transactions: any, monthStart: any, monthEnd: any) => {
  // group income transactions by date
  const incomeGroupedTransactions = _.groupBy(transactions, (transaction) => {
    if (transaction?.type === "income") {
      const transactionDate = new Date(transaction.createdAt);
      return format(transactionDate, "dd");
    }
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
    start: monthStart,
    end: monthEnd,
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

  let series = [
    { name: "Income", data: incomeSeries },
    { name: "Expense", data: expenseSeries },
  ];

  return { categories, series };
};

const expenseByCategory = (transactions: any) => {
  let copy = [...transactions];
  transactions = [];
  transactions = copy.filter((transaction: any) => {
    if (transaction.type === "expense") {
      return transaction;
    }
  });

  const groupByCategory = _.groupBy(transactions, "category.name");

  let categories = Object.keys(groupByCategory).map((key: any) => {
    return key;
  });

  let series: any[] = Object.keys(groupByCategory).map((key: any) => {
    let data = _.sumBy(groupByCategory[key], "amount");
    return {
      name: key,
      data: [data],
    };
  });

  return { categories, series };
};

const incomeByCategory = (transactions: any) => {
  let copy = [...transactions];
  transactions = [];
  transactions = copy.filter((transaction: any) => {
    if (transaction.type === "income") {
      return transaction;
    }
  });

  const groupByCategory = _.groupBy(transactions, "category.name");

  let categories = Object.keys(groupByCategory).map((key: any) => {
    return key;
  });

  let series: any[] = Object.keys(groupByCategory).map((key: any) => {
    let data = _.sumBy(groupByCategory[key], "amount");
    return {
      name: key,
      data: [data],
    };
  });

  return { categories, series };
};

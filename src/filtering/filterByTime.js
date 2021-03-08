const moment = require("moment");

const possibleFilters = ["day", "week", "month", "year"];

const filterByTime = (timeFrame) => {
  if (!possibleFilters.includes(timeFrame)) {
    timeFrame = "week";
  }

  return [
    {
      $match: {
        createdAt: {
          $gte: moment().startOf(`iso${timeFrame}`).toDate(),
          $lt: moment().endOf(`iso${timeFrame}`).toDate(),
        },
      },
    },
  ];
};

module.exports = filterByTime;

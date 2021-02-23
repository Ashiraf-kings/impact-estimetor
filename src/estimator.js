/* eslint-disable no-param-reassign */
const covid19ImpactEstimator = (Data) => {
  Data = {
    data: {},
    estimate: {
      impact: {},
      severeImpact: {}
    }

  };

  function data() {
    Data.data = {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 4,
        avgDailyIncomePopulation: 0.77
      },
      periodType: 'weeks',
      timeToElapse: 8,
      reportedCases: 2747,
      population: 92931687,
      totalHospitalBeds: 678874
    };
  }

  data();

  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = Data.data.region;
  const {
    periodType, timeToElapse, reportedCases, totalHospitalBeds
  } = Data.data;
  let computedPower;
  let dateChange;
  if (periodType === 'months') {
    dateChange = timeToElapse * 30;
    computedPower = Math.trunc(dateChange / 3);
  } else if (periodType === 'years') {
    dateChange = timeToElapse * 360;
    computedPower = Math.trunc(dateChange / 3);
  } else if (periodType === 'weeks') {
    dateChange = timeToElapse * 7;
    computedPower = Math.trunc(dateChange / 3);
  } else if (periodType === 'days') {
    dateChange = timeToElapse;
    computedPower = Math.trunc(dateChange / 3);
  }

  function impact() {
    let {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    } = Data.estimate.impact;
    currentlyInfected = reportedCases * 10;
    infectionsByRequestedTime = Math.trunc(currentlyInfected * 2 ** computedPower);
    severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
    hospitalBedsByRequestedTime = Math.trunc(0.35 * totalHospitalBeds - severeCasesByRequestedTime);
    casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
    casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);
    dollarsInFlight = Math.trunc((infectionsByRequestedTime
    * avgDailyIncomePopulation * avgDailyIncomeInUSD) / timeToElapse);
    Data.estimate.impact = {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  }
  impact();

  function severeImpact() {
    let {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    } = Data.estimate.severeImpact;
    currentlyInfected = reportedCases * 50;
    infectionsByRequestedTime = Math.trunc(currentlyInfected * 2 ** computedPower);
    severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
    hospitalBedsByRequestedTime = Math.trunc(0.35 * totalHospitalBeds - severeCasesByRequestedTime);
    casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
    casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);
    dollarsInFlight = Math.trunc((
      infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / timeToElapse);
    Data.estimate.severeImpact = {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  }
  severeImpact();
  return Data;
};

covid19ImpactEstimator();

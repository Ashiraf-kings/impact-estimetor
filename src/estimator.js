const covid19ImpactEstimator = (data) => {
 output={
     data: {},
     estimate:{
       impact:{},
       severeImpact:{}

     }
    
  }

 function data(){
  output.data = {
    region: {
    name: "Africa",
    avgAge: 19.7,
    avgDailyIncomeInUSD: 4,
    avgDailyIncomePopulation: 0.77
    },
    periodType: "weeks",
    timeToElapse: 8,
    reportedCases: 2747,
    population:92931687,
    totalHospitalBeds:678874,
  }
 }
  
  data()

  let{avgAge,avgDailyIncomeInUSD,avgDailyIncomePopulation}=output["data"]["region"];
  let{periodType,timeToElapse,reportedCases,population,totalHospitalBeds}=output["data"];
  var computedPower;
  var dateChange;
  if(periodType==="months"){
  dateChange=timeToElapse*30
  computedPower=Math.trunc(dateChange/3)
  }else if(periodType==="years"){
  dateChange=timeToElapse*360
  computedPower=Math.trunc(dateChange/3)
  }else if(periodType==="weeks"){
  dateChange=timeToElapse*7
  computedPower=Math.trunc(dateChange/3)
  }
  else if(periodType==="days"){
  dateChange=timeToElapse
  computedPower=Math.trunc(dateChange/3)
  }

  function impact(){
    let{
    currentlyInfected,infectionsByRequestedTime,severeCasesByRequestedTime,             hospitalBedsByRequestedTime,casesForICUByRequestedTime,casesForVentilatorsByRequestedTime, dollarsInFlight
    }=output.estimate.impact;
    currentlyInfected = reportedCases* 10;
    infectionsByRequestedTime =Math.trunc(currentlyInfected*2**computedPower);
    severeCasesByRequestedTime=Math.trunc(infectionsByRequestedTime*0.15);
    hospitalBedsByRequestedTime=Math.trunc(0.35*totalHospitalBeds-severeCasesByRequestedTime);
    casesForICUByRequestedTime=Math.trunc(0.05*infectionsByRequestedTime);
    casesForVentilatorsByRequestedTime=Math.trunc(0.02*infectionsByRequestedTime);
    dollarsInFlight= Math.trunc((infectionsByRequestedTime*avgDailyIncomePopulation*avgDailyIncomeInUSD)/timeToElapse);
    output.estimate.impact = {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight,
    }
  }
  impact()

  function severeImpact(){
    let{
    currentlyInfected,infectionsByRequestedTime,severeCasesByRequestedTime,hospitalBedsByRequestedTime,casesForICUByRequestedTime,casesForVentilatorsByRequestedTime,dollarsInFlight
    }=output.estimate.severeImpact;

    currentlyInfected = reportedCases* 50;
    infectionsByRequestedTime = Math.trunc(currentlyInfected*2**computedPower);
    severeCasesByRequestedTime=Math.trunc(infectionsByRequestedTime*0.15);
    hospitalBedsByRequestedTime=Math.trunc(0.35*totalHospitalBeds-severeCasesByRequestedTime);
    casesForICUByRequestedTime=Math.trunc(0.05*infectionsByRequestedTime);
    casesForVentilatorsByRequestedTime=Math.trunc(0.02*infectionsByRequestedTime);
    dollarsInFlight= Math.trunc((
      infectionsByRequestedTime*avgDailyIncomePopulation*avgDailyIncomeInUSD)/timeToElapse);
    output.estimate.severeImpact = {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight,
    }
  }
  severeImpact()
  return output
}

covid19ImpactEstimator()



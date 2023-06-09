const axios = require("axios");
function daily_frozenAntares(pushType, meterNo, frozenDate, hoursData, todayVol, totalVol) {
  let data = `{\n  "m2m:cin": {\n    "con": "{\\"pushType\\":\\"${pushType}\\",\\"meterNo\\":\\"${meterNo}\\",\\"frozenDate\\":\\"${frozenDate}\\",\\"hoursData\\":\\"${hoursData}\\",\\"todayVol\\":\\"${todayVol}\\",\\"totalVol\\":\\"${totalVol}\\"}"\n}\n}`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://platform.antares.id:8443/~/antares-cse/antares-id/laison/" + meterNo + "",
    headers: {
      "X-M2M-Origin": "b07f83b1409132e9:84c6cc0b97b86892",
      "Content-Type": "application/json;ty=4",
      Accept: "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

function alarmAntares(pushType, meterNo, warningTime, warningCode, warningInfo) {
  let data = `{\n  "m2m:cin": {\n    "con": "{\\"pushType\\":\\"${pushType}\\",\\"meterNo\\":\\"${meterNo}\\",\\"warningTime\\":\\"${warningTime}\\",\\"warningCode\\":\\"${warningCode}\\",\\"warningInfo\\":\\"${warningInfo}\\"}"\n}\n}`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://platform.antares.id:8443/~/antares-cse/antares-id/laison/" + meterNo + "",
    headers: {
      "X-M2M-Origin": "b07f83b1409132e9:84c6cc0b97b86892",
      "Content-Type": "application/json;ty=4",
      Accept: "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

function meter_taskAntares(pushType, meterNo, taskType, state, serialNo, totalUsedVolume, totalPurchaseVolume, surplusVolume, totalUsedAmount, totalPurchaseAmount, surplusAmount, clock) {
  let data = `{\n  "m2m:cin": {\n    "con": "{\\"pushType\\":\\"${pushType}\\",\\"meterNo\\":\\"${meterNo}\\",\\"taskType\\":\\"${taskType}\\",\\"state\\":\\"${state}\\",\\"serialNo\\":\\"${serialNo}\\",\\"totalUsedVolume\\":\\"${totalUsedVolume}\\",\\"totalPurchaseVolume\\":\\"${totalPurchaseVolume}\\",\\"surplusVolume\\":\\"${surplusVolume}\\",\\"totalUsedAmount\\":\\"${totalUsedAmount}\\",\\"totalPurchaseAmount\\":\\"${totalPurchaseAmount}\\",\\"surplusAmount\\":\\"${surplusAmount}\\",\\"clock\\":\\"${clock}\\"}"\n}\n}`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://platform.antares.id:8443/~/antares-cse/antares-id/laison/" + meterNo + "",
    headers: {
      "X-M2M-Origin": "b07f83b1409132e9:84c6cc0b97b86892",
      "Content-Type": "application/json;ty=4",
      Accept: "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  daily_frozenAntares,
  alarmAntares,
  meter_taskAntares,
};

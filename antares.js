const axios = require("axios");
function daily_frozenAntares(meterNo) {
  let data = '{\n  "m2m:cin": {\n    "con": "{\\"status\\":\\"0\\"}"\n  }\n}';

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

module.exports = daily_frozenAntares;

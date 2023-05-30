const http = require("http");
const qs = require("querystring");
const mysql = require("mysql");

// antares
// daily_frozen
function daily_frozenAntares(pushType, meterNo, frozenDate, hoursData, todayVol, totalVol) {
  var myHeaders = new Headers();
  myHeaders.append("X-M2M-Origin", "b07f83b1409132e9:84c6cc0b97b86892");
  myHeaders.append("Content-Type", "application/json;ty=4");
  myHeaders.append("Accept", "application/json");

  var raw = `{\n  "m2m:cin": {\n    "con": "{\\"pushType\\":\\"${pushType}\\",\\"meterNo\\":\\"${meterNo}\\",\\"frozenDate\\":\\"${frozenDate}\\",\\"hoursData\\":\\"${hoursData}\\",\\"todayVol\\":\\"${todayVol}\\",\\"totalVol\\":\\"${totalVol}\\"}"\n}\n}`;

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://platform.antares.id:8443/~/antares-cse/antares-id/laison/" + meterNo + "", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

// alarm
function alarmAntares(pushType, meterNo, warningTime, warningCode, warningInfo) {
  var raw = `{\n  "m2m:cin": {\n    "con": "{\\"pushType\\":\\"${pushType}\\",\\"meterNo\\":\\"${meterNo}\\",\\"warningTime\\":\\"${warningTime}\\",\\"warningCode\\":\\"${warningCode}\\",\\"warningInfo\\":\\"${warningInfo}\\"}"\n}\n}`;

  var requestOptions = {
    method: "POST",
    headers: {
      "X-M2M-Origin": "b07f83b1409132e9:84c6cc0b97b86892",
      "Content-Type": "application/json;ty=4",
      Accept: "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  fetch("https://platform.antares.id:8443/~/antares-cse/antares-id/laison/" + meterNo + "", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

// meterTask
function meterTaskAntares(pushType, meterNo, taskType, state, serialNo, totalUsedVolume, totalPurchaseVolume, surplusVolume, totalUsedAmount, totalPurchaseAmount, surplusAmount, clock) {
  var myHeaders = new Headers();
  myHeaders.append("X-M2M-Origin", "b07f83b1409132e9:84c6cc0b97b86892");
  myHeaders.append("Content-Type", "application/json;ty=4");
  myHeaders.append("Accept", "application/json");

  var raw = `{\n  "m2m:cin": {\n    "con": "{\\"pushType\\":\\"${pushType}\\",\\"meterNo\\":\\"${meterNo}\\",\\"taskType\\":\\"${taskType}\\",\\"state\\":\\"${state}\\",\\"serialNo\\":\\"${serialNo}\\",\\"totalUsedVolume\\":\\"${totalUsedVolume}\\",\\"totalPurchaseVolume\\":\\"${totalPurchaseVolume}\\",\\"surplusVolume\\":\\"${surplusVolume}\\",\\"totalUsedAmount\\":\\"${totalUsedAmount}\\",\\"totalPurchaseAmount\\":\\"${totalPurchaseAmount}\\",\\"surplusAmount\\":\\"${surplusAmount}\\",\\"clock\\":\\"${clock}\\"}"\n}\n}`;

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://platform.antares.id:8443/~/antares-cse/antares-id/laison/" + meterNo + "", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

// buat koneksi ke database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "telkomaru123",
  database: "xirka-push",
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting to database: ", err);
    return;
  }
  console.log("connected to database");
});

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/laison/receive/data") {
    let requestBody = "";

    req.on("data", (chunk) => {
      requestBody += chunk.toString();
    });

    req.on("end", () => {
      const pushData = JSON.parse(requestBody);
      const pushType = pushData.pushType;

      res.writeHead(200, { "Content-Type": "application/json" });

      // cek jenis pushType dan lakukan penyimpanan ke tabel yang sesuai
      if (pushType === "DAILY_FROZEN") {
        const data = pushData.data;

        // lakukan penyimpanan ke tabel daily_frozen
        const query = `INSERT INTO daily_frozen (meterNo, frozenDate, hoursData, todayVol, totalVol) VALUES (?, ?, ?, ?, ?)`;
        const values = [data.meterNo, data.frozenDate, data.hoursData, data.todayVol, data.totalVol];
        connection.query(query, values, (error, results, fields) => {
          if (error) {
            console.error("error inserting data into daily_frozen table: ", error);
            res.end(JSON.stringify({ status: 500, message: "Error inserting data into database" }));
            return;
          }
          daily_frozenAntares(pushType, data.meterNo, data.frozenDate, data.hoursData, data.todayVol, data.totalVol);
          console.log("data inserted into daily_frozen table");
          res.end(JSON.stringify({ status: 200, message: "Data inserted successfully" }));
        });
      } else if (pushType === "ALARM") {
        const data = pushData.data;

        // lakukan penyimpanan ke tabel alarm
        const query = `INSERT INTO alarm (meterNo, warningTime, warningCode, warningInfo) VALUES (?, ?, ?, ?)`;
        const values = [data.meterNo, data.warningTime, data.warningCode, data.warningInfo];
        connection.query(query, values, (error, results, fields) => {
          if (error) {
            console.error("error inserting data into alarm table: ", error);
            res.end(JSON.stringify({ status: 500, message: "Error inserting data into database" }));
            return;
          }
          alarmAntares(pushType, data.meterNo, data.warningTime, data.warningCode, data.warningInfo);
          console.log("data inserted into alarm table");
          res.end(JSON.stringify({ status: 200, message: "Data inserted successfully" }));
        });
      } else if (pushType === "METER_TASK") {
        const data = pushData.data;

        // lakukan penyimpanan ke tabel meter_task
        const clock = data.detail ? data.detail.clock : undefined;
        const totalUsedVolume = data.detail ? data.detail.totalUsedVolume : undefined;
        const totalPurchaseVolume = data.detail ? data.detail.totalPurchaseVolume : undefined;
        const surplusVolume = data.detail ? data.detail.surplusVolume : undefined;
        const totalUsedAmount = data.detail ? data.detail.totalUsedAmount : undefined;
        const totalPurchaseAmount = data.detail ? data.detail.totalPurchaseAmount : undefined;
        const surplusAmount = data.detail ? data.detail.surplusAmount : undefined;
        const query = `INSERT INTO meter_task (meterNo, taskType, state, serialNo, totalUsedVolume, totalPurchaseVolume,surplusVolume, totalUsedAmount, totalPurchaseAmount, surplusAmount, clock) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?,?,?)`;
        const values = [data.meterNo, data.taskType, data.state, data.serialNo, totalUsedVolume, totalPurchaseVolume, surplusVolume, totalUsedAmount, totalPurchaseAmount, surplusAmount, clock];
        connection.query(query, values, (error, results, fields) => {
          if (error) {
            console.error("error inserting data into meter_task table: ", error);
            res.end(JSON.stringify({ status: 500, message: "Error inserting data into database" }));
            return;
          }
          meterTaskAntares(pushType, data.meterNo, data.taskType, data.state, data.serialNo, totalUsedVolume, totalPurchaseVolume, surplusVolume, totalUsedAmount, totalPurchaseAmount, surplusAmount, clock);
          console.log("data inserted into meter_task table");
          res.end(JSON.stringify({ status: 200, message: "Data inserted successfully" }));
        });
      } else {
        res.end(JSON.stringify({ status: 400, message: "Invalid pushType" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});

const express = require("express");
const { db } = require("../models/chatFormat");
const router = express.Router();
const chatRecord = [];
const dbData = require("../models/chatFormat");
router.get("/chat", function (req, res) {
  let q = req.query;
  if (q.user != "" && q.say != "") {
    let curTime = new Date();
    let status = "";
    let hours = curTime.getHours();
    if (curTime.getHours() >= 12) {
      status = "下午";
      if (hours >= 13) hours -= 12;
    } else status = "上午";
    let set =
      curTime.toLocaleDateString() +
      " " +
      status +
      String(hours) +
      ":" +
      String(curTime.getMinutes()) +
      ":" +
      String(curTime.getSeconds());
    console.log(curTime);
    let newItem = new dbData({
      user: q.user,
      say: q.say,
      time: set,
    });
    chatRecord.push(newItem);
  }
  // console.log(newItem);
  res.send(chatRecord);
});
router.get("/chat/clear", function (req, res) {
  chatRecord.length = 0;
  res.sendStatus(200);
  console.log("Clear successfully!");
});
router.get("/chat/save", async function (req, res) {
  try {
    await dbData.deleteMany({});
    await dbData.insertMany(chatRecord);
    console.log("Saving completely");
  } catch (err) {
    res.status(400);
    console.log("error while saving");
  }
});
router.get("/chat/reload", async function (req, res) {
  const allData = await dbData.find();
  let tmp;
  for (let item of allData) {
    tmp = new dbData({
      user: item.user,
      say: item.say,
      time: item.time,
    });
    chatRecord.push(tmp);
  }
  res.send(chatRecord);
});
module.exports = router;

let topicsArray=
[
    "尚未開學",
    "上課",
    "不上課",
    "上課",
    "不上課",
    "不上課",
];

let startDate = new Date();

function setMonthAndDay(startMonth, startDay)
{
    //一次設定好月分與日期
    startDate.setMonth(startMonth-1, startDay);
    //時間先忽略，設為0
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);

}

//先在程式碼中直接指定社團課程第一天
setMonthAndDay(4,1);
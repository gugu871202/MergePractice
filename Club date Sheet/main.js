$(document).ready(function(){
    setTable();
 
    //如果有人來設定日期
    $("#inputDate").change(function(){
        let inputDate = $(this).val();
        console.log(inputDate);//yyyy-mm-dd
        let splitText = inputDate.split("-");
        console.log(splitText);
        setMonthAndDay(splitText[1],splitText[2]);
        setTable();
    });
 
});

function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000)); //Cookie的時效性為1個月
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}

function checkCookie(){
    var user=getCookie("username");
    if (user!=""){
        alert("欢迎 " + user + " 再次访问");
    }
    else {
        user = prompt("请输入你的名字:","");
          if (user!="" && user!=null){
            setCookie("username",user,30);
        }
    }
}

 function setTable()
 {
     $("#courseTable").empty();
    //固定標題列
    $("#courseTable").append(
        "<tr><th>備註</th><th>時間</th><th>主題</th></tr>"
    );

    //反覆產生資料列
    let topicCount=topicsArray.length;

    //計算一天有多少毫秒
    let oneDayMilliseconds=24*60*60*1000;
    //3個月
    let monthDays=[31,29,31,30,31,30,31,31,30,31,30,31];
    for(let x=0; x<topicCount; x++)
    {
        //要加天數只能用getTime()加 不然用Date型態加會錯
        //getTime()單位為毫秒
        let thisDate= new Date(startDate.getTime()+1*x*oneDayMilliseconds);
        let trSpecial="<tr>"
        if(topicsArray[x]=="不上課")
        {
            trSpecial="<tr style='background-color:lightyellow'>";
        }
        $("#courseTable").append(
            trSpecial+ //用+才能換行
            "<td>"+ (x+1) +"</td>"+
            "<td>"+ thisDate.toLocaleDateString().slice(5) + "</td>"+
            "<td>"+ topicsArray[x]+"</td>"+
            "</tr>"
        ); //每一列有場次、預計日期、主題
    }
 }

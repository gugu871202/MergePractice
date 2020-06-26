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


 function setTable()
 {
     $("#courseTable").empty();
    //固定標題列
    $("#courseTable").append(
        "<tr><th>禮拜</th><th>時間</th><th>複習科目</th><th>修改</th></tr>"
    );

    //反覆產生資料列
    let topicCount=topicsArray.length;

    //計算一天有多少毫秒
    let oneDayMilliseconds=24*60*60*1000;
    //3個月
    let monthDays=[31,29,31,30,31,30,31,31,30,31,30,31];
    let day=['日','一','二','三','四','五','六']
    for(let x=0; x<7; x++)
    {
        //要加天數只能用getTime()加 不然用Date型態加會錯
        //getTime()單位為毫秒
        let thisDate= new Date();
        thisDate.setDate(thisDate.getDate()+x);
        let trSpecial="<tr>"
        if(topicsArray[x]=="不上課")
        {
            trSpecial="<tr style='background-color:lightyellow'>";
        }
        if(getCookie(x.toString())!="")//有cookie
            $("#courseTable").append(
                trSpecial+ //用+才能換行
                "<td>"+ (day[thisDate.getDay()]) +"</td>"+
                "<td>"+ (thisDate.getMonth()+1)+"/"+thisDate.getDate() + "</td>"+
                "<td id=td"+x+">"+ getCookie(x.toString())+"</td>"+
                "<td><input id="+x+" type=\"button\" value=\"編輯\" onclick=\"myMsg("+x+")\"></td>"+
                "</tr>"
            ); //每一列有場次、預計日期、主題
        else
            $("#courseTable").append(
                trSpecial+ //用+才能換行
                "<td>"+ (day[thisDate.getDay()]) +"</td>"+
                "<td>"+ (thisDate.getMonth()+1)+"/"+thisDate.getDate() + "</td>"+
                "<td id=td"+x+">"+ topicsArray[x]+"</td>"+
                "<td><input id="+x+" type=\"button\" value=\"編輯\" onclick=\"myMsg("+x+")\"></td>"+
                "</tr>"
            ); //每一列有場次、預計日期、主題
    }
 }

 function myMsg(id)
 {
    Username=(id).toString();
    message="請輸入您的行程："
    let result = prompt(message,"EX:補習/離散數學");
    if(result!=null)
    {
        setCookie(Username,result,30);
        let tdobj = document.getElementById('td'+id);
        let a=getCookie(Username);
        tdobj.innerText = a;
    }
    else
    {}
 }
 
 //設定cookie格式(document.cookie="username=John Doe; expires=Thu")
 function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
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
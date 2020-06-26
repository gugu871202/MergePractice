window.onload=function() //JS用來等網頁跑完執行function
{
    //document.write("Hello JavaScript!");
};



$(document).ready(function() //jQuery監聽JS的DOM文件跑完就開始執行function(較快)
{
    $("#random").click(function()
    {
        start_time = new Date().getTime();

        //numberOfListItem=3 (li標籤總共有幾個)
        let numberOfListItem= $("#choices li").length;
        //floor() 向下整數(量尺) random() 產生亂數(介於0-1之間)
        //random()*numberOfListItem 介於0~2之間
        let randomChildNumber= Math.floor(Math.random()*numberOfListItem);
        //eq=[]內的index值
        $("#random-result").text($("#choices li").eq(randomChildNumber).text());
        //$("#random-pic").attr("src", test[randomChildNumber]);
        let testSubjects=test[randomChildNumber].length;//n個科目
        let nowSubject=0;
        appendding(nowSubject,testSubjects,randomChildNumber);
    });
});

function appendding(nowSubject,testSubjects,randomChildNumber)
{
    $("#pic").empty();
    document.location.href="#";
        for(let x=0;x<test[randomChildNumber][nowSubject].length;x++)
        {
            $("#pic").append(
            "<img src=\""+
            test[randomChildNumber][nowSubject][x]+
            "\"width=80%\">"
            );
        }
        nowSubject++;
        //<input type="button" id="random" value="今晚，我想來點......">
        $("#pic").append(
            "<br><br><input type=\"button\" id=\"finish\" value=\"交卷\">"
        );
        $("#finish").click(function(){
            end_time = new Date().getTime();
            over_time=(end_time-start_time)/1000;
            var hours=Math.floor(over_time/3600);
            over_time=Math.floor(over_time%3600);
            var mins=Math.floor(over_time/60);
            over_time=Math.floor(over_time%60);
            alert('總共花了'+hours+'時'+mins+'分'+over_time+'秒');
            if(nowSubject<testSubjects)
            {
                var mymessage=confirm("請問要繼續下一個考科嗎？");
                if(mymessage==true)
                {
                    appendding(nowSubject,testSubjects,randomChildNumber);
                }
            }
            else
            {
                alert('恭喜你把這份考古題做完了！');
                $("#pic").empty();
                $("#random-result").text("?");
            }
            })
}
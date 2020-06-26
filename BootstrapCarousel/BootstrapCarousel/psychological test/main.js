$(document).ready(function()
{
    let currentQuiz=null;
    let score=0;
    $("#startButton").click(function() //標籤=>$("標籤") id=>$("#id")
    {
        if(currentQuiz==null)
        {
            //現在要做第一題
            currentQuiz=0;
            //顯示第一題題目
            $("#question").text(questions[0].question); //id=>$("#id") 關鍵詞:jQuery selector
            $("#options").empty(); //id=>$("#id")
            //加入questions[0].answers.length個選項
            for(let x=0;x<questions[0].answers.length;x++)
            {
                //新增東西到div區塊
                $("#options").append( 
                    "<input name='options' type='radio' value="+
                    x+
                    ">"+
                    "<label>"+questions[0].answers[x][0]+
                    "</label><br><br>"
                );
            }
            //更改button
            $("#startButton").attr("value","Next");
        }
        else
        {
            //可寫成$("input[type=checkbox]:checked").each(function () {c.push($(this).val());})
            $.each(
              //type=>$(":type") //each(variable,function)
                $(":radio"),function(i, val){
                    //檢查radio選了沒
                    if(val.checked)
                    {
                        score+=questions[currentQuiz].answers[i][1];
                        //是否下一個就已是最終成果(A~D)
                        if(currentQuiz==questions.length-1)
                        {
                            //最終成果
                            let finalResult=0;
                            if(score>=5&&score<=7)
                                finalResult=0;
                            else if(score>=8&&score<=13)
                                finalResult=1;
                            else if(score>=14&&score<=15)
                                finalResult=2;
                            $("#question").text(finalAnswers[finalResult][0]);
                            $("#options").empty();
                            $("#options").append(finalAnswers[finalResult][1]+"<br><br>");
                            currentQuiz=null;
                            score=0;
                            $("#startButton").attr("value","Restart");
                        }else{
                            currentQuiz++;
                            //加入題目
                            $("#question").text(questions[currentQuiz].question);
                            $("#options").empty();
                            //加入選項
                            for(let x=0;x<questions[currentQuiz].answers.length;x++)
                            {
                                $("#options").append(
                                    "<input name='options' type='radio' value="+
                                    x+
                                    ">"+
                                    "<label>"+questions[currentQuiz].answers[x][0]+
                                    "</label><br><br>"
                                );
                            }
                        }
                        return false;
                    }
                }  
            );
        }
    });
})
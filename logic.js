'use strict';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function qCheck(question,usedQ)
{
    for(i = 0;i < userQ.lenght();i++)
    {
        if(question == usedQ[i])
        {
            return false;
        }
    }
    return true;

}
function cCheck(combo, lastC)
{
    if(combo in lastC)
    {
        return false;
    }
    else
    {
        return true;
    }
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function httpGetData(theUrl,data)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( data );
    return xmlHttp.responseText;
}
function httpPush(Url, data)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PUSH",Url,false);
    xmlHttp.send(data);
}


function main()
{
    let qNum = getRandomInt(249);
    var usedArr = httpGet("localhost:3000/api/qcheck");
    for(i = 0; i > -1; i++)
    {
    if(qcheck(qNum,usedArr) == true)
    {
        var questions = httpGetData("localhost:3000/api/qFetch",qNum);
        var lastC = httpGet("localhost:3000/api/cCheck");
        var combo = questions.Combinations;
        if(cCheck(combo,lastC) == true)
        {
            var q1 = questions.PartA;
            var q2 = questions.PartB;
            document.getElementById('question1').value = q1;
            document.getElementById('question2').value = q2;
            httpPush('localhost:3000/api/qUpdate',qNum);
            httpPush('localhost:3000/api/cUpdate', combo);
            break;
        }
        else
        {
            qNum = getRandomInt(249);
        }
    }
    else
    {
        qNum = getRandomInt(249);
    }

    }
}




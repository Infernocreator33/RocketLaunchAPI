/*
    Author: Zachary Sexton
    Date: 11/09/18

*/
//variables
var myTable = document.getElementById("myTable");
var row1 = document.getElementById("row1");
var row2 = document.getElementById("row2");
var row3 = document.getElementById("row3");
var row4 = document.getElementById("row4");
var row5 = document.getElementById("row5");
var myRows = new Array(row1, row2, row3, row4, row5);
var myHeader = document.getElementById("myHeader");
var next5Button = document.getElementById("next5");
var next5Falcon = document.getElementById("nextFalcon");
var next5Ariane = document.getElementById("nextAriane");
var next5LauncherOne = document.getElementById("nextLauncherOne");
var countdownTimer = document.getElementById("countdown");
//event listeners
window.addEventListener("load", next5Launches);
next5Button.addEventListener("click", next5Launches);
next5Falcon.addEventListener("click", nextFalconLaunches);
next5Ariane.addEventListener("click", nextArianeLaunches);
next5LauncherOne.addEventListener("click", nextLauncherOneLaunches);

//http request
var httpRequest = new XMLHttpRequest();
function next5Launches()
{
   
    httpRequest.abort();
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?next=5");
    httpRequest.send();
    myHeader.innerHTML = "Next Five Launches";
    httpRequest.onreadystatechange = launchFunction;
}
function nextFalconLaunches()
{
   
    httpRequest.abort();
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?name=falcon&next=5");
    httpRequest.send();
    myHeader.innerHTML = "Falcon Launches";
    httpRequest.onreadystatechange = launchFunction;
}
function nextArianeLaunches()
{
    
    httpRequest.abort();
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?name=ariane&next=5");
    httpRequest.send();
    myHeader.innerHTML = "Ariane Launches";
    httpRequest.onreadystatechange = launchFunction;
}
function nextLauncherOneLaunches()
{
    //clear last three non LauncherOne rows
    row3.innerHTML = "";
    row4.innerHTML = "";
    row5.innerHTML = "";
    httpRequest.abort();
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?name=launcherone&next=5");
    httpRequest.send();
    myHeader.innerHTML = "LauncherOne Launches";
    httpRequest.onreadystatechange = launchFunction;
}

function launchFunction()
{
    //check ready state and status
    if(httpRequest.readyState === 4 && httpRequest.status === 200)
    {
        var launchReport = httpRequest.responseText;
        console.log("***************This is my response text or stringified object************");
        console.log(launchReport);
        //taken var out due to suggestion makes timer clear
        launchObject = JSON.parse(launchReport);
        console.log("*************This is the Parsed JSON Object*****************");
        console.log(launchObject);
        console.log("*********This is the length of launch list********");
        console.log(launchObject.launches.length);
        console.log("****************This is the name of the first launch*************");
        console.log(launchObject.launches[0].name);


            //my timer
            var timer = setInterval(function(){
            var countdown = new Date(launchObject.launches[0].net).getTime();
            var now = new Date().getTime();
            var distanceBetween = countdown - now;
            //XXd XXh XXm XXs format for countdown
            var days = Math.floor(distanceBetween / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distanceBetween % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distanceBetween % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distanceBetween % (1000 * 60)) / 1000);

            
            countdownTimer.innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

            //clear and change display
            if (distanceBetween < 0) {
                clearInterval(timer);
                countdownTimer.innerHTML = "Launched!!!";
            }
            }, 1000);
            
                //pull to get name and launch date for all rows
                for(let i = 0; i < 5; i++)
                {
                    myRows[i].innerHTML = launchObject.launches[i].name + " || " + launchObject.launches[i].net;
                }
            
            }
        }




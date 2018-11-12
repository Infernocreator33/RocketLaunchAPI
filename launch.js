/*
    Author: Zachary Sexton
    Date: 11/09/18

*/
"use strict";
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
var countdown = document.getElementById("countdown");
window.addEventListener("load", next5Launches);
next5Button.addEventListener("click", next5Launches);
next5Falcon.addEventListener("click", nextFalconLaunches);
next5Ariane.addEventListener("click", nextArianeLaunches);
next5LauncherOne.addEventListener("click", nextLauncherOneLaunches);
var httpRequest = new XMLHttpRequest();

function myCountdown()
{
    //coundown

}

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
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?name=falcon");
    httpRequest.send();
    myHeader.innerHTML = "Falcon Launches";
    httpRequest.onreadystatechange = launchFunction;
}
function nextArianeLaunches()
{
    httpRequest.abort();
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?name=ariane");
    httpRequest.send();
    myHeader.innerHTML = "Ariane Launches";
    httpRequest.onreadystatechange = launchFunction;
}
function nextLauncherOneLaunches()
{
    httpRequest.abort();
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?name=launcherone");
    httpRequest.send();
    myHeader.innerHTML = "LauncherOne Launches";
    httpRequest.onreadystatechange = launcherOneFunction;
}
function launchFunction()
{
    if(httpRequest.readyState === 4)
    {
        var launchReport = httpRequest.responseText;
        console.log("***************This is my response text or stringified object************");
        console.log(launchReport);
        var launchObject = JSON.parse(launchReport);
        console.log("*************This is the Parsed JSON Object*****************");
        console.log(launchObject);
        console.log("*********This is the length of launch list********");
        console.log(launchObject.launches.length);
        console.log("****************This is the name of the first launch*************");
        console.log(launchObject.launches[0].name);
        for(let i = 0; i < 5; i++)
        {
            //var countdown = new Date(launchObject.launches[i].windowend).getTime();
            myRows[i].innerHTML = launchObject.launches[i].name + " || " + launchObject.launches[i].windowend;
        }
    }
}

function launcherOneFunction()
{
    if(httpRequest.readyState === 4)
    {
        var launchReport = httpRequest.responseText;
        console.log("***************This is my response text or stringified object************");
        console.log(launchReport);
        var launchObject = JSON.parse(launchReport);
        console.log("*************This is the Parsed JSON Object*****************");
        console.log(launchObject);
        console.log("*********This is the length of launch list********");
        console.log(launchObject.launches.length);
        console.log("****************This is the name of the first launch*************");
        console.log(launchObject.launches[0].name);


        row1.innerHTML = launchObject.launches[0].name + " || " + launchObject.launches[0].windowend;
        row2.innerHTML = launchObject.launches[1].name + " || " + launchObject.launches[1].windowend;
        row3.innerHTML = "";
        row4.innerHTML = "";
        row5.innerHTML = "";
    }
}
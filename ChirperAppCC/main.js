﻿var firebaseUrl = "";
myTweets = [];

var PersonProfile = function(name,phone, email, firebaseUrl){
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.firebaseUrl = firebaseUrl;
}

var MyFriends = function(friends, group){

    this.friends = friends;
    this.group = group;
}

var Tweets = function(name, message, dateTimeStamp){
    this.name = name;
    this.message = message;
    this.dateTimeStamp = dateTimeStamp;
}


var postTweets = function (tweet) {
    var request = new XMLHttpRequest();
    request.open('POST', myURL, true)
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var response = JSON.parse(this.response);
            data.key = response.name;
            myTweets.push(tweet);
            displayMyTweets();            
        }
        else {
            console.log(this.response);
        }
    }
    request.send(JSON.stringify(tweet));
}


var getMyTweets = function () {
    var request = new XMLHttpRequest();
    request.open('GET', myUrl, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var response = JSON.parse(this.response);
            for (var propName in response) {
                response[propName].key = propName;
                mytweets.push(response[propName]);
            }
            displayMyTweets();
        }
        else {
            console.error(this.response);
        }
    }
    request.send();
}

var addTweet = function () {
    var name = "Aisha" // this should probably be the firebaseURL
    var message = document.getElementById('tweet').value;
    var timeStamp = "";
    var myTweet = new myTweet(name, message, dateTimeStamp);
    postTweet(myTweet);
    document.getElementById('tweet').value = "";
}

var displayMyTweets = function () {
   
}
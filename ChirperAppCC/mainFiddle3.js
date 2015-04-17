﻿var aishaUrl = "https://glowing-fire-7170.firebaseio.com/chirper/.json";
var rickyFirebaseUrl = "https://churperapprr.firebaseio.com/chirper/.json";
var myUrl = "https://glaring-inferno-2578.firebaseio.com/project01/.json";
var markFirebaseUrl = "https://chrirprformark.firebaseio.com/.json";
myTweets = [];

var PersonProfile = function (name, phone, email, firebaseUrl) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.firebaseUrl = firebaseUrl;
}

var MyFriends = function (friends, group) {

    this.friends = friends;
    this.group = group;
}

var Tweets = function (name, message, timeStamp) {
    this.name = name;
    this.message = message;
    this.timeStamp = timeStamp;
}


var postTweets = function (tweet) {
    var request = new XMLHttpRequest();
    request.open('POST', myUrl, true)
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var response = JSON.parse(this.response);
            tweet.key = response.name;
            myTweets.push(tweet);
            displayMyTweets();
            alert(this.response);

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
                myTweets.push(response[propName]);
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
    var timeStamp = "will add later";
    var myTweet = new Tweets(name, message, timeStamp);
    postTweets(myTweet);
    document.getElementById('tweet').value = "";
}

var displayMyTweets = function () {
    //document.getElementById('DisplayMytweets').innerHTML = '';
    //var elemString = '';
    //for (var i = 0; i < myTweets.length; i++) {
    //    elemString += '<tr>'
    //    elemString += '<td>' + myTweets[i].name + '</td>'
    //    elemString += '<td>' + myTweets[i].message + '</td>'
    //    elemString += '<td>' + myTweets[i].timeStamp + '</td>'
    //    elemString += '<td><button class="btn btn-danger" onclick="addTweets(' + i + ')">Add Tweets</button></td>'
    //    elemString += '</tr>'
    //}
    //document.getElementById('DisplayMyTweets').innerHTML = elemString;
}


var displayTimeline = function () {

}

var addFriend = function () {

}

var deleteFriend = function (i) {
    var request = new XMLHttpRequest();
    request.open('DELETE', myUrl + MyFriends.friend[i].key + '/.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            MyFriends.friends.splice(i, 1);
            PrintMyFriends();

        }
    }
    request.send();
}
//getMyFriends();

var searchTweets = function () {

}

var updateProfile = function () {

}

var getAllTweets = function () {
    getMyTweets();
    getEricTweets();
    getRickyTweets();
    getMarkTweets();
    // this should probably be get Friends' tweets.... refactor later
}
getMyTweets();
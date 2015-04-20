var myUrl = "https://glowing-fire-7170.firebaseio.com/chirper/.json";
var rickyUrl = "https://churperapprr.firebaseio.com/chirper/.json";
var ericmyUrl = "https://glaring-inferno-2578.firebaseio.com/project01/.json";
var markmyUrl = "https://chrirprformark.firebaseio.com/.json";
myTweets = [];
myFriends = [rickyUrl, ericmyUrl, markmyUrl]; // this will be an object 


var PersonProfile = function (name, phone, email, firebaseUrl) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.firebaseUrl = firebaseUrl;
}

//var MyFriends = function (friends, group) {

//    this.friends = friends;
//    this.group = group;
//}

var Tweets = function (name, message) {
    this.name = name;
    this.message = message;
    this.timeStamp = new Date();
}


var postTweets = function (tweet) {
    var request = new XMLHttpRequest();
    request.open('POST', myUrl, true)
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var response = JSON.parse(this.response);
            tweet.key = response.name;
            myTweets.push(tweet);           
            displayTweets();
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
            displayTweets();            
        }
        else {
            console.error(this.response);
        }
    }
    request.send();
}


var getAllTweets = function () {    
    for (var i = 0; i < myFriends.length; i++) {
        var request = new XMLHttpRequest();
        request.open('GET', myFriends[i], true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                var response = JSON.parse(this.response);                
                for (var propName in response) {
                    response[propName].key = propName;
                    myTweets.push(response[propName]);
                }                
                displayTweets();              
            }
            else {
                console.error(this.response);
            }
        }
        request.send();
    }
}

var addTweet = function () {
    var name = "Aisha" // this should probably be the firebaseURL
    var message = document.getElementById('tweet').value;
    var timeStamp = new Date();
    var myTweet = new Tweets(name, message, timeStamp);
    postTweets(myTweet);
    document.getElementById('tweet').value = "";
}

var displayMyTweets = function () {
    document.getElementById('DisplayMyTweets').innerHTML = '';
    var elemString = '';
    for (var i = 0; i < myTweets.length; i++) {
        if(myTweets[i].name === "Aisha"){
            elemString += '<tr>'
            elemString += '<td>' + myTweets[i].name + '</td>'
            elemString += '<td>' + myTweets[i].message + '</td>'
            elemString += '<td>' + myTweets[i].timeStamp + '</td>'
            elemString += '<td><button class="btn btn-danger" onclick="reTweet(' + i + ')">Re- Tweet</button></td>'
            elemString += '</tr>'
        }        
    }
    document.getElementById('DisplayMyTweets').innerHTML = elemString;
}

var displayTweets = function () {
    displayTimeline();
    displayMyTweets();
}


var displayTimeline = function () {
    document.getElementById('DisplayAllTweets').innerHTML = '';
    var elemString = '';
    for (var i = 0; i < myTweets.length; i++) {        
            elemString += '<tr>'
            elemString += '<td>' + myTweets[i].name + '</td>'
            elemString += '<td>' + myTweets[i].message + '</td>'
            elemString += '<td>' + myTweets[i].timeStamp + '</td>'
            elemString += '<td><button class="btn btn-danger" onclick="reTweets(' + i + ')">Re-Tweet</button></td>'
            elemString += '</tr>'        
    }
    document.getElementById('DisplayAllTweets').innerHTML = elemString;
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


var searchTweets = function () {

}

var updateProfile = function () {

}

var reTweet = function () {
    alert("this function is not working yet");
}

var sortTweets = function () {
    //myTweets.sort(function (b, a) {
    //    b = b.timeStamp; a = a.timeStamp;
    //    return b - a;
    //})
}

var pollTweets = function () {  
    document.getElementById('DisplayMyTweets').innerHTML = '';
    document.getElementById('DisplayAllTweets').innerHTML = '';
    getMyTweets();
    getAllTweets();
    myTweets = [];
}

var interval = setInterval(pollTweets, 60000);


pollTweets();


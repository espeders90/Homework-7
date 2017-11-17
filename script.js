$( document ).ready(function() {

console.log("Script connected");

     var config = {
            apiKey: "AIzaSyAcH0yFgZLWrsdfqAn26OQnt560W3M_kpA",
            authDomain: "code2-98640.firebaseapp.com",
            databaseURL: "https://code2-98640.firebaseio.com",
            projectId: "code2-98640",
            storageBucket: "code2-98640.appspot.com",
            messagingSenderId: "234609063188"
     };
     
firebase.initializeApp(config);
    
/* global firebase moment*/

var database = firebase.database();

$("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
//The event.preventDefault() method stops the default action of an element from happening. For example: Prevent a submit button from submitting a form.    

//User input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

//"temp" object to hold data
    
    var newTrain = {
    
        name: trainName,
        destination: trainDestination,
        first: firstTrain,
        frequency: trainFrequency,
      };
      

//Uploads employee data to database
     database.ref().push(newTrain);
     
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.first);
      console.log(newTrain.frequency);
     
     $("#train-name-input").val("");
     $("#destination-input").val("");
     $("#first-train-input").val("");
     $("#frequency-input").val("");
});

//Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added",function(childSnapshot,
prevChildkey) {
    
    console.log(childSnapshot.val());
    
    
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

// variable for minutes away

    var timeConvert = moment(firstTrain, "hh:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(timeConvert), "minutes");
    console.log("Time Difference: " + timeDiff);
    
    var timeRemaining = timeDiff % trainFrequency;
    console.log("Time remaining: " + timeRemaining);
    
    var minsAway = trainFrequency - timeRemaining;
    console.log("Minutes until next train: " + minsAway);
    
    var newtrain = moment().add(minsAway, "minutes").format("hh:mm");
    console.log("Arrival Time: " + moment(newtrain).format("hh:mm A"));
    
    //Add data into table
    $("#train-table > tbody").append("<tr><th>" + trainName + "</th><td>" + trainDestination + "</td><th>" + trainFrequency + "</th><th>" + newtrain +"</th><th>" + minsAway + "</th></tr>");
});

//create method to retrieve database material 
//create for loop created method
//inside the for loop dynamicly populate the table

});
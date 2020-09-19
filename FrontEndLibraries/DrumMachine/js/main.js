//----JQUERY - DRUM MACHINE----//

//----EVENTS----//

$(document).ready(function() {

    //----DATA----//

    // Button names array
    var $buttonNames = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

    // Keyboard codes to corresponding symbol
    var $keyCodes = {
        81 : "Q",
        87 : "W",
        69 : "E",
        65 : "A",
        83 : "S",
        68 : "D",
        90 : "Z",
        88 : "X",
        67 : "C",
        113 : "q",
        119 : "w",
        101 : "e",
        97 : "a",
        115 : "s",
        100 : "d",
        122 : "z",
        120 : "x",
        99 : "c"
    }

    // Buttons with corresponding sounds
    var $buttonContent = {
        "Q" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
        "W" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
        "E" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
        "A" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
        "S" : "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
        "D" : "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
        "Z" : "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
        "X" : "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
        "C" : "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",  
    }

    // An object can be iterated through with forEach through keys or values
    // If a button is fourth in row, a page break is inserted, so that each
    // row has exactly three buttons

    // After that, a new button is added to corresponding element on page
    Object.keys($buttonContent).forEach($key => {   
        if (($buttonNames.indexOf($key)) % 3 == 0) 
            $("#drum-pads").append("<br />");

        var $button = appendButtons($key, $buttonContent[$key]);       
        $("#drum-pads").append($button);
    });
  
    // On drum-pad click play the bound audio
    $(".drum-pad").click(function() {
        var $sounds = document.getElementsByTagName('audio');
        var $id = this.innerText.split("-");
        stopAndPlay($sounds, $id);
    });   

    // On key press play the bound audio
    $(document).keypress(function (e) {  
        if (e.keyCode in $keyCodes)
            $("#button-"+$keyCodes[e.keyCode].toUpperCase()).click();   
    });
});

//----FUNCTIONS----//

// Play corresponding audio track
function stopAndPlay($sounds, $id) {
    // Pause all currently playing sounds and set it to start
    Object.values($sounds).forEach($sound => {
        $sound.pause();
        $sound.currentTime = 0;
    }); 
    
    // Show description (name) of active track and play audio
    document.getElementById("display").innerText = document.getElementById($id).title;
    document.getElementById($id).play();
}

// Append button elements to designated area
function appendButtons(name, audio) {
    // Create new elements and set attributes
    var $button = document.createElement("button");
    var $audioContent = document.createElement("audio");

    // Button attributes
    $button.className = "btn btn-primary drum-pad";
    $button.innerText = name;
    $button.id = "button-" + name;

    // Audio content attributes
    $audioContent.id = name;
    $audioContent.src = audio;
    $audioContent.className = "clip";
    $audioContent.type = "audio/mp3";
    $audioContent.title = audio.split("/")[audio.split("/").length - 1];

    // Append and return
    $button.appendChild($audioContent);
    return $button;
}
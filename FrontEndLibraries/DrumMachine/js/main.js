$(document).ready(function() {

    var $buttonNames = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

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

    Object.keys($buttonContent).forEach($key => {   
        if (($buttonNames.indexOf($key)) % 3 == 0) 
            $("#drum-pads").append("<br />");

        var $button = appendButtons($key, $buttonContent[$key]);       
        $("#drum-pads").append($button);
    });
  
    $(".drum-pad").click(function() {
        var $sounds = document.getElementsByTagName('audio');
        var $id = this.innerText.split("-");

        stopAndPlay($sounds, $id);
    });   

    $(document).keypress(function (e) {
        
        if (e.keyCode in $keyCodes)
            $("#button-"+$keyCodes[e.keyCode].toUpperCase()).click();   
    });
});

//----Functions----//

function stopAndPlay($sounds, $id) {
    Object.values($sounds).forEach($sound => {
        $sound.pause();
        $sound.currentTime = 0;
    }); 
    
    document.getElementById("display").innerText = document.getElementById($id).title;
    document.getElementById($id).play();
}

function appendButtons(name, audio) {
    var $button = document.createElement("button");
    var $audioContent = document.createElement("audio");

    $button.className = "btn btn-primary drum-pad";
    $button.innerText = name;
    $button.id = "button-" + name;

    $audioContent.id = name;
    $audioContent.src = audio;
    $audioContent.className = "clip";
    $audioContent.type = "audio/mp3";
    $audioContent.title = audio.split("/")[audio.split("/").length - 1];

    $button.appendChild($audioContent);
    
    return $button;
}
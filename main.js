
prediction_1 = "";

prediction_2 = "";


Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 100
});

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}

console.log("ml5.version: ", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/U8VImCT4v/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!")
}

function Speak(){
    synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = " And second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){

    if(error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        Speak();
        if(prediction_1 == "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128512;";
        }
        if(prediction_1 == "Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(prediction_1 == "Angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }

        if(prediction_2 == "Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        }
        if(prediction_2 == "Sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if(prediction_2 == "Angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }

    }
}
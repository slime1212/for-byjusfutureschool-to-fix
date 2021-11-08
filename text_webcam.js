p1 = "";
p2 = "";

Webcam.set({ width:350, height:300, image_format : 'png', png_quality:90 });

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapShot() {
    Webcam.snap(function(data_uri) { document.getElementById("result").innerHTML = '<img id="capture-image" src="'+data_uri+'">'; })
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/m4__KX811/model.json', modelLoaded)

function modelLoaded() { console.log('modelLoaded') }

function speak() {
    var synth = window.speechSynthesis;

    var speakData1 = "The first prediction is " + p1;
    var speakData2 = "The second prediction is " + p2;

    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);

    synth.speak(utterThis)
}

function check() {
    img = document.getElementById("capture-image");
    classifier.classify(img, gotResult)
}

function gotResult(e, result) {
    if (e) {
        console.error(e)
    } else {
        console.log(result)
    }

    document.getElementById("result-emotion-name-1").innerHTML = result[0].label;
    document.getElementById("result-emotion-name-2").innerHTML = result[1].label;

    p1 = result[0].label;
    p2 = result[1].labe1;

    speak();
    
    if (result[0].label == "happy") { document.getElementById("update-emoji-1").innerHTML = "&#128522;" }
    if (result[0].label == "sad") { document.getElementById("update-emoji-1").innerHTML = "&#128577;" }
    if (result[0].label == "angry") { document.getElementById("update-emoji-1").innerHTML = "&#128544;" }
    if (result[0].label == "silly") { document.getElementById("update-emoji-1").innerHTML = "&#128541;" }

    if (result[0].label == "happy") { document.getElementById("update-emoji-2").innerHTML = "&#128522;" }
    if (result[0].label == "sad") { document.getElementById("update-emoji-2").innerHTML = "&#128577;" }
    if (result[0].label == "angry") { document.getElementById("update-emoji-2").innerHTML = "&#128544;" }
    if (result[0].label == "silly") { document.getElementById("update-emoji-2").innerHTML = "&#128541;" }
}
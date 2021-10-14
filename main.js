video = "";
status = "";
objects = [];

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 300, 300);

        if(status!=""){

            objectDetector.detect(video, gotResult);

            for(var i=0; i<objects.length; i++) {
                document.getElementById("Status").innerHTML="Status : Objects Detected";
                document.getElementById("Objects").innerHTML="Number of Objects : "+objects.length;
                
                fill("#8B0000");
                percent = floor(objects[i].confidence*100);
                text(objects[i].label+""+percent+"%", objects[i].x, objects[i].y);
                noFill();
                stroke("#8B0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                console.log("Hello this is a test");
            }

        }
    }

function ST() {
   object_detector = ml5.objectDetector("COCOSSD", modelLoaded);
   document.getElementById("Status").innerHTML="Status - Detecting Objects";
}

function modelLoaded() {
    console.log("Model is loaded…");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if(error){
        console.error(error);
    }

    else {
        console.log(results);
        objects = results;
    }
}
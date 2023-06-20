objects=[];
Status="";
input_text="";

function setup(){
    canvas=createCanvas(300,290);
    canvas.position(500,250);
    video=createCapture(VIDEO);
    video.size(300,290);
    video.hide();
}

function start(){
    object_detector=ml5.objectDetector("cocossd",model_loaded);
    document.getElementById("Name_object").innerHTML="Status : Detecting Objects"
    text=document.getElementById("Name_object").value;
    if(objects == text){
        document.getElementById("status").innerHTML="Mentioned object is detected";
    }
}

function model_loaded(){
    console.log("model loaded");
    status=true;
}

function got_results(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,480,380);
    
    if(status != ""){
    object_detector.detect(video,got_results)

    for(i=0; i < objects.length ; i++){
        document.getElementById("number_of_objects").innerHTML="Objects Detected are " + objects.length;

        fill("red");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label + "" + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
        noFill();
        stroke("red");
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
    }
    
    }
}
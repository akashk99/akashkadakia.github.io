var xsf = 1000/50;
var ysf = 1000/50;
var xslider;
var input;
var equationF = "";
var equationG = "";
var checkF;
var checkG;
var slopeF=0;
var slopeG=0;

var bA = 0;
var bB = 0;

var a = 0;
var b = 0;
function setup(){

  createCanvas(1400,1000);


  translate(500,500);
  xslider = createSlider(20,200,20,0.0);
  xslider.position(1140,180);
  yslider = createSlider(20,200,20,0.0);
  yslider.position(1140,220);

  inputF = createInput("");
  inputF.position(1140,20);
  submitF = createButton("Graph f(x)")
  submitF.position(1280,20);

  inputG = createInput("");
  inputG.position(1140,60);
  submitG = createButton("Graph g(x)")
  submitG.position(1280,60);

  inputA = createInput("0");
  inputA.position(1140,100);


  inputB = createInput("0");
  inputB.position(1140,140);

  inputBoundedB = createInput("0");
  inputBoundedB.position(1140,300);

  inputBoundedA = createInput("0");
  inputBoundedA.position(1140,260);

  checkF = createCheckbox("f(x)",false);
  checkG = createCheckbox("g(x)",false);
  checkF.position(1160,425);
  checkG.position(1160,465);


  strokeWeight(4);





}




function draw(){
  clear();
  xsf = xslider.value();
  ysf = yslider.value();

  inputF.input(function(){
        clear();
        submitF.mousePressed(function(){
          equationF = inputF.value();

        });



    });

  inputA.input(function(){
        clear();

          a = parseInt(inputA.value(),10);




    });

  inputB.input(function(){
        clear();

          b = parseInt(inputB.value(),10);
    });


  inputBoundedA.input(function(){
        clear();

          bA = parseInt(inputBoundedA.value(),10);




    });

  inputBoundedB.input(function(){
        clear();

          bB = parseInt(inputBoundedB.value(),10);





    });

  inputG.input(function(){

        submitG.mousePressed(function(){
          equationG = inputG.value();
          console.log(inputG.value());
        });



    });



  translate(500,500);
  strokeWeight(2);
  line(0,-500,0,500);
  strokeWeight(2);
  line(-500,0,550,0);
  drawTangent((mouseX-500)/xsf);
  drawText();


  for (i=-1000;i<550;i+=xsf){
    line(i,-5,i,5);
  }

  for (i=-1000;i<1000;i+=ysf){
    line(-5,i,5,i);
  }


  drawBoundedArea(bA,bB);
  drawArea(a,b);

  strokeWeight(2);
  for(i=-25;i<25;i+=0.009){
    // line(i*sf,f(i)*sf,i*sf+i,f(i)*sf+i);
    // point(i*xsf,f(i)*ysf);

    if (f(i) < f(i+0.001)){
      line(i*xsf,f(i)*ysf,i*xsf,f(i+0,001)*ysf);
    } else {
      line(i*xsf,f(i)*ysf,i*xsf,f(i-0.001)*ysf)
    }

  }

  for(i=-25;i<25;i+=0.009){

    // line(i*sf,g(i)*sf,i*sf+i,g(i)*sf+i);
    point(i*xsf,g(i)*ysf);
  }
  stroke("black");





}


function drawArea(a,b){
  fill("green");
  strokeWeight(2);
  let dx = 0.01;
  let sum = 0;

  for(i=a;i<=b+dx;i+=dx){
    rect(i*xsf,0,dx,f(i)*ysf);

    sum += dx*f(i);
  }


  sum*=-1;
  sum = sum.toFixed(2);
  strokeWeight(0.5);
  text("Net-Signed Area: " + sum.toString(),730-170,-110);
  strokeWeight(4);
}

function drawText(){
  // clear();
  stroke("green");
  strokeWeight(0.5)
  textSize(12);


  text("f(x)", 730-170,-475);
  text("g(x)", 730-170,-435);
  text("a", 730-170,-395);
  text("b", 730-170,-355);
  text("xScale", 730-170,-315);
  text("yScale", 730-170,-275);
  text("Bounded a", 730-170,-235);
  text("Bounded b", 730-170,-195);



  strokeWeight(4);
  stroke("black");
}

function drawBoundedArea(a,b){
  fill("green");
  strokeWeight(2);
  let dx = 0.001;
  let sum = 0;

  for(i=a;i<=b+dx;i+=dx){
    if (g(i) > f(i)){
      rect(i*xsf,f(i)*ysf,dx,(g(i)-f(i))*ysf);
      sum += dx*(Math.abs(g(i)-f(i)));
    } else {
      rect(i*xsf,g(i)*ysf,dx,(f(i)-g(i))*ysf);
      sum += dx*(Math.abs(g(i)-f(i)));
    }
  }


  sum;
  sum = sum.toFixed(2);
  strokeWeight(0.5);
  text("Bounded Area: " + sum.toString(),730-170,-150);
  strokeWeight(4);
}



function drawTangent(x){
  if (checkF.checked()){
    stroke("green");
    strokeWeight(6);
    slopeF = (f(x)-f(x+0.0001))/(0.0001);
    slopeF*=-1;
    strokeWeight(4);

    line((x-2)*xsf,(f(x)-2*slopeF)*ysf,(x+2)*xsf,(f(x)+2*slopeF)*ysf);
    stroke("black");
    let b = f(x)-slopeF*x;
    b = b.toFixed(2);

  }

  if (checkG.checked()){
    stroke("green");
    strokeWeight(6);
    slopeG = (g(x)-g(x+0.0001))/(0.0001);
    slopeG*=-1;
    strokeWeight(4);

    line((x-2)*xsf,(g(x)-2*slopeG)*ysf,(x+2)*xsf,(g(x)+2*slopeG)*ysf);
    stroke("black");
    let b = g(x)-slopeG*x;
    b = b.toFixed(2);


  }
  stroke("green");
  strokeWeight(0.5)
  textSize(12);
  text("Slope: "+slopeF.toFixed(2),730-170,-70);
  text("Slope: "+slopeG.toFixed(2),730-170,-30);
  strokeWeight(4);
  stroke("black");


}



function f(x){
  y = eval(equationF);
  return -y;
}

function g(x){
  y = eval(equationG);
  return -y;
}

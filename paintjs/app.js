const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range= document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR =""                //이거 이해가 잘 안됨 =>영상 2.5 5분정도에 나옴
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;    //==>1번째 방법 (캠퍼스 크기지정해주는)   이걸 pixel modifier에 사이즈를 준다고 말함
canvas.height=CANVAS_SIZE;

//canvas.width = canvas.offsetWidth;      ==>2번째 방법
//canvas.height = canvas.offsetHeight;

//canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;       //==>3번째방법
//canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);        //이건 마우스 오른쪽클릭해서 저장할때 배경지정안해주면 투명배경으로 설정되는것을 막기위한 코드임
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth = 2.5;                  //linewidth는 context의 그 굵기를 조절하는것을 말하는것임
//ctx.fillStyle = "green";
//ctx.fillRect(50, 20, 100, 49);            //이 사각형안에서 계속 그리는거 가능함
// ctx.fillStyle = "purple";
// ctx.fillRect(50, 20, 100, 49); 

let painting = false;
let filling = false;

function stopPainting(){
  painting  =false;
}

function startPainting(){
  painting=true;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();        
    ctx.moveTo(x,y);            // ==>mouseleave될때도 멈추지않고 나갔다 들어와도그래도 선그려지게 할려면 없에야함 그리고 mouseenter추가부분보면 됨
  }else{
    ctx.lineTo(x, y);       //lineto/stroke는 마우스를 움직이는 내내ㅐ 발생함
    ctx.stroke();
    //ctx.closePath();           =>다른효과주는것임
    }

}

//ctx.beginPath(); 경로 생성
//ctx.moveTo(x, y); 선 시작 좌표
//ctx.lineTo(x, y); 선 끝 좌표
//ctx.stroke(); 선 그리기

function onMouseDown(event){
  painting = true;
}

function onMouseUp(event){
  stopPainting()
  //painting = false;
  //stopPainting() =>이렇게 하지 않는 이유는 나중에line이필요하기 때문임
}

function onMouseLeave(event){
  painting=false;
}
/*function onMouseEnter(event){
  x = event.offsetX;
  y = event.offsetY;
  ctx.move(x,y);

}*/

function handleColorClick(event){
  //console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;       //위에서 정해준 임의의 색에 override해준것임
  //console.log(color);
  ctx.fillStyle = color;   //ctx.fillStyle=ctx.strokeStyle;이거랑 같은거임 handleModeClick함수에서
}

function handleRangeChange(event){
  const size  = event.target.value;
  ctx.lineWidth=size;
  //console.log(event.target.value);
}

function handleModeClick(){

  if(filling === true){
    filling= false;
    mode.innerText = "Fill";
  }else{
    filling = true;
    mode.innerText = "Paint";
    //ctx.fillStyle=ctx.strokeStyle;
  }
}

function handleCanvasClick(){
  //ctx.fillRect(0, 0, CANVAS_SIZE,CANVAS_SIZE);
  if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE,CANVAS_SIZE);
  }
}
function handleCM(event){
  //console.log(event);     이 함수는 마우스 우클릭했을 때 저장되는것을 막기위한것임
  event.preventDefault();
}
function handleSaveClick(){
  const image = canvas.toDataURL();
  // console.log(image);
  const link = document.createElement("a");
  link.href=image;
  link.download = "PaintJS[🖌️]";
  //console.log(link);
  link.click();
}
if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown",startPainting);
  canvas.addEventListener("mouseup",stopPainting);
  canvas.addEventListener("mouseleave",stopPainting);
  canvas.addEventListener("click",handleCanvasClick);
  canvas.addEventListener("contextmenu",handleCM);
  //canvas.addEventListener("mouseenter", onMouseEnter);
}
//console.log(Array.from(colors));
Array.from(colors).forEach(color => 
  color.addEventListener("click",handleColorClick));

if(range){
  range.addEventListener("input",handleRangeChange);
}

if(mode){
  mode.addEventListener("click",handleModeClick);
}
if(saveBtn){
  saveBtn.addEventListener("click",handleSaveClick);
}
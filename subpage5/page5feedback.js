const toDoForm= document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

/* function filterFn(toDo){
    return toDo.id ===1
}   */

let toDos = [];

function deleteToDo(event){         //기존id값이랑 삭제된id값 새로고침하지않아도 자동 적용되게 바꿔야함
    //console.dir(event.target.parentNode);   지울것의 id를 선택해주는 역할
    const btn= event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li); //여기서에러
    const cleanToDos = toDos.filter(function(toDo){
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();
}

function saveToDos(){
  localStorage.setItem(TODOS_LS,JSON.stringify(toDos));  //JSON.stringify는 object를 string으로 바꿔주는 역할임
}

//const idNumbers = 1;            //댓글보고 수정한 부분


function paintToDo(text){
    //console.log(text);
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML ="🏃";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");

    const newId = toDos.length +1;             //댓글보고 수정한부분
    //const newId = idNumbers;
    //idNumbers += 1;

    span.innerText = text
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
      text: text,                     //foreach를 쓸때 todo에 text를 줘서 가능한거임
      id: newId
    };
    toDos.push(toDoObj);
    saveToDos();          //toDoObj를 먼저 불러온뒤에 ToDos를 불러야함 왜냐면 todoOBJ안에 내용이 있어야하니께
}

function handleSubmit(event){  
  event.preventDefault();
  const currentValue= toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
     // console.log(loadedToDos)
       const parsedToDos =JSON.parse(loadedToDos);
       parsedToDos.forEach(function(toDo){
         paintToDo(toDo.text);
       });      //foreach는 함수를 실행시키는데 array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜주는 것을 뜻함
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();
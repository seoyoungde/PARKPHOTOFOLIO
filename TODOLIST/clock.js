const clockContainer =document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1");

function getTime(){
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `
                           ${hours <10 ? `0${hours}`:hours}: ${minutes < 10 ? `0${minutes}`: minutes}: ${seconds < 10 ? `0${seconds}`:seconds}
                        `       // seconds가 10보다 크면 0$값을 return하고 else는 :s를 return함

}

function init(){
    getTime();
    setInterval(getTime,1000);
}
init();
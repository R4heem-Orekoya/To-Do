const changeModeBtn = document.querySelector('.change-mode');
const bodyEl = document.querySelector('body');

let getMode = localStorage.getItem("mode");
if(getMode && getMode === "dark"){
    bodyEl.classList.add("dark");
    changeModeBtn.classList.add("active");
}


changeModeBtn.addEventListener('click', ()=>{
    changeModeBtn.classList.toggle('active');
    bodyEl.classList.toggle('dark');

    if(!bodyEl.classList.contains("dark")){
        return localStorage.setItem("mode", "light"); 
    }

    localStorage.setItem("mode", "dark");
})
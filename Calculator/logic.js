let screen = document.getElementById('screen');
buttons = document.querySelectorAll('button');
let screenValue = "";

for ( items of buttons){
    items.addEventListener('click' , (e)=>{
        buttonText = e.target.innerText;
        if(buttonText == '='){
            screen.value = eval(screenValue);
        }
        else if(buttonText == 'C'){
            screenValue = "";
            screen.value = screenValue;
        }
        else{
            screenValue += buttonText;
            screen.value = screenValue;
        }
    })
}
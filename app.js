debugger;
const inputSlider=document.querySelector("[data-lengthslider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passWordDisplay=document.querySelector("[data-passwordDisplay]")
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const upperCaseCheck=document.querySelector("#uppercase");
const lowerCaseCheck=document.querySelector("#Lowecase");
const numberCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#Sybols");
const indicator=document.querySelector("[data-incicator]");
const generatorbtn=document.querySelector(".generatorbtn");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const suggestion=document.querySelector("[dicided]")
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password="";
let passwordlength=10;
let checkcount=0;
setIndicator("#ccc");
handleSlider();
//set password length
function handleSlider(){
    inputSlider.value=passwordlength;
    lengthDisplay.innerHTML=passwordlength;

    const min=inputSlider.min;
    const max=inputSlider.max;
 inputSlider.style.backgroundSize = ( (passwordlength- min)*100/(max - min)) + "% 100%"
    
}
 function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`

 }

 function getRndIntegar(min,max){
 return  Math.floor(Math.random() * (max-min)) + min;
 }

 function generateRandomNumber(){
    return getRndIntegar(0,9);
 }
 function generateRandomLowercase(){
    return String.fromCharCode(getRndIntegar(97,123));
 }
 function generateRandomUppercase(){
    return String.fromCharCode(getRndIntegar(65,91));
 }
  function generateRandomSybols(){
    const randomnum= getRndIntegar(0,symbols.length);
    return symbols.charAt(randomnum);

  }
   function calcStrenth(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (upperCaseCheck.checked) hasUpper = true;
    if ( lowerCaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8) {
      setIndicator("#0f0");
      suggestion.innerHTML="Strength";
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordlength >= 6
    ) {
      setIndicator("#ff0");
      suggestion.innerHTML="Normal";
    } else {
      setIndicator("#f00");
      suggestion.innerHTML="Weak";
    } 
   }
    
   async function copyContent(){
    try{
         await navigator.clipboard.writeText( passWordDisplay.value);

          copyMsg.innerHTML="copied";
    }
    catch(e)
    {
        copyMsg.innerHTML="Falied";
    }
    //to copy wala visval
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);}
    function shufflePassword(array) {
        //Fisher Yates Method
        for (let i = array.length - 1; i > 0; i--) {
            //random J, find out using random function
            const j = Math.floor(Math.random() * (i + 1));
            //swap number at i index and j index
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
          let str = "";
    array.forEach((el) => (str += el));
    return str;

   }
   function handlecheckboxchange(){
checkcount=0;
allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked)
        checkcount++;
}
 ) ;
//special condition
if(passwordlength < checkcount){
    passwordlength=checkcount;
    handleSlider();
}



 }

   allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener("change", handlecheckboxchange);
})




   inputSlider.addEventListener("input",(e)=>
   {
    passwordlength=e.target.value;
    handleSlider();
   }
)


copyBtn.addEventListener("click",() =>
{
if(passWordDisplay.value){
    copyContent();

}
})


generatorbtn.addEventListener("click",()=>{
    //none of thr checkbox are selected
    if(checkcount <=0)return;
    if(passwordlength < checkcount){
        passwordlength=checkbox;
    handleSlider();
    }

//let's start the jouney to find new password


//remove old password
password="";





let funcArr=[];
if(upperCaseCheck.checked)
    funcArr.push(generateRandomUppercase);
if(lowerCaseCheck.checked)
    funcArr.push(generateRandomLowercase);
if(numberCheck.checked)
    funcArr.push(generateRandomNumber);
if(symbolsCheck.checked)
    funcArr.push(generateRandomSybols);

//compulsory addition

for(let i=0;i<funcArr.length;i++){
    password+=funcArr[i]();
}
 //remaining addition 
 for(let i=0; i<passwordlength-funcArr.length;i++){

    let randIndex=getRndIntegar(0,funcArr.length);
    password+=funcArr[randIndex]();
 }


//shuffle the password




//show pass
password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passWordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrenth();
});

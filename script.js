var textarea=document.getElementById("textarea");
var index=document.getElementById("index");
var count=1;
textarea.addEventListener("keyup", (event)=>{
 if(event.keyCode === 13)
    {
        count++;
        index.innerHTML+=`<li>${count}</li>`;
    }
});

 textarea.addEventListener("keyup", (event)=>{
    var length = textarea.value.split("\n").length;
    if(event.key === "Backspace" && length<count)
    {
        index.removeChild(index.lastChild);
        count--;
    }
});
var compile = document.getElementById("compile");
compile.addEventListener("click",()=>{
    const code=textarea.value;
    const id=document.getElementById("languages").value;
   // console.log(id,code);
    //post request to server 
    var request = new XMLHttpRequest();
    request.open("POST","https://codequotient.com/api/executeCode");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({"code":code,langId:id}));
    request.onreadystatechange = function(){
        if(request.readyState == 4)
        {
        const codeId = JSON.parse(request.responseText).codeId;
        console.log(codeId);
        //get request to server
        var result=setTimeout(()=>{
        var getrequest = new XMLHttpRequest();
         getrequest.open("GET","https://codequotient.com/api/codeResult/"+codeId);
         getrequest.send();
         getrequest.onreadystatechange=function(){
         if(getrequest.readyState==4)
         {
            var data = JSON.parse(JSON.parse(getrequest.responseText).data);   
                console.log(data);
               let output=data.output;
                if(output!=='')
                {
                    document.getElementById("output").innerHTML=output;
                }
                else{
                    let error = data.errors;
                    document.getElementById("output").innerHTML=error;
                }
         }
          }

        },3000);
        }
    }
});
//CAUTION: THIS API IS PRIVATE AND WORKS ONLY ON CODEQUOTIENT SITE;
//this jquery script help the textarea and div to scroll synchronously!
$("#wid").scroll(function () { 
    $("#textarea").scrollTop($("#wid").scrollTop());
    $("#textarea").scrollLeft($("#wid").scrollLeft());
  });
  $("#textarea").scroll(function () { 
    $("#wid").scrollTop($("#textarea").scrollTop());
    $("#wid").scrollLeft($("#textarea").scrollLeft());
  });
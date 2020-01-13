const formlogin = document.getElementById("btnLogin");

formlogin.addEventListener("click", async (event) => {
    event.preventDefault()
    const Email = document.getElementById("emaillogin").value;
    const Password = document.getElementById("passwordlogin").value;
    
    console.log(Password);
    console.log(Email);
    
    console.log("kfsnk");

    setCookie('id', Email, 1); //coockies
    console.log(getCookie('id'));

    let response = "";
    if(true){            
        response = await fetch('https://gestorespacos.herokuapp.com/signin',{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',            
        body: `email=${Email}&password=${Password}`
        }).then(function(response){
            if (!response.ok){
                if(response.status === 400){
                    alert ('Dados Incorretos')
                }
            } else {
                alert ('Login')
                window.location.href = "/Back-office/indexback.html"
            }
        }).then(function (result) {console.log(result);
        }).catch(function (err) {alert("Submission error"); console.error(err);
        });
        
    }   
        console.log("ze");

        let email1 = Email.value;
    

});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
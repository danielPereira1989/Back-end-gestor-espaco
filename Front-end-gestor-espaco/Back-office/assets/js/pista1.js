window.onload = () =>{
    let track_id = getCookie('idTrack');
    console.log(track_id);

    const refreshTracks = async () =>{
        event.preventDefault()
        const response2 = await fetch(`https://gestorespacos.herokuapp.com/track` , {
            headers: { "Content-Type": "application/x-www-form-urlencoded"},
            method:"GET",
        })

            const tracks = await response2.json();
            let i = 1
            for (const track of tracks){
                console.log("entrou no for")
                console.log(track.idTrack)
                if(track.idTrack==track_id){
                        console.log("entrou no if")
                        document.getElementById("track_name").innerHTML=track.track_name
                        document.getElementById("capacity").innerHTML=track.capacity
                        document.getElementById("distance").innerHTML=track.distance
                }
            }


   
   
          }
    refreshTracks();
}


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
  
  function deleteCookie(name) { setCookie(name, '', -1); }
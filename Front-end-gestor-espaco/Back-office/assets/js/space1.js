let isNew = true
let id_track=""
let user_id = getCookie('id');
let id_espaco=""

window.onload = () =>{
    console.log(2);
    renderMenu();
    renderTracks();
}


//renderizar pistas
const renderTracks = async () =>{
    const response = await fetch(`https://gestorespacos.herokuapp.com/track`)
    const track = await response.json()
    
    let i =1
    for (const tracks of track) {
        if(tracks.idEspacoT_fk==id_espaco){    
        const nome_track=tracks.track_name;
        console.log(nome_track);

        id_track = tracks.idTrack;

        if(tracks.idTracktype_fk==1){
            console.log("pista indoor")
            document.getElementById("tracksIn").innerHTML+=`<div class ="row">
            <div class="col-md-12">
            <p> <button value='${id_track}' class="btn btn-warning verPista" name="verPista"> ${nome_track} </button></a>
            <i value='${id_track}' class="fa fa-trash fa-lg remove"style="color: #d90000;padding-left: 20px;"></i> 
            </p>
            </div>
            </div>`
        }
        else{
            document.getElementById("tracksOut").innerHTML+=`<div class ="row">
            <div class="col-md-12">
            <p> <button value='${id_track}' class="btn btn-warning verPista" name="verPista"> ${nome_track} </button></a>
            <i value='${id_track}' class="fa fa-trash fa-lg remove" style="color: #d90000;padding-left: 20px;"></i> 
            </p>
            </div>
            </div>`
            console.log("pista outdoor")
        }
      }
    }

   // Gerir o clique no ícone de Remover        
   const btnDelete = document.getElementsByClassName("remove")
   for (let i = 0; i < btnDelete.length; i++) {
       btnDelete[i].addEventListener("click", () => {
           console.log("btnDelete")
           swal({
               title: 'Tem a certeza?',
               text: "Não será possível reverter a remoção!",
               type: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               cancelButtonText: 'Cancelar',
               confirmButtonText: 'Remover'
           }).then(async (result) => {
               console.log("ola")
               if (result.value) {
                   let id_track = btnDelete[i].getAttribute("value")
                   console.log(id_track)
                   try {
                       const response = await fetch(`https://gestorespacos.herokuapp.com/track/del/${id_track}`, {
                           method: "PUT"
                       })
                       if (response.status == 204) {
                           swal('Removido!', 'A pista foi removida !', 'success')
                           
                       }
                   } catch (err) {
                       swal({
                           type: 'error',
                           title: 'Erro',
                           text: err
                       })
                   }
                  
               }
           })
           
       }) 
   }

   
//guardar na cookie
const botaoEdit = document.getElementsByName("verPista");

    console.log("entrou no botao")
        for (let i = 0; i < botaoEdit.length; i++) {
            console.log("entrou no for")

            let idTrack = botaoEdit[i].getAttribute("value")
            console.log("hello")
            console.log(idTrack)

            botaoEdit[i].addEventListener("click", () =>{
            console.log("entrou no click")
            console.log("ola")
            console.log(idTrack)
            
            setCookie('idTrack', idTrack, 1);
            window.location.href = "Pista.html"
            }) 

        }

    }






//fetch para buscar preencher o menu com os dados do utilizador
const renderMenu = async () =>{
    console.log(user_id)
    const response1 = await fetch(`https://gestorespacos.herokuapp.com/spacemanager/inf/${user_id}`);
    const p = await response1.json();
    const spacemanager = p[0];
    
    console.log(spacemanager.nome_gestor_espaco);

    id_espaco = spacemanager.idEspacoSM_fk;
    
    console.log(spacemanager.idEspacoSM_fk);

    document.getElementById("nome1").innerHTML=spacemanager.nome_gestor_espaco;
    document.getElementById("nome2").innerHTML=spacemanager.nome_gestor_espaco;
    document.getElementById("email1").innerHTML=spacemanager.email_gestor;

    }

//Caracteristicas 
const btnView = document.getElementsByClassName("verPista")
console.log(99)
console.log(btnView)
for (let i = 0; i < btnView.length; i++) {
  btnView[i].addEventListener("click", () => {  
    console.log("rrrrrrrrr")
    const response2 =  fetch(`https://gestorespacos.herokuapp.com/track/${id_track}`)
    const tracks = response2.json()
       
        if (track.id_track == btnView[i].getAttribute("value")) {
        swal({
          title: 'Características',
          text : 'Nome:',
          text:  track.track_name,
          text : 'Distância',
          text : track.distance,
          text : 'Capacidade:',
          text : track.capacity `pessoas`, 
          showCancelButton: true,
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
        }) 
    }
})
}

//CRIAR PISTA
const formAddPista = document.getElementById("formAddPista")

formAddPista.addEventListener("submit", async (event) =>{
    event.preventDefault()
    console.log("entrou no submit")
    const track_name = document.getElementById("track_name").value
    const capacity = document.getElementById("capacity").value
    const distance = document.getElementById("distance").value
    let idTracktype = document.getElementsByName("idTracktype_fk")
    let idEspacoT_fk = id_espaco
    console.log(track_name);
    console.log(capacity);
    console.log(distance);
    console.log("entreasdksfmsnvgofigvnrfgiohrfnoihrnogivnrf<orgginf")
    console.log(idTracktype);
    console.log(idEspacoT_fk);


    
        let idTracktype_fk
        for (var i = 0; i < idTracktype.length; i++) {
            console.log("entrou no for")
            if (idTracktype[i].checked == true) {
                idTracktype_fk = idTracktype[i].value
                console.log(idTracktype_fk)   //id da pista
            }
        }
console.log("antescaracteristicas")


//EFETUAR REGISTO
    let response
        if (isNew){
            console.log("entrou no if ")
        response = await fetch(`https://gestorespacos.herokuapp.com/track`,{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                body: `track_name=${track_name}&capacity=${capacity}&distance=${distance}&idTracktype_fk=${idTracktype_fk}&idEspacoT_fk=${idEspacoT_fk}&active=1`
            })

            formAddPista.reset();
            window.location.href = "space.html"
        } 
        isNew = true   

})



        






//COOCKIES
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



  function deleteCookie(name) { setCookie(name, '', -1); }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
let isNew = true
let id_track=""
window.onload = () =>{
    console.log(2);
    renderTracks();
    renderMenu();
}


//renderizar pistas
const renderTracks = async () =>{
    const response = await fetch(`http://localhost:3000/track`)
    const track = await response.json()
    
    let i =1
    for (const tracks of track) {
        const nome_track=tracks.track_name;
        console.log(nome_track);

        id_track = tracks.idTrack;

        if(tracks.idTracktype_fk==1){
            console.log("pista indoor")
            document.getElementById("tracksIn").innerHTML+=`<div class ="row">
            <div class="col-md-6">
            <p>  <button value='${id_track}' class="btn btn-warning verPista" name="verPista"> ${nome_track} </button></a>
            <i value='${id_track}' class="fa fa-trash fa-lg remove"style="color: #d90000;padding-left: 20px;"></i> 
            </p>
            </div>
            </div>`
        }
        else{
            document.getElementById("tracksOut").innerHTML+=`<div class ="row">
            <div class="col-md-6">
            <p>  <button value='${id_track}' class="btn btn-warning verPista" name="verPista"> ${nome_track} </button></a>
            <i value='${id_track}' class="fa fa-trash fa-lg remove"style="color: #d90000;padding-left: 20px;"></i> 
            </p>
            </div>
            </div>`
            console.log("pista outdoor")
        }
      }

      // Gerir o clique no ícone de Remover        
      const btnDelete = document.getElementsByClassName("remove")
      for (let i = 0; i < btnDelete.length; i++) {
          btnDelete[i].addEventListener("click", () => {
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
                  if (result.value) {
                      let idTrack = btnDelete[i].getAttribute("value")
                      try {
                  const response = await fetch(`http://localhost:3000/track/del/${idTrack}`, { method: "PUT" })
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
      renderTracks()
  })
}


    }






    //fetch para buscar preencher o menu com os dados do utilizador
    const renderMenu = async () =>{
        const response1 = await fetch(`http://localhost:3000/spacemanager/inf/henriquemalta1988@gmail.com`);
        const p = await response1.json();
        const spacemanager = p[0];
    
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
    const response2 =  fetch(`http://localhost:3000/track/${id_track}`)
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
    let idEspacoT_fk = "8"
    console.log(track_name);
    console.log(capacity);
    console.log(distance);
   console.log("entreasdksfmsnvgofigvnrfgiohrfnoihrnogivnrf<orgginf")
    console.log(idTracktype);
    console.log(idEspacoT_fk);


    id_espaco = i
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
        response = await fetch(`http://localhost:3000/track`,{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                body: `track_name=${track_name}&capacity=${capacity}&distance=${distance}&idTracktype_fk=${idTracktype_fk}&idEspacoT_fk=${idEspacoT_fk}&active=1`
            })

            formAddPista.reset();
        } 
        isNew = true   

})




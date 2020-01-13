let isNew = true

window.onload = () => {
    
    // Renderizaçao das pistas
renderTracks()

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
                    let idTrack = btnDelete[i].getAttribute("id")
                    try {
                        const response = await fetch(`https://gestorespacos.herokuapp.com/space/1/track/:${idTrack}`, { method: "DELETE" })
                        const tracks = await response.json();
                        swal('Pista Removida!', `A ${track_name} foi removida com sucesso!`, 'success')
                        renderTracks()
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
    renderTracks()
}
    
   
   

    // References to HTML objects   
    const divTracks = document.getElementById("divTracks")


    const formAddPista = document.getElementById("formAddPista")
    formAddPista.addEventListener("submit", async (event) => {
        event.preventDefault()
        const track_name = document.getElementById("track_name").value
        const capacity = document.getElementById("capacity").value
        const distance = document.getElementById("distance").value
        let idTracktype = document.getElementsByName("idTracktype_fk")
        let idEspacoT_fk = "8"
        
        id_espaco = i
        let idTracktype_fk
        for (var i = 0; i < idTracktype.length; i++) {
            if (idTracktype[i].checked == true) {
                idTracktype_fk = idTracktype[i].value
                console.log(idTracktype_fk)
            }
        }
        

        let obj_schedule_track = {};
        const schedule_track = document.getElementsByName("schedule_track")
        console.log("sddfs");
        for (let i = 0; i < schedule_track.length; i++) {
            for (const schedule_tracks of schedule_track) {
                console.log(schedule_tracks)
                console.log(document.getElementById("initial_time")[i].value);
                /*  if (schedule_track.idTrack == schedule_tracks[i].getAttribute("id")) {
                      i = schedule_track.idschedule_track
                     obj_schedule_track.initial_time= document.getElementById("initial_time")[i].value
                     obj_schedule_track.final_time =   document.getElementById("final_time")[i].valu
                  }*/
            }
        }
        
        // Verifica flag isNew para saber se se trata de uma adição 
        let response
        if (isNew) {
            // Adiciona Pista
            response = await fetch(`https://gestorespacos.herokuapp.com/space/8/track`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                body: `track_name=${track_name}&capacity=${capacity}&distance=${distance}&idTracktype_fk=${idTracktype_fk}&idEspacoT_fk=${idEspacoT_fk}&active=1`
            })
                
        }
        isNew = true


        renderTracks()
    })

    
    const renderTracks = async () => {
        const response = await fetch(`https://gestorespacos.herokuapp.com/track/`)
        const track = await response.json()
        for (const tracks of track) {
            if (tracks.idTracktype_fk == 1) {
                document.getElementById("tracksIn").innerHTML = `
                    <div class ="row">
                    <p> <a href= 'Pista.html'> <button class="btn btn-warning"> ${track_name} </button></a>
                    <i class="fa fa-trash fa-lg remove"style="color: #d90000;padding-left: 20px;"></i> 
                    </p>
                    </div>`
            }

            else {
                document.getElementById("tracksOut").innerHTML = `
                       <div class ="row">
                         <p> <a href= 'Pista.html'> <button class="btn btn-warning"> ${track_name} </button></a>
                            <i class="fa fa-trash fa-lg remove"style="color: #d90000;padding-left: 20px;"></i> 
                         </p>
                       </div>`
            }

        }
    }
    
    


let isNew = true
window.onload = () => { 
    const tblScheduleTrack = document.getElementById("tblScheduleTrack")  
    
    function refreshTracks(){
        event.preventDefault()
        return fetch(`https://gestorespacos.herokuapp.com/track/${idTrack}` , {
        headers: { "Content-Type": "application/x-www-form-urlencoded"},
        method:"GET", 
    })
        .then(response => {
            if(!response.ok) {
                throw new Error (response.statusText);
            }
            const p = response.json();
            document.getElementById("track_name").innerHTML= p.track_name
            document.getElementById("capacity").innerHTML= p.capacity;
            document.getElementById("distance").innerHTML=p.distance;
            document.getElementById("id_Atividades").innerHTML = p.activity //atividades, pedir aos participantes
            document.getElementById("disponibilidade").innerHTML = p.disponibilidade // disponibilidade, tratar de fazer essa função
        })

            .then(async()  => {
                event.preventDefault()
                const x = await fetch (`https://gestorespacos.herokuapp.com/track/${idTrack}/schedule_track`,{
                headers: { "Content-Type": "application/x-www-form-urlencoded"},
                method:"GET", 
                })

                const schedule = response.json();
                    let strHtml = `
                        <thead>
                        <th>Dias da Semana</th>
                        <th>Horário de Abertura</th>
                        <th>Horário de Encerramento</th>
                       </thead>
                    `
                    let i = 1
                    for (const track of track) {          
                        strHtml += `
                            <tr>
                                <td>${schedule.day}</td>
                                <td>${schedule.initial_time}</td>
                                <td>${schedule.final_time}</td>
                            </tr>
                        `        
                        i++
                    }
                    strHtml += "</tbody>"
                    tblScheduleTrack.innerHTML = strHtml
                })
            }




}

    const btnEditPista = document.getElementById("editPista");
	btnEditPista.addEventListener("onclick", async (event) => {
        event.preventDefault()
        return fetch(`https://gestorespacos.herokuapp.com/track/${idTrack}` , {
        headers: { "Content-Type": "application/x-www-form-urlencoded"},
        method:"GET", 
    })
        .then(response => {
            if(!response.ok) {
                throw new Error (response.statusText);
            }
            const p = response.json();
            document.getElementById("capacity").innerHTML= p.capacity;
            document.getElementById("track_name").innerHTML=p.track_name;
            document.getElementById("distance").innerHTML=p.distance;
            document.getElementById("idTracktype_fk").innerHTML = p.idTracktype_fk;

            renderSechule();
          
 })
  .catch(error => {
      //swal.showValidationError(`Pedido falhado : ${error}`);
  })
})
    
    
        const formEditPista = document.getElementById("formEditPista")
        formEditPista.addEventListener("submit", async(event) => {
        valform()
        isNew = false
        event.preventDefault()   
        for(track of track){
            document.getElementById("track_name").value = track.track_name
            document.getElementById("capacity").value = track.capacity
            document.getElementById("distance").value = track.distance
            let idTracktype_fk
            for (var i = 0; i < idTracktype.length; i++) {
                if (idTracktype[i].checked == true) {
                    idTracktype_fk = idTracktype[i].value
                }
            }
        }


            response = await fetch(`https://gestorespacos.herokuapp.com/track/${id_pista}`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "PUT",
                body: `nome=${track_name}&capacidade=${capacity}&distancia=${distance}&id_track=${idTracktype_fk}`
            })

            .then ( async() =>{
                let obj_schedule_track = {};
                const schedule_track = document.getElementsByName("schedule_track")
                console.log("sddfs");
                for (let i = 0; i < schedule_track.length; i++) {
                     for (const schedule_tracks of schedule_track) {
                console.log(schedule_tracks)
                console.log(document.getElementById("initial_time")[i].value);
                    }
                }

                response = await fetch(`https://gestorespacos.herokuapp.com/track/${id_pista}/schedule_track`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "PUT",
                    body: `obj_schedule_track=${schedule_track}`
                })

                
               /* for (let i = 0; i < schedule_track.length; i++) {
                for (const schedule_track of schedule_track) {
                    if (schedule_track.idTrack == schedule_track[i].getAttribute("id")) {
                        i = schedule_track.idschedule_track
                        document.getElementById("initial_time").value = schedule_track.initial_time
                       document.getElementById("final_time").value = schedule_track.final_time
                    }
                }
            }*/
         })
     })
   



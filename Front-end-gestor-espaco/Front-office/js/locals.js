window.onload = () => {
renderSpaces()

}

const renderspace = document.getElementById("renderspace")
const renderSpaces = async () => {
  const response = await fetch(`https://gestorespacos.herokuapp.com/space`)
  console.log("sdfghj")
  const spaces = await response.json()
    let divisao = ``
    console.log("asdddss")
    for (const space of spaces){
     divisao += `
     <div class="col-md-4 ole" style="align-content: center";>
				<div><img width="320" height="220"  class="ole" src="images/gallery/local1.jpg"></div>

  <!-- Button trigger modal -->
<button value=${space.id_espaco} name="abrir" data-toggle="modal" data-target="#VerPistas" type="button" class="btn border3 ole"  style=" width: 300px;" >
<div class="title" style = "margin-bottom: 35px !important "><h2><a title="Mais informação sobre o nosso Espaço" rel="bookmark"> <h2 class="title-border"> ${space.localidade}</h2></a></div><div class="meta-date"></div>
</button> </div>`

    }
    renderspace.innerHTML = divisao

    //ABRIR O MODAL VerPistas
    const response2 = await fetch(`https://gestorespacos.herokuapp.com/track`)
    const tracks = await response2.json()
  
    const btnView = document.getElementsByClassName("ole")
    let str =``
    for (let i = 0; i < btnView.length; i++) {
      btnView[i].addEventListener("click", () => {  
        for( const space of spaces){
           if (space.id_espaco == btnView[i].getAttribute("value")) {
             str = `  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
             </button>
                      <h3 style="text-align: center">${space.localidade}</h3>	
                       <h5 style="text-align: center">Morada: <span>${space.morada_espaco}</span></h5>
                       
                      `
                      for( const track of tracks){
                        if(track.idEspacoT_fk == space.id_espaco){
                          if( track.idTracktype_fk === 1) { 
                            str += `
                            <h4 style="color: #b90000"> ${track.track_name} </h4>
                            <h5>Distância: <span> ${track.distance}</span></h5> 
                        <h5>Capacidade Máxima: <span> ${track.capacity}</span> </h5>
                        <h5>Tipo de Pista: <span> Indooor </span></h5>
                        <br>   
                            `  
                          }
                          else {
                            str += `
                            <h4  style="color : #b90000"> ${track.track_name} </h4>
                            <h5>Distância: <span> ${track.distance}</span></h5> 
                        <h5>Capacidade Máxima: <span> ${track.capacity}</span> </h5>
                        <h5>Tipo de Pista: <span> Outdoor </span></h5>
                        <br>     
                            `  
                          }
                      
                        }
                      }     							
               
          }
        }
        document.getElementById("pista").innerHTML = str

        })
    }
    }

let id_espaco="";


window.onload = () => {
let user_id = getCookie('id');
console.log(getCookie('id'));

    //fetch para buscar preencher o menu com os dados do utilizador
    const renderMenu = async () =>{
    const response1 = await fetch(`https://gestorespacos.herokuapp.com/spacemanager/inf/${user_id}`);
    const p = await response1.json();
    const spacemanager = p[0];
    
    console.log(spacemanager.nome_gestor_espaco);

    id_espaco = spacemanager.idEspacoSM_fk;
    
    console.log(id_espaco);

    document.getElementById("nome1").innerHTML=spacemanager.nome_gestor_espaco;
    document.getElementById("nome2").innerHTML=spacemanager.nome_gestor_espaco;
    document.getElementById("email1").innerHTML=spacemanager.email_gestor;

    }
    renderMenu();
    console.log(id_espaco)


  //fetch para ir buscar os dados do espaço
  let tblDados = document.getElementById("tblDados")

  const renderEspacos = async () =>{
    let strHtml = `
            <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='3'>Informações sobre o Espaço</th></tr>
			<th class='w-30 text-center'>Localidade</th>
			<th class='w-30 text-center'>Morada</th>              
			<th class='w-30 text-center'>Coordenadas GPS</th> 		    
                </tr> 
            </thead><tbody> 
        `
        const response = await fetch(`https://gestorespacos.herokuapp.com/space/${id_espaco}`)
        const spaces = await response.json()
        


        for (const space of spaces) {
            if(space.id_espaco==id_espaco){
            strHtml += `
                <tr>
            <td class='w-30 text-center'>${space.localidade}</td>
            <td class='w-30 text-center'>${space.morada_espaco}</td>
			      <td class='w-30 text-center'>${space.coordenadas_gps}</td>
                </tr>
            `
        }
        strHtml += "</tbody>"
        tblDados.innerHTML = strHtml}
  }
  renderEspacos();


//fetch para ir buscar as pistas do espaço
let tblPistas = document.getElementById("tblPistas")

const renderPistas = async () => {
  let strHtml = `
  <thead >
      <tr><th class='w-100 text-center bg-warning' colspan='4'>Pistas existentes no espaço</th></tr>
<th class='w-30 text-center'>Nome da Pista</th>
<th class='w-30 text-center'>Distância</th>              
<th class='w-30 text-center'>Capacidade</th> 
<th class='w-30 text-center'>Tipo</th> 		    
      </tr> 
  </thead><tbody> 
`
    console.log("ola");
    console.log(id_espaco);
    const pistas = await fetch(`https://gestorespacos.herokuapp.com/track`)
    const tracks = await pistas.json()
    let i = 1
    for (const track of tracks) {
      if(track.idEspacoT_fk==id_espaco){
        console.log(id_espaco)
      if(track.idTracktype_fk===1){
        const tipo_pista = "indoor";
        strHtml += `
        <tr>
    <td class='w-30 text-center'>${track.track_name}</td>
    <td class='w-30 text-center'>${track.distance}</td>
    <td class='w-30 text-center'>${track.capacity}</td>
    <td class='w-30 text-center'>${tipo_pista}</td>
        </tr>
    `
    i++       
      }
      else{
        const tipo_pista="outdoor";
      strHtml += `
          <tr>
      <td class='w-30 text-center'>${track.track_name}</td>
      <td class='w-30 text-center'>${track.distance}</td>
      <td class='w-30 text-center'>${track.capacity}</td>
      <td class='w-30 text-center'>${tipo_pista}</td>
          </tr>
      `
      i++   } 
      }
  }
  strHtml += "</tbody>"
  tblPistas.innerHTML = strHtml 
}

renderPistas();
    


}



let logout = document.getElementById("logout");
logout.addEventListener("click", async (event) => {
    event.preventDefault();

    deleteCookie('id');
    window.location.href = "../Front-office/index.html"
})


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

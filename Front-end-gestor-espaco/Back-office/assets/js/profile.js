window.onload = () => {
  let user_id = getCookie('id');

    //fetch para buscar preencher o menu com os dados do utilizador
    const renderMenu = async () =>{
      const response1 = await fetch(`https://gestorespacos.herokuapp.com/spacemanager/inf/${user_id}`);
      const p = await response1.json();
      const spacemanager = p[0];
      console.log(spacemanager.nome_gestor_espaco);
  
      document.getElementById("nome1").innerHTML=spacemanager.nome_gestor_espaco;
      document.getElementById("nome2").innerHTML=spacemanager.nome_gestor_espaco;
      document.getElementById("email1").innerHTML=spacemanager.email_gestor;
      }
      renderMenu();



    
    //fetch para buscar os dados e apresentar na página
    const renderInformacoes = async () =>{
      const response2 = await fetch(`https://gestorespacos.herokuapp.com/spacemanager/inf/${user_id}`);
      const ps = await response2.json();
      const spacemanager = ps[0];

      var ts = new Date(spacemanager.data_nascimento);
      let data = ts.toDateString();
      console.log(data);

      document.getElementById("Nome").innerHTML=spacemanager.nome_gestor_espaco;
      document.getElementById("Email").innerHTML=spacemanager.email_gestor;
      document.getElementById("Nif").innerHTML=spacemanager.nif;
      document.getElementById("Data_nascimento").innerHTML=data;
      document.getElementById("Telefone").innerHTML=spacemanager.telefone;
      document.getElementById("Morada").innerHTML=spacemanager.morada;
    }

    renderInformacoes();
}









/*`
//Fazer atualização do nome
const submeterNome = document.getElementById("formeditNome");

submeterNome.addEventListener("submit", async (event) =>{

  event.preventDefault();

    fetch(`http://localhost:3000/spacemanager/ana@gmail.com`, {
      headers: {"Content-Type": "application/x-www-form-urlencoded"},          
      method: "PUT",
      body:
      `nome_gestor_espaco=${txtNome}&morada=${txtMorada}&password=${txtPassword}
        &data_nascimento=${txtDatanascimeto}&nif=${txtNif}&telefone=${txtTelefone}&email=${txtEmail}`
    })

    .catch(error => {
      swal.showValidationError(`Pedido falhado: ${error}`);
    });
})
*/












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


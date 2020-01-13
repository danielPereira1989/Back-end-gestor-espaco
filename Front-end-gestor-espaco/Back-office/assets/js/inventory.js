let isNew =true
let id_espaco="";

window.onload=() => {
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
    renderMaterial()
}

const material = document.getElementById("formMateriais");
let tblMateriais = document.getElementById("tblMaterials");  

material.addEventListener("submit", async (event) =>{
    event.preventDefault()
    const referencia = document.getElementById("referencia_material").value;
    const nome_material = document.getElementById("nome_material").value;
    const descricao = document.getElementById("descricao").value;
    const quantidade = document.getElementById("quantidade").value;
    const idEspaco_fk = id_espaco;
    console.log(idEspaco_fk);
  
// Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um patrocinador
let response
if (isNew) {
    console.log('antesdofetchdeAdd')

    // Adiciona Patrocinador
            response = await fetch(`https://gestorespacos.herokuapp.com/materials`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            body: `referencia_material=${referencia}&nome_material=${nome_material}&descricao=${descricao}&quantidade=${quantidade}&idEspaco_fk=${idEspaco_fk}&active=1`
    })
    renderMaterial();
}else {
    // Atualiza Material
        response = await fetch(`https://gestorespacos.herokuapp.com/materials/${id_material}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "PUT",
            body: `referencia_material=${referencia}&nome_material=${nome_material}&descricao=${descricao}&quantidade=${quantidade}&idEspaco_fk=${idEspaco_fk}`
        })
        renderMaterial() 
    }
    isNew = true
    window.location.href = "inventory.html"
})

 
  
    const renderMaterial = async () => {
        material.reset()
        let strHtml = `
        <thead >
        <tr>
            <th class='w-30 text-center bg-warning'>Referencia do Material</th>
            <th class='w-30 text-center bg-warning'>Nome do Material</th>              
            <th class='w-20 text-center bg-warning'>Descrição</th>  
            <th class='w-20 text-center bg-warning'>Quantidade</th>
            <th class='w-20 text-center bg-warning'> Ações</th> 		</tr>    
        </thead><tbody> 
    `
      const response = await fetch(`https://gestorespacos.herokuapp.com/materials`)
      const materials = await response.json()
      let i = 1
      for (const material of materials) {
          if(material.idEspaco_fk==id_espaco){
          console.log(materials)
          strHtml += `
              <tr>
              
                  <td class='w-30 text-center'>${material.referencia_material}</td>
                  <td class='w-30 text-center'>${material.nome_material}</td>
                  <td class='w-30 text-center'>${material.descricao}</td>
                  <td class='w-20 text-center'>${material.quantidade}</td>
                  <td class='w-20 text-center'>
                      <i value='${material.id_material}' class='fas fa-edit edit' ></i>
                      <i value='${material.id_material}' class='fas fa-trash-alt remove'></i>
                  </td>
              </tr>
          `
          i++
      }}
      strHtml += "</tbody>"
      tblMateriais.innerHTML = strHtml
      
   
     // Gerir o clique no ícone de Editar        
     const btnEdit = document.getElementsByClassName("edit")
     for (let i = 0; i < btnEdit.length; i++) {
         btnEdit[i].addEventListener("click", () => {
             isNew = false
             id_material = btnEdit[i].getAttribute("value");
             for (const material of materials) {
                 if (material.id_material == btnEdit[i].getAttribute("value")) {
                    document.getElementById("referencia_material").value= material.referencia_material;
                    document.getElementById("nome_material").value = material.nome_material;
                    document.getElementById("descricao").value = material.descricao;
                    document.getElementById("quantidade").value = material.quantidade;
                    
                 }
             }
         })
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
                let id_material = btnDelete[i].getAttribute("value")
                console.log("ola")
                console.log(id_material) //funciona => le direito
                try {
                    console.log(id_material)
                    const response = await fetch(`https://gestorespacos.herokuapp.com/materials/del/${id_material}`, {
                        method: "PUT"
                        
                    })
                    console.log(id_material)
                    if (response.status == 204) {
                        swal('Removido!', 'O patrocinador foi removido !', 'success')
                    }
                } catch (err) {
                    swal({
                        type: 'error',
                        title: 'Erro',
                        text: err
                    })
                }
               renderMaterial()
            }
        })
         renderMaterial()
    })
    }
   }
                



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
    


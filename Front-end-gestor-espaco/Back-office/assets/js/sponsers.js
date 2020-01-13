const urlBase = "https://gestorespacos.herokuapp.com/"
let isNew = true
let id_edit =""


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
    renderSponsers()

}  

// References to HTML objects   
const tblPatrocinadores = document.getElementById("tblPatrocinadores")
const formPatrocinadores = document.getElementById("formPatrocinadores")
  
        formPatrocinadores.addEventListener("submit", async (event) => {
            event.preventDefault()
            const nome_patrocinador = document.getElementById("nome_patrocinador").value
            const NIF = document.getElementById("NIF").value
            const pessoa_contacto = document.getElementById("pessoa_contacto").value
            const preco_patrocinio = document.getElementById("preco_patrocinio").value
            const Contacto = document.getElementById("Contacto").value
            const Morada = document.getElementById("Morada").value
            const validade_patrocinio = document.getElementById("validade_patrocinio").value
            const txtNotas = document.getElementById("txtNotas").value
           
    
            // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um patrocinador
            let response
            if (isNew) {
                console.log('antesdofetchdeAdd')
    
                // Adiciona Patrocinador
                response = await fetch(`https://gestorespacos.herokuapp.com/sponser`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    body: `nome_patrocinador=${nome_patrocinador}&Contacto=${Contacto}&pessoa_contacto=${pessoa_contacto}
                    &NIF=${NIF}&Morada=${Morada}&active=1`
                  }) 
                  const sponser = response.json() 
                  .then(function() {
                    fetch(`hhttps://gestorespacos.herokuapp.com/sponsership`, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        body: `preco_patrocinio=${preco_patrocinio}& validade_patrocinio=${validade_patrocinio}
                        &notas=${txtNotas}&active=1`
    
                   }  )
                   renderSponsers()
                 })
        } else {
            // Atualiza Patrocinador
        
                response = await fetch(`https://gestorespacos.herokuapp.com/sponser/${id_edit}`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "PUT",
                    body: `nome_patrocinador=${nome_patrocinador}&Contacto=${Contacto}&pessoa_contacto=${pessoa_contacto}
                    &NIF=${NIF}&Morada=${Morada}&active=1`
                }) 
                .then(function() {
                    fetch(`https://gestorespacos.herokuapp.com/${id_edit}/sponsership/`, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "PUT",
                        body: `preco_patrocinio=${preco_patrocinio}& validade_patrocinio=${validade_patrocinio}
                        &notas=${txtNotas}&active=1`
    
                   })
        
                })
                renderSponsers() 
            }
            isNew = true
            renderSponsers()
           
        }) 

        const renderSponsers = async () => {
            formPatrocinadores.reset()
            let strHtml = `
                <thead >
                <tr class='bg-warning'>
                <th class='w-2'>#</th>
                <th class='w-30'>Nome</th>
                <th class='w-8'>NIF/NIPC</th>              
                <th class='w-15'>Contacto</th> 
                <th class='w-8'>Validade</th>
                <th class='w-6'>Montante</th>
                <th class='w-6'>Ações</th> 		    
                    </tr> 
                </thead><tbody>
                
            `
            console.log('depoistabela')
            const response = await fetch(`${urlBase}/sponser`)
            const sponsers = await response.json()
            const response2 = await fetch(`${urlBase}/sponsershipreadAll`)
            const sponserships = await response2.json()
            let validade = ""
            let preco ="" 

            let i = 1
            
            for (const sponser of sponsers) {
                

                    console.log("entrou no for")
                    
                  
                  
 if(sponserships.sponser_fk = sponser.id_patrocinador){
                           
                            
                            id_patrocinador =sponser.id_patrocinador
                            console.log("forsponser") 
                            console.log(sponserships.validade_patrocinio)
                              
                strHtml += `
                <tr>
            <td >${sponser.id_patrocinador}</td>
            <td>${sponser.nome_patrocinador}</td>
            <td>${sponser.NIF}</td>
            <td>${sponser.Contacto}</td>
            <td>${sponserships.validade_patrocinio}</td>
            <td>${sponserships.preco_patrocinio}</td>
                    <td>
                        <i value='${sponser.id_patrocinador}' class='fas fa-edit edit'></i>
                        <i value='${sponser.id_patrocinador}' class='fas fa-trash-alt remove'></i>
                    </td>
                </tr>
                  ` 
                  console.log("tabeladinamica")
                            }
                        
                 
                       
                            
 i++
console.log("final de tudo")
                }
 
  
           
        

            strHtml += "</tbody>"
            tblPatrocinadores.innerHTML = strHtml



// Gerir o clique no ícone de Editar        
        const btnEdit = document.getElementsByClassName("edit")
        for (let i = 0; i < btnEdit.length; i++) {
            btnEdit[i].addEventListener("click", () => {
                isNew = false
                id_edit = btnEdit[i].getAttribute("value");
                for (const sponser of sponsers) {
                    if (sponser.id_patrocinador == btnEdit[i].getAttribute("value")) {
                        document.getElementById("nome_patrocinador").value = sponser.nome_patrocinador
                        document.getElementById("Contacto").value = sponser.Contacto
                        document.getElementById("pessoa_contacto").value = sponser.pessoa_contacto
                        document.getElementById("preco_patrocinio").value = sponser.preco_patrocinio
                        document.getElementById("NIF").value = sponser.NIF
                        
                for (const sponsership of sponserships) { 
                    document.getElementById("Morada").value = sponser.Morada
                    document.getElementById("validade_patrocinio").value = sponser.validade_patrocinio
                    document.getElementById("txtNotas").value = sponser.Notas
                }     
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
                        let id_patrocinador = btnDelete[i].getAttribute("value")
                        try {
                            const response = await fetch(`${urlBase}/sponser/del/${id_patrocinador}`, {
                                method: "PUT"
                            })
                            if (response.status == 204) {
                                swal('Removido!', 'O patrocindor foi removido !', 'success')
                            }
                        } catch (err) {
                            swal({
                                type: 'error',
                                title: 'Erro',
                                text: err
                            })
                        }
                       renderSponsers()
                    }
                })
                 renderSponsers()
            })
        }
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
    

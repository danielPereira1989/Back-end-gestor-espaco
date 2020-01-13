let isNew = true;
const formRegisto = document.getElementById("contact_form");
formRegisto.addEventListener("submit", async (event) => {
    event.preventDefault()
    const txtEmail = document.getElementById("email").value;
    const txtPassword = document.getElementById("password").value;        
    let txtConfirmPass = document.getElementById("ConfirmarPassword").value;    
    const txtNome = document.getElementById("nome").value;
    const txtDatanascimeto = document.getElementById("data_nascimento").value;        
    const txtNif = document.getElementById("nif").value;
    const txtMorada = document.getElementById("morada").value;
    const txtTelefone = document.getElementById("telefone").value;
    const txtMorada_espaco = document.getElementById("morada_espaco").value;
    const txtLocalidade = document.getElementById("localidade").value;
    const txtCoordenadas_gps = document.getElementById("coordenadas_gps").value;
    
    const response1 = await fetch(`https://gestorespacos.herokuapp.com/spacemanager/email`);
    const spacemanagers = await response1.json();
    const spacemanager = spacemanagers[0];
    console.log(spacemanager.resultado);
    let emailExist = spacemanager.resultado;

    const response2 = await fetch('https://gestorespacos.herokuapp.com/space/info/local');
    const spaces = await response2.json();
    const space = spaces[0];
    console.log("fds");
    console.log(space.result);
    let spaceExist = space.result;

    if (txtConfirmPass !== txtPassword ){
        alert('Passwords diferentes')
    }
    else{
    if(emailExist >= 1 && spaceExist >= 1) {
        alert('Email ou Espaço já existem')
    }
    else{
            
    let response = "";
   
        response = await fetch('https://gestorespacos.herokuapp.com/signup',{
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            method: 'POST',
            body: `email=${txtEmail}&password=${txtPassword}&tipo=1`
        }).then(function(response) {
            if(response.status == "409") {
                alert('Erro');                        
            } 
            else{
                    fetch ('https://gestorespacos.herokuapp.com/space', {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        method: 'POST',
                        body: `morada_espaco=${txtMorada_espaco}&localidade=${txtLocalidade}&coordenadas_gps=${txtCoordenadas_gps}`
                    }).then(function(response){
                        if(!response.ok){
                            alert('Erro'); }  //window.location.href = "index.html"
                        });
                        }            
                    });
                
    const response3 = await fetch(`https://gestorespacos.herokuapp.com/space/get/${txtLocalidade}`);
    const espacos = await response3.json();
    const espaco = espacos[0];
    console.log(espaco.id_espaco);
    let txtIDespaco = espaco.id_espaco;
    response4 = await fetch('https://gestorespacos.herokuapp.com/spacemanager',{
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                method: 'POST',
                                body:`idEspacoSM_fk=${txtIDespaco}&nome_gestor_espaco=${txtNome}&morada=${txtMorada}&data_nascimento=${txtDatanascimeto}&nif=${txtNif}&telefone=${txtTelefone}&email_gestor=${txtEmail}`
                            }).then(function(response4){
                                    if(response4.status === 400){
                                        alert ('ERRO!')
                                    }
                                    else { 
                                        alert ('Registo concluído com sucesso!') 
                                        //window.location.href = "index.html" }
                                    }
                                
                            });
                }
        window.location.href = "index.html"
    }
});
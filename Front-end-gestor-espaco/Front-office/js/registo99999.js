//window.onload = () => {
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

        let contador = 0;

        const response = await fetch('https://gestorespacos.herokuapp.com/')
        const spacemanagers = await response.json();
        
        for (const spacemanager of spacemanagers){
            if (txtEmail == spacemanager.email_gestor) {
                console.log('ola');
                alert('Email já existe');
                contador++;
            }
        
        }

        
        if (contador != 0) {
                
        }
        else{

         if(txtPassword !== txtConfirmPass){ 
            alert("passwords não coincidem! l") 
            txtConfirmPass="" ; 
            txtPassword="" ; }

            else{             
                    fetch('https://gestorespacos.herokuapp.com/signup',{
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        method: 'POST',
                        body: `email=${txtEmail}&password=${txtPassword}`
                    }).then(function(){


                   fetch('https://gestorespacos.herokuapp.com/spacemanager',{
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    method: 'POST',
                    body: `nome_gestor_espaco=${txtNome}&email_gestor=${txtEmail}&morada=${txtMorada}&data_nascimento=${txtDatanascimeto}&nif=${txtNif}&telefone=${txtTelefone}`
                    }).then(function(response) {
                        if(!response.ok) {
                            alert('Erro');
                        }else {
                            fetch ('https://gestorespacos.herokuapp.com/space', {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        method: 'POST',
                        body : `morada_espaco=${txtMorada_espaco}&localidade=${txtLocalidade}&coordenadas_gps=${txtCoordenadas_gps}`
                    });
                        }
                    })
                })

                
            }
        }


    });
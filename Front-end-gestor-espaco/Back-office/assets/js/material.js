window.onload=() => {
    let tblMateriais = document.getElementById("tblMaterials");  
     
    const renderMaterial = async () => {
      
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
      const response = await fetch(`https://gestorespacos.herokuapp.com/materials`) //ALTERAR O FETCH PARA OBTER MATERIAIS POR ESPAÇO
      const materials = await response.json()
      let i = 1
      for (const material of materials) {
          console.log(materials)
          strHtml += `
              <tr>
              
                  <td class='w-30 text-center'>${material.referencia_material}</td>
                  <td class='w-30 text-center'>${material.nome_material}</td>
                  <td class='w-30 text-center'>${material.descricao}</td>
                  <td class='w-20 text-center'>${material.quantidade}</td>
                  <td class='w-20 text-center'>
                      <i id='${material.id_material}' class='fas fa-edit edit' ></i>
                      <i id='${material.id_material}' class='fas fa-trash-alt remove'></i>
                  </td>
              </tr>
          `
          i++
      }
      strHtml += "</tbody>"
      tblMateriais.innerHTML = strHtml
   } 
    
    renderMaterial();
}

//registo dos materiais
const formMateriais = document.getElementById("formMateriais");


  
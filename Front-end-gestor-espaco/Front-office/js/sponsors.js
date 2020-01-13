window.onload = () => {



	renderSponsors()

  }

const rendersponsor = document.getElementById("renderSponsors")
const renderSponsors = async () => {
  const response = await fetch(`https://gestorespacos.herokuapp.com/sponser`)
  console.log("sdfghj")
  const sponsers = await response.json()
    let str= ``
    console.log("asdddss")
    for (const sponser of sponsers){
	 str += `
	 <div class="col-md-2">
				<h4 style> ${sponser.nome_patrocinador}</h4>
       </div>
	`
	}
    rendersponsor.innerHTML = str
 

  }
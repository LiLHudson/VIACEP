const cep = document.querySelector('#cep');
const address = document.querySelector('#address');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');
const numero = document.querySelector('#numero');
const message = document.querySelector('#message');

cep.addEventListener('focusout',async() => {
        try{
	    
	    const cepValid = /^[0-9]{5}-[\d]{3}$/;
	    const cepValid1 = /^[0-9]{5}[\d]{3}$/;
	
	if (!cepValid.test(cep.value)) {
		if(!cepValid1.test(cep.value)){
	}		
          	address.value = "";
		bairro.value = "";	
		cidade.value = "";
		estado.value = "";
		numero.value = "";
		message.value = "";
		complemento.value = "";
		throw { cep_error: 'Cep Invalido'};	
        }

	
		
            const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
            if(!response.ok){
                throw await response.json();
            }
	    
            const responseCep = await response.json();
            if(responseCep.erro){
		address.value = "";
		bairro.value = "";	
		cidade.value = "";
		estado.value = "";
		numero.value = "";
		message.value = "";
		complemento.value = "";
                throw{cep_error: 'Cep Invalido'};
            }
            
	    console.log(responseCep);

            address.value = responseCep.logradouro;
            bairro.value = responseCep.bairro;
            cidade.value = responseCep.localidade;
            estado.value = responseCep.uf;	


        } catch (error) {
            if(error?.cep_error){
                message.textContent = error.cep_error;
                setTimeout(() => {
                    message.textContent = '';
                }, 5000);
            }
        }    
        
})
 const handleZipCode = (event) => {
	let cep = event.target
	cep.value = zipCodeMask(cep.value)
}
	const zipCodeMask = (value) =>{
	if(!value) return "";
	value = value.replace(/\DZ/g,'');
	value = value.replace(/(\d{5})(\d)/, '$1-$2');
	return value
}

	
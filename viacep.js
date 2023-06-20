const cep = document.querySelector('#cep');
const address = document.querySelector('#address');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');
const numero = document.querySelector('#numero');
const message = document.querySelector('#message');
const cepLenght = document.querySelector('tamanho');


cep.addEventListener('focusout',async() => {
        try {
            const cepValid = /^[0-9]{5}-[\d]{3}$/

        if (!cepValid.test(cep.value)) {
            throw { cep_error: 'Cep Invalido'};
            }
            const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
            if(!response.ok){
                throw await response.json();
            }
	    
            const responseCep = await response.json();
            if(responseCep.erro){
                throw{cep_error: 'Cep Invalido'};
            }
            
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
function limparForm(){
    document.querySelector('#address').value = "";
    document.querySelector('#cidade').value = "";
    document.querySelector('#bairro').value = "";
    document.querySelector('#estado').value = "";
}

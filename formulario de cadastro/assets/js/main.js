

class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.events();
    }
    events() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const isValidCamp = this.validCamps();
        const isPasswordValid = this.passwordValid();
        if (isValidCamp && isPasswordValid) {

            alert('Formulario enviado com sucesso');
            this.formulario.submit();
        }
        console.log('formulario inválido');
    }

    passwordValid() {

        let valid = true;

        const password = this.formulario.querySelector('.senha');
        const passwordRepeat = this.formulario.querySelector('.repetir-senha');

        if (password.value !== passwordRepeat.value) {
            valid = false;
            this.enptyCamps(password, 'As senhas precisam ser iguais');
            this.enptyCamps(passwordRepeat, 'As senhas precisam ser iguais')
        }
        if (password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.enptyCamps(password, 'A senha deve ter no minimo 6 caracteres e no maximo 12');
        }
        return valid;
    }


    validCamps() { //seleção dos campos input
        let valid = true;
        for (let errorRemove of this.formulario.querySelectorAll('.error-text',)) {
            errorRemove.remove();
        }
        for (let camp of this.formulario.querySelectorAll('.input')) {
            const label = camp.parentElement.innerText; // seleçao de parente anterior a este

            if (!camp.value) {
                this.enptyCamps(camp, `O campo "${label}"não pode ser enviado em branco.`);
                valid = false;
            }
            if (camp.classList.contains('cpf')) {
                if (!this.validCPF(camp)) valid = false;
            }
            if (camp.classList.contains('usuario')) {
                if (!this.validUser(camp)) valid = false;
            }
        }
        return valid;
    }
    validUser(camp) {

        const user = camp.value;
        let valid = true;

        if (user.length < 3 || user.length > 12) {
            this.enptyCamps(camp, 'Usuário tem que conter de 3 a 12 caracteres');
            valid = false;

        }
        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.enptyCamps(camp, 'Usuário tem que conter letras e/ou numeros');
            valid = false;

        }

        return true;
    }
    validCPF(camp) {// codigos acessados de outro documento

        const cpf = new ValidaCpf(camp.value); 
        if (!cpf.valida()) {
            this.enptyCamps(camp, 'CPF inválido.');
            return false;
        }
        return true;
    }
    enptyCamps(camp, msg) { //criação de elemento que enviará a msg de aviso

        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        camp.insertAdjacentElement('afterend', div);
    }
}


const fomularioValido = new ValidaFormulario();
console.log(fomularioValido);



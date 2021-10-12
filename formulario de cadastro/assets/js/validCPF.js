//705.484.450-52
/*
7x  0x 5x 4x 8x 4x 4x 5x 0x 
10  9  8  7  6  5  4  3  2 
70  0  40 28 48 20 16 15 0  = 237

11 - (237%11) = 5 (primeiro digito cpf)
numero maior que nove é igual a 0

*/

function ValidaCpf(cpfEnviado) {

    Object.defineProperty(this, 'cpfLimpo', {

        get: function () {
            return cpfEnviado.replace(/\D/g, '')
        }
    });

}
ValidaCpf.prototype.valida = function () {
    if (typeof this.cpfLimpo === 'undefined') return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaCalculo(cpfParcial);
    const digito2 = this.criaCalculo(cpfParcial + digito1);
    const cpfInteiro = cpfParcial + digito1 + digito2;
    console.log(cpfInteiro);
    return cpfInteiro === this.cpfLimpo;
};

ValidaCpf.prototype.criaCalculo = function (cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length + 1;
    const digito = cpfArray.reduce((ac, val) => {

        ac += (regressivo * Number(val));
        regressivo--;
        return ac;

    }, 0);
    const contaDigito = 11 - (digito % 11);

    return contaDigito > 9 ? '0' : String(contaDigito);


}

ValidaCpf.prototype.isSequencia = function () {
    const sequencial = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencial === this.cpfLimpo;
}
const cpf = new ValidaCpf('070.987.720-03'); //705.484.450-52 //070.987.720-03

//console.log(cpf.valida());
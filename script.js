function criaCalculadora(){
    return{
        display: document.querySelector(".display"),
        btnClear: document.querySelector(".btn-num-clear"),
        
        cliqueiBtn: function(){
            document.addEventListener("click", function(e){
                const el = e.target;

                if(el.classList.contains('btn-num')){
                    this.btnParaDisplay(el.innerText);
                }

                if(el.classList.contains('btn-num-clear')){
                    this.clearDisplay();
                }
                
                if(el.classList.contains('btn-num-del')){
                    this.deleteOne();
                }

                if(el.classList.contains('btn-num-eq')){
                    this.sum();
                }

            }.bind(this));
        },

        btnParaDisplay: function(valor){
            this.display.value += valor;
        },

        inicia: function(){
            this.cliqueiBtn();
            this.pressEnter();
        },

        pressEnter: function() {
            this.display.addEventListener("keyup", (e) => {
                if (e.key === "Enter") {
                    this.sum();
                }
            });
        },

        deleteOne: function(){
            this.display.value = this.display.value.slice(0, -1);
        },

        clearDisplay: function(){
            this.display.value = "";
        },

        sum: function() {
            let conta = this.display.value;
        
            if (!/^[\d+\-*/().\s]+$/.test(conta)) {
                alert("CONTA INVÁLIDA");
                return;
            }
        
            try {
                const result = this.safeEval(conta);
        
                if (isNaN(result) || !isFinite(result)) {
                    throw new Error();
                }
        
                this.display.value = result;
            } catch {
                alert("CONTA INVÁLIDA");
            }
        },
        

        safeEval: function(expr) {
            return Function('"use strict"; return (' + expr + ')')();
        }
};
}

const calculadora = criaCalculadora();
calculadora.inicia();
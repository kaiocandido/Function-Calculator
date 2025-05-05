function Calculadora(){
    
        this.display = document.querySelector(".display");
        this.btnClear = document.querySelector(".btn-num-clear");
        
        this.cliqueiBtn = function(){
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
        };

        
        this.btnParaDisplay = function(valor){
            this.display.value += valor;
       };

        this.inicia= function(){
            this.cliqueiBtn();
            this.pressEnter();
        };

        this.pressEnter = function() {
            this.display.addEventListener("keyup", (e) => {
                if (e.key === "Enter") {
                    this.sum();
                }
            });
        };

        this.deleteOne = function(){
            this.display.value = this.display.value.slice(0, -1);
        };

        this.clearDisplay = function(){
            this.display.value = "";
        };

        this.sum = function() {
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
        };
        

        this.safeEval = function(expr) {
            return Function('"use strict"; return (' + expr + ')')();
        };
};


const calculadora = new Calculadora();
calculadora.inicia();
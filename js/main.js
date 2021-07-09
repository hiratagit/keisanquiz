'use strict';
{

    class Foumula {
        constructor(operator) {
            this.firstValue = 'undefined';
            this.secondValue = 'undefined';
            this.operator = operator;
            this.setUp(this.operator);
        }

        setUp() {
            const value1 = document.getElementById('value1');
            const value2 = document.getElementById('value2');
            const operator = document.getElementById('operator');
            const equal = document.getElementById('equal');

            let num1 = Math.floor(Math.random() * 11);
            let num2 = Math.floor(Math.random() * 11);

            if(this.operator === 'minus' && num2 > num1) {
                 [num1, num2] = [num2, num1];
            }

            value1.textContent = num1;
            value2.textContent = num2;
            operator.textContent = (this.operator === 'plus') ? '+' : '-';
            equal.textContent = '=';

            this.firstValue = num1;
            this.secondValue = num2;
        }

        getAnswer() {
            if(this.operator === 'plus') {
                return this.firstValue + this.secondValue;
            }

            if(this.operator === 'minus') {
                return this.firstValue - this.secondValue;
            }
        }
    }

    let answer;

    function setFormula() {
        const operators = [ 'plus', 'minus' ];
        const formula = new Foumula(operators[Math.floor(Math.random() * operators.length)]);
        answer = formula.getAnswer();
        document.getElementById('answer-text').textContent = '';
        changeJudgeMark();
    }

    setFormula();


    
    /*--------------------------------
     * 音声認識
     --------------------------------*/

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'ja';

    function setAnswer(transcript) {
        const ansNum = parseInt(transcript, 10);

        const answer = document.getElementById('answer-text');
        const attension = document.getElementById('attension');

        answer.textContent = '';
        attension.classList.remove('blinking');

        if(isNaN(ansNum)) {
            setTimeout(() => {
                attension.classList.add('blinking');
            }, 10)
        } else {
            answer.textContent =  ansNum;
            judgeAnswer(ansNum);
        }

    }

    function judgeAnswer(num) {
        const correctSound = document.getElementById('correctSound');
        const wrongSound = document.getElementById('wrongSound');
        // correctSound.play();
        
        if(num === answer) {
            correctSound.currentTime = 0;
            correctSound.play();
            changeJudgeMark('url(../img/correct.png)');
            setTimeout(setFormula, 1000);
            
        } else {
            wrongSound.currentTime = 0;
            wrongSound.play();
            changeJudgeMark('url(../img/wrong.png)');
            setTimeout(() => {
                changeJudgeMark();
            }, 1000)
        }
    }

    function changeJudgeMark(url = '') {
        const judgeMark = document.getElementById('judge-mark');
        judgeMark.style.backgroundImage = url;
    }

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        if (e.results[0].isFinal) {
            setAnswer(transcript);
            recognition.stop();
        }
    });

    recognition.addEventListener('end', () => {
        recognition.start();
    });


    recognition.start();

}
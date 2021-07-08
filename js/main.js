'use strict';
{

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'ja';

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        if (e.results[0].isFinal) {
            console.log(transcript)
            const ansNum = parseInt(transcript, 10);

            const answer = document.getElementById('answer-text');
            const attension = document.getElementById('attension');

            answer.textContent = '';
            attension.classList.remove('blinking');
    
            
            if(isNaN(ansNum)) {
                setTimeout(() => {
                    attension.classList.add('blinking');
                }, 50)
            } else {
                answer.textContent =  ansNum;
            }
        }
    });

    recognition.addEventListener('end', () => {
        recognition.start();
    });


    recognition.start();

}
document.addEventListener('DOMContentLoaded', function () {
    let verses = [];
    let currentVerseIndex = 0;
    let score = 0;
    const maxQuestions = 20;

    // Fetch verses from JSON file
    fetch('verses.json')
        .then(response => response.json())
        .then(data => {
            verses = data;
            shuffleArray(verses);
            verses = verses.slice(0, maxQuestions); // Limit to maxQuestions
            displayNextVerse();
        })
        .catch(error => console.error('Error loading verses:', error));

    // Event listeners for buttons
    document.getElementById('with-button').addEventListener('click', () => checkAnswer('with'));
    document.getElementById('in-button').addEventListener('click', () => checkAnswer('in'));
    document.getElementById('in&with-button').addEventListener('click', () => checkAnswer('in&with'));
    document.getElementById('next-button').addEventListener('click', nextQuestion);
    document.getElementById('replay-button').addEventListener('click', replayGame);

    function displayNextVerse() {
        if (currentVerseIndex < verses.length) {
            document.getElementById('verse-text').textContent = verses[currentVerseIndex].verse;
            document.getElementById('result-text').textContent = '';
            document.getElementById('buttons-container').style.display = 'block';
            document.getElementById('next-button').style.display = 'none';
        } else {
            endGame();
        }
    }

    function checkAnswer(selectedWord) {
        const correctWord = verses[currentVerseIndex].word;
        if (selectedWord === correctWord) {
            score++;
            document.getElementById('result-text').textContent = 'Correct!';
        } else {
            document.getElementById('result-text').textContent = `Wrong! The correct word was "${correctWord}".`;
        }
        document.getElementById('score-text').textContent = `Score: ${score}`;
        document.getElementById('buttons-container').style.display = 'none';
        document.getElementById('next-button').style.display = 'inline-block';
    }

    function nextQuestion() {
        currentVerseIndex++;
        displayNextVerse();
    }

    function endGame() {
        document.getElementById('verse-text').textContent = `Game over! Your final score is ${score}/${maxQuestions}.`;
        document.getElementById('buttons-container').style.display = 'none';
        document.getElementById('next-button').style.display = 'none';
        document.getElementById('replay-button').style.display = 'inline-block';
    }

    function replayGame() {
        currentVerseIndex = 0;
        score = 0;
        shuffleArray(verses);
        displayNextVerse();
        document.getElementById('score-text').textContent = 'Score: 0';
        document.getElementById('replay-button').style.display = 'none';
    }

    // Utility function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});

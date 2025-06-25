
const form = document.querySelector(".submit");
const searchInput = document.getElementById("searchInput");
const resultDiv = document.querySelector('.result');
const secondDiv = document.querySelector('.second');
const toggleBtn = document.querySelector('.toggle-mode');
const inputBtn = document.querySelector('.searchInput');


form.addEventListener('click', (e) => {
    e.preventDefault();
    getWordInfo(searchInput.value.trim());
});

const getWordInfo = async (words) => {
    try {
        resultDiv.innerHTML = "Fetching Data";
        secondDiv.innerHTML = "";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${words}`);
        if (!response.ok) {
            throw new Error(`Word not found (${response.status})`);
        }
        const data = await response.json(); // Corrected
        const phonetics = data[0].phonetics || [];
        const audioObj = phonetics.find(p => p.audio);
        const audioUrl = audioObj?.audio || null;

        const definitions = data[0].meanings[0].definitions[0];
        resultDiv.innerHTML = `<h2><strong>Word: </strong>${data[0].word}</h2>
        ${audioUrl ? `<button id="playAudio" class="playAudio" style="margin-left: 1px;">🔊</button>` : ""}
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p class="definition-row"><strong> Meaning : </strong> <span class="definition">
        <span class="def">${definitions.definition == undefined ? "Not Found" : definitions.definition}
        </span>
        <button id="copyBtn" class="copyBtn" >📋</button>
        </span>
        </p>
        <p class="example"><strong>Example: </strong>
        <span >${definitions.example == undefined ? "Not Found" : definitions.example}
        </span>
        </p>
        <p class="antonyms"><strong>Antonyms : </strong></p>
        `;

        setTimeout(() => {
            if (audioUrl) {
                console.log("audio url : ", audioUrl);
                const playBtn = document.getElementById("playAudio");
                console.log(playBtn);
                playBtn.addEventListener("click", () => {
                    console.log("Button clicked");
                    const audio = new Audio(audioUrl);
                    audio.play().catch(err => console.error("Audio error: ", err));
                });
        }
        }, 50);


        //copy button
        setTimeout(() => {
          const copyButton = document.querySelector('.copyBtn');
            const defText = document.querySelector('.def');
            const d = document.querySelector('.example');
            const a = document.querySelector('.antonyms');
            
            if (copyButton && defText) {
                copyButton.addEventListener("click", () => {
                    const text = d.textContent;

                    navigator.clipboard.writeText(defText.textContent+text).then(()=> {
                        copyButton.textContent = "Copied!";
                        setTimeout(() =>copyButton.textContent="📋",1500);
                    }).catch(err => {
                        console.error("Copy failed", err);
                        copyButton.textContent = "Error!";
                    })
                });
            }
        },100);

        

        if (definitions.antonyms.length === 0) {
            resultDiv.innerHTML += `<span>Not Found</span>`;
        }
        else {
            for (let i = 0; i < definitions.antonyms.length; i++) {
                resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
            }
        }
        resultDiv.innerHTML += `<p><strong>Synonyms : </strong></p>`;
        if (definitions.synonyms.length === 0) {
            resultDiv.innerHTML += `<span>Not Found</span>
                <br>`
        }
        else {
            definitions.synonyms.forEach(synonym => {
                resultDiv.innerHTML += `<li>${synonym}</li>`;
            });
        }


        const d = data[0].meanings[1].definitions[0];
        secondDiv.innerHTML = `<br>
        <br>
        <h2><strong>Word: </strong>${data[0].word}</h2>
        <p>${data[0].meanings[1].partOfSpeech}</p>
        <p><strong> Meaning : </strong> <span class="secondDef">
        <span class="def-2">${d.definition == undefined ? "Not Found" : d.definition}
        </span> 
        <button class="copy">📋</button>
        </span>
        </p>
        <p><strong>Example: </strong>
        <span class="example-2">${d.example == undefined ? "Not Found" : d.example}
        </span>
        </p>
        <p><strong>Antonyms : </strong></p>
        `;
        if (d.antonyms.length === 0) {
            secondDiv.innerHTML += `<span>Not Found</span>`;
        }
        else {
            for (let i = 0; i < d.antonyms.length; i++) {
                secondDiv.innerHTML += `<li>${d.antonyms[i]}</li>`
            }
        }
        secondDiv.innerHTML += `<p><strong>Synonyms : </strong></p>`;
        if (d.synonyms.length === 0) {
            secondDiv.innerHTML += `<span>Not Found</span>
                <br>`
        }
        else {
            d.synonyms.forEach(synonym => {
                secondDiv.innerHTML += `<li>${synonym}</li>`;
            });
        }
        let btn = `<br>
        
            <a class="read" href="${data[0].sourceUrls}" target="_blank">Read More</a>
        `;
        secondDiv.innerHTML += btn;
        //document.querySelector(".read").classList.add("highlight");
        //document.querySelector(".read").style.color = "purple";
        console.log(data);
    } catch (error) {
        resultDiv.innerHTML = `<p>Sorry , the word could not be found</p>`;
        secondDiv.innerHTML = "";
        console.log(error);
    }

    setTimeout(() => {
    const copyButton2 = document.querySelector('.copy');
        const defText2 = document.querySelector('.def-2');
        const e = document.querySelector('.example-2');
    if (copyButton2 && defText2) {
        copyButton2.addEventListener("click", () => {
            const text = e.textContent;
            navigator.clipboard.writeText(defText2.textContent+text)
            .then(() => {
                copyButton2.textContent = "Copied!";
                setTimeout(() => copyButton2.textContent = "📋", 1500);
            })
            .catch(() => {
                console.error("Copying failed");
                copyButton2.textContent = "Error!";
            });
        });
    }
}, 100);


};






/*toggle */

if (localStorage.getItem("mode") === "light") {
  document.body.classList.add("light-mode");
}


toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("mode", "light");
    }
    else {
        localStorage.setItem("mode", "dark");
        
    }
=======
const form = document.querySelector(".submit");
const searchInput = document.getElementById("searchInput");
const resultDiv = document.querySelector('.result');
const secondDiv = document.querySelector('.second');
const toggleBtn = document.querySelector('.toggle-mode');
const inputBtn = document.querySelector('.searchInput');


form.addEventListener('click', (e) => {
    e.preventDefault();
    getWordInfo(searchInput.value.trim());
});

const getWordInfo = async (words) => {
    try {
        resultDiv.innerHTML = "Fetching Data";
        secondDiv.innerHTML = "";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${words}`);
        if (!response.ok) {
            throw new Error(`Word not found (${response.status})`);
        }
        const data = await response.json(); // Corrected
        const phonetics = data[0].phonetics || [];
        const audioObj = phonetics.find(p => p.audio);
        const audioUrl = audioObj?.audio || null;

        const definitions = data[0].meanings[0].definitions[0];
        resultDiv.innerHTML = `<h2><strong>Word: </strong>${data[0].word}</h2>
        ${audioUrl ? `<button id="playAudio" class="playAudio" style="margin-left: 1px;">🔊</button>` : ""}
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p class="definition-row"><strong> Meaning : </strong> <span class="definition">
        <span class="def">${definitions.definition == undefined ? "Not Found" : definitions.definition}
        </span>
        <button id="copyBtn" class="copyBtn" >📋</button>
        </span>
        </p>
        <p class="example"><strong>Example: </strong>
        <span >${definitions.example == undefined ? "Not Found" : definitions.example}
        </span>
        </p>
        <p class="antonyms"><strong>Antonyms : </strong></p>
        `;

        setTimeout(() => {
            if (audioUrl) {
                console.log("audio url : ", audioUrl);
                const playBtn = document.getElementById("playAudio");
                console.log(playBtn);
                playBtn.addEventListener("click", () => {
                    console.log("Button clicked");
                    const audio = new Audio(audioUrl);
                    audio.play().catch(err => console.error("Audio error: ", err));
                });
        }
        }, 50);


        //copy button
        setTimeout(() => {
          const copyButton = document.querySelector('.copyBtn');
            const defText = document.querySelector('.def');
            const d = document.querySelector('.example');
            const a = document.querySelector('.antonyms');
            
            if (copyButton && defText) {
                copyButton.addEventListener("click", () => {
                    const text = d.textContent;

                    navigator.clipboard.writeText(defText.textContent+text).then(()=> {
                        copyButton.textContent = "Copied!";
                        setTimeout(() =>copyButton.textContent="📋",1500);
                    }).catch(err => {
                        console.error("Copy failed", err);
                        copyButton.textContent = "Error!";
                    })
                });
            }
        },100);

        

        if (definitions.antonyms.length === 0) {
            resultDiv.innerHTML += `<span>Not Found</span>`;
        }
        else {
            for (let i = 0; i < definitions.antonyms.length; i++) {
                resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
            }
        }
        resultDiv.innerHTML += `<p><strong>Synonyms : </strong></p>`;
        if (definitions.synonyms.length === 0) {
            resultDiv.innerHTML += `<span>Not Found</span>
                <br>`
        }
        else {
            definitions.synonyms.forEach(synonym => {
                resultDiv.innerHTML += `<li>${synonym}</li>`;
            });
        }


        const d = data[0].meanings[1].definitions[0];
        secondDiv.innerHTML = `<br>
        <br>
        <h2><strong>Word: </strong>${data[0].word}</h2>
        <p>${data[0].meanings[1].partOfSpeech}</p>
        <p><strong> Meaning : </strong> <span class="secondDef">
        <span class="def-2">${d.definition == undefined ? "Not Found" : d.definition}
        </span> 
        <button class="copy">📋</button>
        </span>
        </p>
        <p><strong>Example: </strong>
        <span class="example-2">${d.example == undefined ? "Not Found" : d.example}
        </span>
        </p>
        <p><strong>Antonyms : </strong></p>
        `;
        if (d.antonyms.length === 0) {
            secondDiv.innerHTML += `<span>Not Found</span>`;
        }
        else {
            for (let i = 0; i < d.antonyms.length; i++) {
                secondDiv.innerHTML += `<li>${d.antonyms[i]}</li>`
            }
        }
        secondDiv.innerHTML += `<p><strong>Synonyms : </strong></p>`;
        if (d.synonyms.length === 0) {
            secondDiv.innerHTML += `<span>Not Found</span>
                <br>`
        }
        else {
            d.synonyms.forEach(synonym => {
                secondDiv.innerHTML += `<li>${synonym}</li>`;
            });
        }
        let btn = `<br>
        
            <a class="read" href="${data[0].sourceUrls}" target="_blank">Read More</a>
        `;
        secondDiv.innerHTML += btn;
        //document.querySelector(".read").classList.add("highlight");
        //document.querySelector(".read").style.color = "purple";
        console.log(data);
    } catch (error) {
        resultDiv.innerHTML = `<p>Sorry , the word could not be found</p>`;
        secondDiv.innerHTML = "";
        console.log(error);
    }

    setTimeout(() => {
    const copyButton2 = document.querySelector('.copy');
        const defText2 = document.querySelector('.def-2');
        const e = document.querySelector('.example-2');
    if (copyButton2 && defText2) {
        copyButton2.addEventListener("click", () => {
            const text = e.textContent;
            navigator.clipboard.writeText(defText2.textContent+text)
            .then(() => {
                copyButton2.textContent = "Copied!";
                setTimeout(() => copyButton2.textContent = "📋", 1500);
            })
            .catch(() => {
                console.error("Copying failed");
                copyButton2.textContent = "Error!";
            });
        });
    }
}, 100);


};






/*toggle */

if (localStorage.getItem("mode") === "light") {
  document.body.classList.add("light-mode");
}


toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("mode", "light");
    }
    else {
        localStorage.setItem("mode", "dark");
        
    }
>>>>>>> 6943932c70a45ee6bb60fafb60b5d0e3a50e6790
});
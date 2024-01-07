const fromtext = document.querySelector(".from-text"),
    totext = document.querySelector(".to-text"),
    selecttag = document.querySelectorAll("select"),
    exchangeicon = document.querySelector(".exchange"),
    translatebtn = document.querySelector("button"),
    icons = document.querySelectorAll(".row i");

selecttag.forEach((tag, id) => {
    for (const country_code in countries) {
        // selecting English by default as From language and hindi as to langauge
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        } else if (id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); // adding options tag inside select tag
    }
});

exchangeicon.addEventListener("click", () => {
    // exchanging textarea and select tag values
    let temptext = fromtext.value,
        templang = selecttag[0].value;
    fromtext.value = totext.value;
    selecttag[0].value = selecttag[1].value;
    totext.value = temptext;
    selecttag[1].value = templang;
});

translatebtn.addEventListener("click", () => {
    let text = fromtext.value,
        translatefrom = selecttag[0].value, // getting fromselect tag value
        translateto = selecttag[1].value;  // getting toselect tag value 
        if(!text) return;
        totext.setAttribute("placeholder","Translating ...")
        let apirul = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateto}`;
        // fetching api response and returning it with parsing into js obj
        // and in another then method receiving that obj
        fetch(apirul).then(res => res.json()).then(data => {
            totext.value = data.responseData.translatedText;
            totext.setAttribute("placeholder","Translation")
    })
})
icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            // if clicked icon from id , copy the fromtextarea value else copy the toarea value
            if (target.id == "from") {
                navigator.clipboard.writeText(fromtext.value);
            } else {
                navigator.clipboard.writeText(totext.value);
            }
        } else {
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromtext.value);
                utterance.lang = selecttag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(totext.value);
                utterance.lang = selecttag[1].value;
            }
            speechSynthesis.speak(utterance) // speak the passed utterance 
        }
    })
})
const getSynonyms = (synonyms) => {
  if (!synonyms || synonyms.length === 0) {
    return `<p class="font-bangla text-[#79716B] text-[14px] leading-6 mb-3">এই শব্দের কোন সমার্থক শব্দ পাওয়া যায়নি।</p>`;
  }

  const synonymButtons = synonyms.map((synonym) => {
    return `<span class="btn bg-[#EDF7FF]">${synonym}</span>`;
  });

  return synonymButtons.join(" ");
}

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const allBtn = document.getElementsByClassName("lesson-btn");
      for (let btn of allBtn) {
        btn.classList.remove("btn-active");
      }

      const clickBtn = document.getElementById(`lesson-btn-${id}`);

      clickBtn.classList.add("btn-active");

      displayLevelWord(data.data);
    });
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const result = await fetch(url);
  const data = await result.json();
  displayWordDetails(data.data);
};

const displayWordDetails = (word) => {
  const displayDetails = document.getElementById("displayDetails");
  displayDetails.innerHTML = `

  <div>
                    <h2 class="font-semibold text-3xl leading-10 mb-6">${word.word ? word.word : "শব্দ পাওয়া যায়নি"} (<i
                            class=" fa-solid fa-microphone-lines "></i> : ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"})</h2>
                    <div class="mb-6">
                        <h4 class="font-semibold text-2xl leading-10 mb-2">Meaning</h4>
                        <p class="font-bangla font-medium text-xl ">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>
                    </div>
                    <div class="mb-6">
                        <h4 class="font-semibold text-2xl leading-10 mb-2">Example</h4>
                        <p class="opacity-80 font-medium text-xl ">${word.sentence ? word.sentence : "উদাহরণ পাওয়া যায়নি"}</p>
                    </div>
                    <div id="synonyms">
                        <h4 class="font-medium text-2xl leading-10  font-bangla">Synonyms</h4>
                        <div>
                           ${getSynonyms(word.synonyms)}
                        </div>

                    </div>
                </div>

  `;

  

  // const getWord = (words) => {
  //   for (let word of words) {
  //     const synonyms = document.getElementById("synonyms");
  //     const span = document.createElement("span");
  //     span.innerHTML = `
  //       <span class="btn btn-soft btn-info">${word}</span>
  //       `;
  //     synonyms.appendChild(span);
  //   }
  // };

  // getWord(word.synonyms);

  document.getElementById("my_modal_5").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
        <div class="text-center col-span-full p-10">
            <img class=" mx-auto mb-6" src = "./assets/alert-error.png">
            <p class="font-bangla text-[#79716B] text-[14px] leading-6 mb-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-[#292524] text-[34px] font-bangla font-medium leading-10">নেক্সট Lesson এ যান</h2>
        </div>
        `;
    return;
  }

  words.forEach((word) => {
    //       {
    //     "id": 75,
    //     "level": 1,
    //     "word": "Eat",
    //     "meaning": "খাওয়া",
    //     "pronunciation": "ইট"
    // }
    const card = document.createElement("div");
    card.innerHTML = `
         <div class="bg-white rounded-[12px] text-center shadow-sm py-10 px-5 max-h-[320px]">
            <h2 class="font-bold text-[32px] leading-6 mb-6">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-medium text-xl mb-6">Meaning /Pronounciation</p>
            <div class="font-semibold text-[32px] text-[#18181B] opacity-80 font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center mt-12">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>
        `;
    wordContainer.append(card);
  });
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;

    levelContainer.append(btnDiv);
  }
};

loadLessons();

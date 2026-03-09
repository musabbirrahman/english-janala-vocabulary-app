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
      };
      
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      
      clickBtn.classList.add("btn-active");

      displayLevelWord(data.data)
    });
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
    console.log(word);
    //       {
    //     "id": 75,
    //     "level": 1,
    //     "word": "Eat",
    //     "meaning": "খাওয়া",
    //     "pronunciation": "ইট"
    // }
    const card = document.createElement("div");
    card.innerHTML = `
         <div class="bg-white rounded-[12px] text-center shadow-sm py-10 px-5">
            <h2 class="font-bold text-[32px] leading-6 mb-6">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-medium text-xl mb-6">Meaning /Pronounciation</p>
            <div class="font-semibold text-[32px] text-[#18181B] opacity-80 font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center mt-12">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
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

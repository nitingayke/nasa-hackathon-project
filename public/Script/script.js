const lessonQuery = document.querySelectorAll(".lession-query");
const lessionBox = document.querySelectorAll(".lesson-answers");

for(let box of lessonQuery){
    box.addEventListener("click", (event) => {
        let lessionBoxId = box.id;

        for(let lbox of lessionBox){
            if(lbox.classList.contains("visible")){
                if(lessionBoxId == lbox.id)
                    return ;

                lbox.classList.remove("visible");
            }
            if(lbox.id == lessionBoxId){
                lbox.classList.add("visible");
            }
        }
    });
}

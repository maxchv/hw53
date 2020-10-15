window.addEventListener('load', () => {
    let amountOfElements = 0;
    let pushElem = [];
    let content = [];

    let restoreContent = JSON.parse(localStorage.getItem('saveContent'));
    let restorePushElem = JSON.parse(localStorage.getItem('savePushElem'));

    let addToDoList = function () {
        // restoreContent может быт null
        for (let i = 0; i < restoreContent.length; i++) {
            pushElem[i] = restorePushElem[i];
            content[i] = restoreContent[i];
            let divMain = document.createElement("div");
            divMain.id = "main" + i;
            divMain.style.display = "flex";
            divMain.style.flexWrap = "Wrap";
            let inputChek = document.createElement("input");
            inputChek.id = "divChek" + i;
            inputChek.type = "checkbox";
            inputChek.className = "divChek";
            let divToDoList = document.createElement("div");
            if (pushElem[i] % 2 !== 0) {
                inputChek.checked = true;
                divToDoList.style.textDecoration = "line-through";
            }
            divToDoList.id = "toDoList" + i;
            divToDoList.className = "toDoList";
            let buttonDelete = document.createElement("button");
            buttonDelete.id = "buttonDelete" + i;
            buttonDelete.className = "buttonDelete";
            buttonDelete.innerText = "Удалить";
            let txt = content[i];
            divToDoList.append(inputChek, txt);
            divMain.append(divToDoList, buttonDelete);
            document.getElementById("container2").append(divMain);
        }
    }
    addToDoList();

    amountOfElements = restoreContent.length;
    for (let i = 0; i < restoreContent.length; i++) {
        content[i] = restoreContent[i];
        pushElem[i] = restorePushElem[i];

    }

    let buttonAddClick = function (e) {
        if (e.target.id === "buttonAdd" || e.key === "Enter") {
            if (document.querySelector('[type="text"]').value.length > 0) {
                pushElem[amountOfElements] = 0;
                let divMain = document.createElement("div");
                divMain.id = "main" + amountOfElements;
                divMain.style.display = "flex";
                divMain.style.flexWrap = "Wrap";
                let inputChek = document.createElement("input");
                inputChek.id = "divChek" + amountOfElements;
                inputChek.type = "checkbox";
                inputChek.className = "divChek"
                let divToDoList = document.createElement("div");
                divToDoList.id = "toDoList" + amountOfElements;
                divToDoList.className = "toDoList";
                let buttonDelete = document.createElement("button");
                buttonDelete.id = "buttonDelete" + amountOfElements;
                buttonDelete.className = "buttonDelete";
                buttonDelete.innerText = "Удалить";
                let txt = document.querySelector('[type="text"]').value;
                content[amountOfElements] = txt;
                divToDoList.append(inputChek, txt);
                divMain.append(divToDoList, buttonDelete);
                document.getElementById("container2").append(divMain);
                document.querySelector('[type="text"]').value = null;
                amountOfElements++;
            }
        }
    }

    let chekChekbox = function (e) {
        let chek = true;
        for (let i = 0; i <= amountOfElements; i++) {
            if (e.target.id === ("divChek") + i) {
                console.log(pushElem[i]);
                if (pushElem[i] % 2 === 0 && chek) {
                    document.getElementById("toDoList" + i).style.textDecoration = "line-through";
                }
                if (pushElem[i] % 2 !== 0) {
                    document.getElementById("toDoList" + i).style.textDecoration = "none";
                }
                pushElem[i]++;
            }
        }
    }
    let pushButtonDelete = function (e) {
        for (let i = 0; i <= amountOfElements; i++) {
            if (e.target.id === ("buttonDelete") + i) {
                let parent = document.getElementById("container2");
                let child = document.getElementById("main" + i);
                content.splice(i, 1);
                pushElem.splice(i, 1);
                parent.removeChild(child);
            }
        }
    }


    let saveContent = [];
    let savePushElem = [];
    window.onbeforeunload = function (e) {
        for (let i = 0; i < content.length; i++) {
            if (content[i] !== null) {
                saveContent[i] = content[i];
                savePushElem[i] = pushElem[i];
            }
        }
        console.dir(savePushElem);
        console.dir(saveContent);
        localStorage.clear();
        localStorage.setItem('saveContent', JSON.stringify(saveContent));
        localStorage.setItem('savePushElem', JSON.stringify(savePushElem));
    }

    document.body.addEventListener('click', buttonAddClick);
    document.body.addEventListener("keydown",buttonAddClick);
    document.body.addEventListener('click', chekChekbox);
    document.body.addEventListener('click', pushButtonDelete);

});

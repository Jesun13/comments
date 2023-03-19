let comments = [];
// loadComments();

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;

document.getElementById("comment-add").onclick = function () {
    event.preventDefault();
    let commentName = document.getElementById("comments-name");
    let commentDate = document.getElementById("comments-date");
    let commentBody = document.getElementById("comment-body");

    let comment = {
        name: commentName.value,
        date: commentDate.value ? commentDate.value : today,
        body: commentBody.value,
        time: Math.floor(Date.now() / 1000),
    };

    let yesterday = today.split("-").slice(2).join();
    let dateYesterday = comment.date.split("-").slice(2).join();

    if (comment.date == today) {
        comment.date = "Сегодня";
    }
    if (dateYesterday == yesterday - 1) {
        comment.date = "Вчера";
    }

    commentBody.value = "";
    commentDate.value = "";
    commentName.value = "";
    document.getElementById("comment-add").disabled = true;
    comments.push(comment);
    saveComments();
    showComments();
};

function saveComments() {
    localStorage.setItem("comments", JSON.stringify(comments));
}

function loadComments() {
    if (localStorage.getItem("comments"))
        comments = JSON.parse(localStorage.getItem("comments"));
    showComments();
}

function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let hour = a.getHours();
    let minutes = a.getMinutes();
    let time = hour + ":" + minutes;
    return time;
}

function dateConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let day = a.getDate();
    let month = a.getMonth();
    let year = a.getFullYear();
    let dateNow = day + "-" + month + "-" + year;
    return dateNow;
}

function deleteSubmit() {
    commentField.innerHTML = "";
}

function showComments() {
    let commentField = document.getElementById("comments__field");
    let out = "";

    comments.forEach((item, id) => {
        out += `<div id='${id}' class = 'commemts__item'>
        <div ' class = 'commemts__header'>
        <p class = 'comments__name'>${item.name}: </p>
        <div class = 'comments__icons'>
        <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
        <svg class ='comments__heart' fill="#000000" width="27px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M26.996 12.898c-.064-2.207-1.084-4.021-2.527-5.13-1.856-1.428-4.415-1.69-6.542-.132-.702.516-1.359 1.23-1.927 2.168-.568-.938-1.224-1.652-1.927-2.167-2.127-1.559-4.685-1.297-6.542.132-1.444 1.109-2.463 2.923-2.527 5.13-.035 1.172.145 2.48.788 3.803 1.01 2.077 5.755 6.695 10.171 10.683l.035.038.002-.002.002.002.036-.038c4.415-3.987 9.159-8.605 10.17-10.683.644-1.323.822-2.632.788-3.804z"/></svg>
               <button id='${id}' class = 'btn-delete' onclick= 'deleteSubmit(this.id)'><img src="./images/delete-btn.png" alt="" style="width: 20px"></button>
        </div>
       
        </div>
        <p class = 'comments__date'>${item.date} в ${timeConverter(
            item.time
        )}</p>
        <p class = 'comments__body'>${item.body}</p>
            </div>`;
    });

    commentField.innerHTML = out;
}

// удалить комментарий
function deleteSubmit(clicked_id) {
    localStorage.removeItem(`comments[${clicked_id}]` );
    document.getElementById(`${clicked_id}`).remove();
    console.log(`comments ${[clicked_id]}` );
}

console.log(localStorage.comments);

// поставить/убрать лайк
document.addEventListener("click", function (e) {
    if (e.target.tagName === "path") {
        e.target.classList.toggle("active");
    }
});

//Валидация формы
let commentNameValidate = document.getElementById("comments-name");
let commentMessageName = document.querySelector(".error-message-name");
let commentMessageBody = document.querySelector(".error-message-body");
let commentBodyValidate = document.getElementById("comment-body");

document.getElementById("comment-add").disabled = true;

commentNameValidate.onblur = function () {
    if (this.value.length <= 1) {
        this.classList.add("error");
        commentMessageName.classList.add("active");
        document.getElementById("comment-add").disabled = true;
    } else {
        this.classList.remove("error");
        commentMessageName.classList.remove("active");
        document.getElementById("comment-add").disabled = false;
    }
};

commentBodyValidate.onblur = function () {
    if (this.value.length <= 5) {
        this.classList.add("error");
        commentMessageBody.classList.add("active");
        document.getElementById("comment-add").disabled = true;
    } else {
        this.classList.remove("error");
        commentMessageBody.classList.remove("active");
        document.getElementById("comment-add").disabled = false;
    }

};

   

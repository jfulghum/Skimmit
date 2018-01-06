$.ajax("/api/v1/posts"), {
  method: "PATCH",
  success: function(data) {
    
  }
}

$.ajax("/api/v1/posts", {
  method: "GET",
  success: function(data) {
    data.forEach(function(post){ // can't use fat arrows on the front end b/c it may not be compatiable
      var div = document.createElement("div")
      div.innerHTML = "<h1>" + post.title + "</h1>" + "<p>" + post.text + "</p>";
      div.id = post._id;
      div.innerHTML += "<button class='btn btn-red'>delete me</button>"
      div.innerHTML += "<button class='btn btn-blue'>edit me</button>"
      div.innerHTML += "<img class ='love-icon' src='./love-emoticon.png' alt=''>"
      var button = div.querySelector("button");
      button.addEventListener("click", deleteHandler);
      div.className = "post"; // this lets us style in css!
      document.body.appendChild(div);
    });
  }
});

function deleteHandler(e) {
  $.ajax("/api/v1/post/" + e.target.parentNode.id, {
    method: "DELETE",
    success: function(data) {
      location.reload();
    }
  });
}

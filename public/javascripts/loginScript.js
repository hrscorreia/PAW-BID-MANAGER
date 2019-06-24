function login() {
  var formData = JSON.stringify({ email: $('#email').val(), password: $('#password').val() });
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (email === "") {
    alert("Tem de introduzir um email!");
  } else if (password === "") {
    alert("Tem de introduzir a sua password!");
  } else if (email === "" && password === "") {
    alert("Tem de introduzir as suas credenciais de acesso!");
  } else {

    $.ajax({
      type: 'POST',
      url: '/login',
      data: formData,
      success: function () {      },
      dataType: 'json',
      contentType: 'application/json'
    });
  }
}

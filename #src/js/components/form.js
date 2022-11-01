$("form button").click(function () {
  // указываем класс по которому будет идти клик
  let form = $(this).closest("form"); // заганяем ближайшую форму в переменную

  let actUrl = form.attr("action");
  $.ajax({
    url: actUrl,
    type: "post",
    dataType: "html",
    data: form.serialize(),
    success: function (data) {
      form.find("input").val("");
      form.find("textarea").val("");
      // form.css("opacity", "1"); // вернем видимость
      $(".form-text").show();
      setTimeout(function () {
        $(".form-text").hide();
      }, 6000);

      //$('#myModal').modal('show') // для бутстрапа
    },
    error: function () {
      form.find(".form-text").html("серверная ошибка");
    },
  });
});

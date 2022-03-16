$(document).ready(() => {
  $("#add").button();
  const list_el = document.querySelector("#listItems");
  const titleInput = document.querySelector("#Title");
  const TodoInput = document.querySelector("#ListTODO");

  let d = new Date();
  let currDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
  console.log(currDate);

  // custom widget
  $.widget("custom.addData", {
    _create: function () {
      this.addto();

      // Bind click events on the changer button to the randomClick method
      this._on(this.delBtn, {
        click: "deleteClick",
      });
      // Bind click events on the changer button to the editClick method
      this._on(this.editBtn, {
        click: "EditClick",
      });
    },

    addto: function () {
      //beforend
      $("#listItems").prepend(this.element[0]);

      //div
      this.div = $("<li>").appendTo(this.element);
      this.div.addClass("custom-deletebtn");
      this.lable = $(`<lable>TITLE : </lable>`).appendTo(this.div);
      this.lable = $(`<lable>${titleInput.value} </lable>`).appendTo(this.div);
      this.br = $(`<br>`).appendTo(this.div);
      this.lable = $(`<lable>TO-DO : </lable>`).appendTo(this.div);
      this.inputtodo = $(
        `<input id = 'inputtodo' value =${TodoInput.value} readonly/> </input>`
      ).appendTo(this.div);
      $(`<br>`).appendTo(this.div);
      this.lable = $(`<lable>today Date id : ${currDate} </lable>`).appendTo(
        this.div
      );
      this.br = $(`<br>`).appendTo(this.div);

      //delete btn
      this.delBtn = $("<button Id= 'delete'> delete</button>")
        .appendTo(this.div)
        .button();

      //Edit btn
      this.editBtn = $(`<button Id= 'edit'> edit</button>`)
        .appendTo(this.div)
        .button();
    },

    deleteClick: function (event) {
      // list_el.removeChild(event.target);
      list_el.querySelector(`#${this.element[0].id}`).remove();
      // console.log(this.element[0].id);
    },
    EditClick: function (event) {
      edit = this.element[0];
      if (event.target.innerText === "edit") {
        console.log(edit);
        edit.querySelector(`#inputtodo`).removeAttribute("readonly");
        edit.querySelector(`#inputtodo`).focus();
        event.target.innerText = "Save";
      } else {
        edit.querySelector(`#inputtodo`).setAttribute("readonly", "readonly");
        event.target.innerText = "edit";
      }
    },
  });

  $("#form").on("submit", (e) => {
    e.preventDefault();

    // check empty or not
    if ((titleInput.value && TodoInput.value) === "")
      return alert("please fill the title and list items");
    console.log("form click");

    let a = titleInput.value;
    console.log(a);
    $(`<div >`, {
      id: `${a}`,
    }).appendTo("#listItems");

    $(`#${a}`).addData();

    //clear input feilds
    $("#Title").val("");
    $("#ListTODO").val("");
  });
});

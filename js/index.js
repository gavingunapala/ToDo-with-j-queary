$(document).ready(() => {
  $("#add").button();

  const list_el = document.querySelector("#listItems");
  const titleInput = document.querySelector("#Title");
  const TodoInput = document.querySelector("#ListTODO");

  // careate date variable
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

    //add list
    addto: function () {
      //beforend
      $("#listItems").prepend(this.element[0]);

      //div
      this.div = $("<li>").appendTo(this.element);
      // this.div.addClass("custom-deletebtn");
      this.lable = $(`<h2>${titleInput.value} </h2>`).appendTo(this.div);
      this.lable = $(`<lable>TO-DO : </lable>`).appendTo(this.div);
      this.inputtodo = $(
        `<input id = 'inputtodo' value =${TodoInput.value} readonly/> </input>`
      ).appendTo(this.div);
      this.lable = $(`<lable>today Date id : ${currDate} </lable>`).appendTo(
        this.div
      );

      //delete btn
      this.delBtn = $("<button Id= 'delete'> delete</button>")
        .appendTo(this.div)
        .button();

      //Edit btn
      this.editBtn = $(`<button Id= 'edit'> edit</button>`)
        .appendTo(this.div)
        .button();
    },

    // delete button
    deleteClick: function (event) {
      list_el.querySelector(`#${this.element[0].id}`).remove();
    },

    //edit button
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

  // form
  $("#form").on("submit", (e) => {
    e.preventDefault();

    // check empty or not
    if ((titleInput.value && TodoInput.value) === "")
      return alert("please fill the title and list items");
    console.log("form click");

    let a = titleInput.value;
    $(`<div >`, {
      id: `${a}`,
      class: "liitem",
    }).appendTo("#listItems");

    $(`#${a}`).addData();

    //clear input feilds
    $("#Title").val("");
    $("#ListTODO").val("");
  });
});

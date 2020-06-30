

"use strict";

//to prevent redundancy
var newArr = [];
let btn1Status = true;
let btn2Status = false;

//array of all created objs
let arr = [];

const getAjax = {
  method: "get",
  datatype: "json",
};
//import json file 
$.ajax("./data/page-1.json").then((data) => {
  //creating objects 4 all json data(objs)
  data.forEach((val, idx) => {
    let animal = new Animals(val);
    // testArr.push(animal);
    animal.renderCard();
    animal.renderOptions();
  });
});

function Animals(val) {
  this.title = val.title;
  this.image_url = val.image_url;
  this.description = val.description;
  this.keyword = val.keyword;
  this.horns = val.horns;

  arr.push(this);
}
// render main content from json 
Animals.prototype.renderCard = function () {
  let templ = $('#card').html();
  let newAnimal = Mustache.render(templ, this);
  $('main').append(newAnimal);
}

//render options from json without redundancy
Animals.prototype.renderOptions = function () {
  if (!newArr.includes(this.keyword)) {
    newArr.push(this.keyword);
    $('#select1').append(`<option id = "${this.keyword}" value = "${this.keyword}" >${this.keyword}</option>`);
  }
}
//whenever second btn clicked switch status's 
$('#btn2').click(() => {
  btn1Status = false;
  btn2Status = true;

  $('main').empty();
  // render json2 => subMain page
  $('option:not(:first-child)').css("display", "none");
  $('header .fixed').css("display", "block");
  $.ajax("./data/page-2.json").then((data) => {
    data.forEach((val, idx) => {
      let animal = new Animals(val);
      // testArr.push(animal);
      animal.renderCard();
      animal.renderOptions();
    });
    // $("main  div:nth-child(2)").remove();
  });

});
//whenever main btn clicked refresh the website
$('#btn1').click(() => {
  location.reload();
});







//select options based on keyword
$('#select1').on("change", (evnt) => {
  $('main').empty();
  let md = "";
  $("#select1 option:selected").each(function () {
    md = $(this).text();
  });

  if (md === 'Filter by Keyword') {
    if (btn1Status) {
      location.reload();

    }
    else if (btn2Status) {
      $('#btn2').trigger('click');

    }
  }
  arr.forEach((item, i) => {
    let type = item.keyword;

    if (md === type) {
      let Templ = $('#card').html();
      let newobj = Mustache.render(Templ, item);

      $('main').append(newobj);
    }
  })
});

//select sort options
$('#selectSortMenu').change(() => {
  $('main').empty();

  let selected = $('#selectSortMenu option:selected').val();
  if (selected === 'sort by horns') {

    sortByHorns();
  } else if (selected === 'sort by title') {
    sortByTitle();
  }
});

//import json then sort base on horns prop
function sortByHorns(obj) {

  $.ajax("./data/page-1.json").then((data) => {

    data.sort((a, b) => {
      if (a.horns < b.horns) {
        return 1;
      } else if (a.horns > b.horns) {
        return -1;
      } else {
        return 0
      }
    })
    console.log(data);
    data.forEach((val, idx) => {
      let animal = new Animals(val);
      // testArr.push(animal);
      animal.renderCard();
      animal.renderOptions();
    }
    );
  });
};

//import json then sort base on title prop
function sortByTitle(obj) {
  $.ajax("./data/page-1.json").then((data) => {
    data.sort((a, b) => {
      if (a.title.toUpperCase() > b.title.toUpperCase()) {
        return 1;
      } else if (a.title.toUpperCase() < b.title.toUpperCase()) {
        return -1;
      } else {
        return 0
      }
    })

    console.log(data);
    data.forEach((val, idx) => {
      let animal = new Animals(val);
      // testArr.push(animal);
      animal.renderCard();
      animal.renderOptions();
    }
    );
  })
}
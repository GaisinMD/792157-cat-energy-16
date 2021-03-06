var before = document.querySelector("#before");
var after = document.querySelector("#after");
var image = document.querySelector(".cat-transformer__cat-before");
var thumb = document.querySelector(".controller-before-after__input");
var decorationMain = document.querySelector(".cat-transformer-decoration");
var decorationSecond = document.querySelector(".global-wrapper--color");

before.addEventListener("click", function (evt) {
  evt.preventDefault();
  image.style.width = "690px";
  thumb.style.left = "0px";
  if (window.innerWidth >= 768) {
    decorationSecond.classList.add("global-wrapper--color-modified-lighter");
    decorationSecond.classList.remove("global-wrapper--color-modified-darker");
  }
});

after.addEventListener("click", function (evt) {
  evt.preventDefault();
  image.style.width = 0;
  if (window.innerWidth < 768) {
    thumb.style.left = "39px";
  } else {
    decorationMain.style.width = "0";
    decorationSecond.classList.add("global-wrapper--color-modified-darker");
    decorationSecond.classList.remove("global-wrapper--color-modified-lighter");
    thumb.style.left = "398px";
  }
});

if (window.innerWidth < 768) {
  var slider = document.querySelector(".controller-before-after__input-wrapper");
  slider.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (thumb.style.left == "0px") {
      image.style.width = "0";
      thumb.style.left = "39px";
    } else {
      image.style.width = "100%";
      thumb.style.left = "0";
    }
  });
};

if (window.innerWidth >= 768) {
  var sliderElem = document.querySelector(".controller-before-after__input-wrapper");
  var thumbElem = sliderElem.children[0];

  thumbElem.onmousedown = function (e) {
    var thumbCoords = getCoords(thumbElem);
    var shiftX = e.pageX - thumbCoords.left;
    var sliderCoords = getCoords(sliderElem);

    document.onmousemove = function (e) {
      //  вычесть координату родителя, т.к. position: relative
      var newLeft = e.pageX - shiftX - sliderCoords.left;

      // курсор ушёл вне слайдера
      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      thumbElem.style.left = newLeft + "px";

      var mainWidth = 98 - newLeft / sliderElem.offsetWidth * 100;

      image.style.width = mainWidth + "%";
      decorationMain.style.width = mainWidth + "%";

      if (mainWidth > 95) {
        decorationSecond.classList.add("global-wrapper--color-modified-lighter");
        image.style.width = "100%";
        decorationMain.style.width = "100%"
      }
      else decorationSecond.classList.remove("global-wrapper--color-modified-lighter");

      if (mainWidth < 20) {
        decorationSecond.classList.add("global-wrapper--color-modified-darker");
        decorationMain.style.width = "0%";
        image.style.width = "0%";
      } else decorationSecond.classList.remove("global-wrapper--color-modified-darker");
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };

    return false; // disable selection start (cursor change)
  };

  thumbElem.ondragstart = function () {
    return false;
  };

  function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
};

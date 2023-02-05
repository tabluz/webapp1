export default {
  beforeMount: function (el) {
    el.style.overflow = "hidden";
    el.style.position = "relative";
    el.style.zIndex = 1;

    el.clickRipple = (event, el) => {
      let cssClass = "click-ripple";
      let ripple = el.querySelectorAll("." + cssClass);
      let d, x, y;

      if (ripple.length === 0) {
        let elChild = document.createElement("span");
        elChild.classList.add(cssClass);

        el.insertBefore(elChild, el.firstChild);
      } else {
        ripple[0].classList.remove("animate");
      }

      ripple = el.querySelectorAll("." + cssClass)[0];

      if (
        getComputedStyle(ripple).height === "0px" ||
        getComputedStyle(ripple).width === "0px"
      ) {
        d = Math.max(el.offsetWidth, el.offsetHeight);

        ripple.style.height = d + "px";
        ripple.style.width = d + "px";
      }

      x =
        event.pageX -
        (el.getBoundingClientRect().left + window.scrollX) -
        parseFloat(getComputedStyle(ripple).width.replace("px", "")) / 2;
      y =
        event.pageY -
        (el.getBoundingClientRect().top + window.scrollY) -
        parseFloat(getComputedStyle(ripple).height.replace("px", "")) / 2;

      ripple.style.top = y + "px";
      ripple.style.left = x + "px";
      ripple.classList.add("animate");
    };
    el.addEventListener("click", (event) => {
      el.clickRipple(event, el);
    });
  },
  unmounted: (el) => {
    el.removeEventListener("click", el.clickRipple);
  },
};

const menu = document.getElementById("dropdownmenu");
const btn = document.getElementById("toggleButton");

btn.addEventListener("mouseover", function() {
  menu.style.display = "block";
});

btn.addEventListener("mouseout", function() {
  menu.style.display = "none";
});

menu.addEventListener("mouseover", function() {
  menu.style.display = "block";
});

menu.addEventListener("mouseout", function() {
  menu.style.display = "none";
});

window.onload = function() {

    menu.style = btn.style;
    menu.style.display = "none";
    menu.style.width = 200 + 'px';
    menu.style.position = "absolute";
    menu.style.top = btn.style.bottom;
    if (window.innerWidth >= 200)
      menu.style.left = (window.innerWidth - 200) + 'px';
    else
    {
      menu.style.left = 0 + 'px';
      menu.style.width = window.innerWidth;
    }
}

window.addEventListener('resize', function() {
    menu.style.top = btn.style.bottom;
    if (window.innerWidth >= 200)
      menu.style.left = (window.innerWidth - 200) + 'px';
    else
    {
      menu.style.left = 0 + 'px';
      menu.style.width = window.innerWidth;
    }
});


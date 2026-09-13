let moving = false;

async function assembly() {
  let frame = null;
  const res = await fetch("indexes.json")
  const data = await res.json();
  data.forEach(item => {
    try {
      const { name, description, path } = item;
      const block = document.createElement("div");
      block.classList.add("toolBlock")
      const nameElem = document.createElement("span");
      nameElem.classList.add("nameElem");
      nameElem.innerText = name;
      const descElem = document.createElement("span")
      descElem.classList.add("descElem");
      descElem.innerText = description;
      block.appendChild(nameElem);
      block.appendChild(descElem);
      document.getElementById("tools").appendChild(block);
      block.href = path;
      block.addEventListener('click', ev => {
        if (moving) {
          return;
        }
        moving = true;
        //history.pushState(null, null, path);
        document.getElementById("select").animate(
          [
            { opacity: 1, transform: "translateX(0px)" },
            { opacity: 0, transform: "translateX(-200px)" }
          ],
          {
            duration: 500,
            easing: "ease-in",
            fill: "forwards"
          }
        )
        frame = document.createElement('iframe');
        frame.src = (location.pathname + path).replaceAll("//", "/");
        setTimeout(() => {
          document.getElementById("select").style.display = "none";
          document.getElementById("iframe-header").style.display = "block";
          document.getElementById("iframe-container").style.display = "flex";
          document.getElementById("iframe-container").appendChild(frame);
          setTimeout(() => {
          document.getElementById("iframe-container").style.opacity = "1";
          }, 100);
          moving = false;
        }, 500)
      })
    } catch (e) {
      console.log("組み立て中にエラーが発生しました: " + e.message)
    }
  });
  document.getElementById("back-button").addEventListener('click', ev => {
    if (moving) {
      return;
    }
    moving = true;
    document.getElementById("iframe-container").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("iframe-container").style.display = "none";
      document.getElementById("iframe-header").style.display = "none";
      document.getElementById("select").style.display = "block";
      document.getElementById("select").animate(
        [
          { opacity: 0, transform: "translateX(-200px)" },
          { opacity: 1, transform: "translateX(0px)" }
        ],
        {
          duration: 500,
          easing: "ease-out",
          fill: "forwards"
        }
      )
      if (frame) {
        frame.remove();
      }
      moving = false;
    }, 500)
  })
}
assembly();
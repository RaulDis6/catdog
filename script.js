function loadImages(api) {
    fetch(`https://api.the${api}api.com/v1/images/search?format=json&order=RANDOM&page=0&limit=5`)
      .then(response => response.json())
      .then(data => {
        data.forEach(imageData => displayImage(imageData.url));
      });
  }
  
  function displayImage(url) {
    const imgcont = document.createElement("div");
    imgcont.classList.add("image-cont");
  
    const img = document.createElement("img");
    img.src = url;
    img.width = 200;
    img.alt = "Random Image";
  
    const likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.textContent = "Like";
    likeBtn.onclick = () => addTofav(url);
  
    imgcont.appendChild(img);
    imgcont.appendChild(likeBtn);
    document.getElementById("img-cont").appendChild(imgcont);
  }
  
  function addTofav(url) {
    let fav = JSON.parse(localStorage.getItem("fav")) || [];
    if (!fav.includes(url)) {
      fav.push(url);
      localStorage.setItem("fav", JSON.stringify(fav));
    }
  }
  
  function loadfav() {
    const favcont = document.getElementById("fav-cont");
    favcont.innerHTML = "";
    const fav = JSON.parse(localStorage.getItem("fav")) || [];
    fav.forEach(url => {
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("image-cont");
  
      const img = document.createElement("img");
      img.src = url;
      img.width = 150;
      img.alt = "Fav img";
  
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("Del-btn");
      deleteBtn.textContent = "Eliminar";
      deleteBtn.onclick = () => removeFavorite(url, imgDiv); 
  
      imgDiv.appendChild(img);
      imgDiv.appendChild(deleteBtn);
      favcont.appendChild(imgDiv);
    });
  }
  
  function removeFavorite(url, imgDiv) {
    imgDiv.classList.add("fade-out"); 
  
    
    setTimeout(() => {
      imgDiv.remove();
      let fav = JSON.parse(localStorage.getItem("fav")) || [];
      fav = fav.filter(favUrl => favUrl !== url);
      localStorage.setItem("fav", JSON.stringify(fav));
    }, 500); 
  }
  
  function showSeccion(SeccionId) {
    document.querySelectorAll(".Seccion").forEach(Seccion => Seccion.classList.add("hidden"));
    document.getElementById(SeccionId).classList.remove("hidden");
  
    if (SeccionId === "fav-Seccion") {
      loadfav();
    }
  }
  
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      const apiType = Math.random() > 0.5 ? "dog" : "cat";
      loadImages(apiType);
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    loadImages("dog");
    document.getElementById("btnParaTi").onclick = () => showSeccion("para-ti-Seccion");
    document.getElementById("btnFavoritos").onclick = () => showSeccion("fav-Seccion");
  });
  
  
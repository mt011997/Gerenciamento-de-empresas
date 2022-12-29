document.querySelector("html").className = localStorage.dark

class togleDarkMode{

  static togle() {

    const darkToggle = document.querySelector(".dark__togle")
    const html = document.querySelector("html")
    
    darkToggle.addEventListener("click", () => {

      html.classList.toggle("dark-mode")

      const tagHtml = document.querySelector("html").className

      localStorage.setItem("dark", tagHtml)
      document.querySelector("html").className = localStorage.dark

    })
  }

}

togleDarkMode.togle()


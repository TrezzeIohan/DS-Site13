/* Animações dos Botões*/
const alertButtons = document.getElementsByClassName("mrkt-btn");



function tremerBotoes(){

  for (let button of alertButtons){
    button.animate(
      [
        { transform: "rotate(1deg)" },
        { transform: "rotate(2deg)" },
        { transform: "rotate(3deg)"},
        { transform: "rotate(4deg)"},
        { transform: "rotate(5deg)" },
        { transform: "rotate(4deg)" },
        { transform: "rotate(3deg)"},
        { transform: "rotate(2deg)"},
        { transform: "rotate(1deg)"},

        { transform: "rotate(-1deg)" },
        { transform: "rotate(-2deg)" },
        { transform: "rotate(-3deg)"},
        { transform: "rotate(-4deg)"},
        { transform: "rotate(-5deg)" },
        { transform: "rotate(-4deg)" },
        { transform: "rotate(-3deg)"},
        { transform: "rotate(-2deg)"},
        { transform: "rotate(-1deg)"},

      ],
      {
        // timing options
        duration: 300,
        iterations: 3,
      }
    );
  }

}

setInterval(tremerBotoes, 3000);
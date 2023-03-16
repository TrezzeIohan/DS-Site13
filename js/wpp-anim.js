const wppSticker = document.getElementById("whatsapp-sticker");



function crescerWpp(){

  
    wppSticker.animate(
      [
        { transform: "scale(1.2)" },
    
      ],
      {
        // timing options
        duration: 3000,
        iterations: 3,
      }
    );
  

}

setInterval(crescerWpp, 3000);
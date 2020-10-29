const base = {
    easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    colorWhite: "rgb(255, 255, 255)",
    colorBlack: "rgb(0, 0, 0)"
  };
  
  const dark = {
    id: "dark",
    ...base,
    backgroundColor: "white",
    textColor: 'black',
    navColor: "indianred"
  };
  
  const light = {
    id: "light",
    ...base,
    backgroundColor: "#3498db",
    textColor: 'magenta',
    navColor: "springgreen"
  };
  
  export const theme = { dark, light };
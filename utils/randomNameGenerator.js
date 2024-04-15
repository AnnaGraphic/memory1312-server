const colorsArray = [
  { "red": "FF0000" },
  { "green": "00FF00" },
  { "blue": "0000FF" },
  { "yellow": "FFFF00" },
  { "cyan": "00FFFF" },
  { "magenta": "FF00FF" },
  { "orange": "FFA500" },
  { "purple": "800080" },
  { "pink": "FFC0CB" },
  { "brown": "A52A2A" },
  { "teal": "008080" },
  { "olive": "808000" },
  { "navy": "000080" },
  { "maroon": "800000" },
  { "aquamarine": "7FFFD4" },
  { "gold": "FFD700" },
  { "lavender": "E6E6FA" },
  { "silver": "C0C0C0" },
  { "skyblue": "87CEEB" },
  { "coral": "FF7F50" }
];
  
export const randomName = () => {
  const randomColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];
  return randomColor;
}
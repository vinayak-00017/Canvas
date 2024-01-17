import rough from 'roughjs/bundled/rough.esm'


const generator = rough.generator()

export const createElement = (x1,y1,x2,y2,type) =>{

    const angle = Math.atan2(y2 - y1, x2 - x1);
  
    // Length of the arrowhead lines
    const arrowLength = 10;
  
    // Coordinates of the arrowhead lines
    const arrowX1 = x2 - arrowLength * Math.cos(angle - Math.PI / 6);
    const arrowY1 = y2 - arrowLength * Math.sin(angle - Math.PI / 6);
    const arrowX2 = x2 - arrowLength * Math.cos(angle + Math.PI / 6);
    const arrowY2 = y2 - arrowLength * Math.sin(angle + Math.PI / 6);
  


  const roughElement = 
  type === "line"
  ? [
        generator.line(x1,y1,x2,y2),
        generator.line(x2, y2, arrowX1, arrowY1),
        generator.line(x2, y2, arrowX2, arrowY2)
        ]
  : type === "rectangle" 
  ? generator.rectangle(x1,y1,x2-x1,y2-y1)
  : generator.circle(x1,y1,Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)))
  return {x1,y1,x2,y2,roughElement}
}
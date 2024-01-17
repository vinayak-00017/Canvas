export const createElement = (x1, y1, x2, y2, type) => {
    const line = generator.line(x1, y1, x2, y2);
  
    // Calculate the angle of the line
    const angle = Math.atan2(y2 - y1, x2 - x1);
  
    // Length of the arrowhead lines
    const arrowLength = 10;
  
    // Coordinates of the arrowhead lines
    const arrowX1 = x2 - arrowLength * Math.cos(angle - Math.PI / 6);
    const arrowY1 = y2 - arrowLength * Math.sin(angle - Math.PI / 6);
    const arrowX2 = x2 - arrowLength * Math.cos(angle + Math.PI / 6);
    const arrowY2 = y2 - arrowLength * Math.sin(angle + Math.PI / 6);
  
    const arrowElement =
      type === "lineWithArrow"
        ? [
            line,
            // Arrowhead lines
            generator.line(x2, y2, arrowX1, arrowY1),
            generator.line(x2, y2, arrowX2, arrowY2),
          ]
        : null; // Handle unknown type or return a default value
  
    return { x1, y1, x2, y2, roughElement: arrowElement };
  };
  
  // Example usage for creating a line with an arrow
  const lineWithArrowElement = createElement(10, 20, 100, 50, "lineWithArrow");
  console.log(lineWithArrowElement);
  
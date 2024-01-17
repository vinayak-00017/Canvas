import {  useLayoutEffect,useEffect, useState } from 'react'
import rough from 'roughjs/bundled/rough.esm'
// import { createElement } from './Generate'


const generator = rough.generator()

const createElement = (x1,y1,x2,y2,type) =>{

  const roughElement = 
  type === "line"
  ? generator.line(x1,y1,x2,y2)      
  : type === "rectangle" 
  ? generator.rectangle(x1,y1,x2-x1,y2-y1)
  : generator.circle(x1,y1,Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)))
  return {x1,y1,x2,y2,roughElement}

}

function App() {

  const[elements,setElements] = useState([])
  const [drawing,setDrawing] = useState(false)
  const [tool,setTool] = useState('line')

  useLayoutEffect(()=>{
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    context.clearRect(0,0,canvas.width,canvas.height)

    const roughCanvas = rough.canvas(canvas)

    elements.forEach(({roughElement}) => roughCanvas.draw(roughElement))
  },[elements])

  const handleMouseDown = (event)=>{
    if(tool == 'selection'){
       
    }
    setDrawing(true)
    const {clientX,clientY} = event;
    const element = createElement(clientX,clientY,clientX,clientY,elementType)
    setElements(prevState => [...prevState,element])
  }

  const handleMouseMove = (event) => {
    if(!drawing) return;
    
    const {clientX,clientY} = event;
    const index = elements.length -1 
    const {x1,y1} = elements[index]
    const updatedElement = createElement(x1,y1,clientX,clientY,elementType)
    
    const elmentsCopy = [...elements]
    elmentsCopy[index] = updatedElement
    setElements(elmentsCopy)
  }

  const handleMouseUp = () => {
    setDrawing(false)
  }

  return <div>
            <div>
              <input 
              type='radio'
              id='selection'
              checked = {tool === 'selection'}
              onChange={()=>setTool("selection")}
              />
              <label htmlFor='selection'>Selection</label>
              <input 
              type='radio'
              id='line'
              checked = {tool === 'line'}
              onChange={()=>setTool("line")}
              />
              <label htmlFor='line'>Line</label>
              <input 
              type='radio'
              id='rectangle'
              checked = {tool === 'rectangle'}
              onChange={()=>setTool("rectangle")}
              />
              <label htmlFor='rectangle'>rectangle</label>
              <input 
              type='radio'
              id='circle'
              checked = {tool === 'circle'}
              onChange={()=>setTool("circle")}
              />
              <label htmlFor='circle'>circle</label>
            </div>
            <canvas id="canvas" 
                    width={window.innerWidth}
                    height={window.innerHeight}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
        
            >Canvas</canvas>
    </div>
}

export default App

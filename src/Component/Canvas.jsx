import React, { useEffect, useRef, useState } from 'react'
import styles from "../CSS/Canvas.module.css"
import { SketchPicker } from 'react-color'

const Canvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const digitRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currColor , setColor] = useState("white")
    const[digit , setDigit] = useState()


    const backColor={
        backgroundColor:currColor
    }


    const handleChange =(color)=>{
        setColor(color.hex)
        // console.log(color)
    }


    useEffect(() => {
       
         const canvas = canvasRef.current;
        canvas.width = 500;
        canvas.height = 500;
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
        handleGen()
    }, []);


    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        setIsDrawing(true);
        nativeEvent.preventDefault();
    };

    const draw = ({nativeEvent}) => {
        if(!isDrawing) {
            return;
        }  
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        nativeEvent.preventDefault();
    };

    const stopDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };



    const setToDraw = () => {
        contextRef.current.globalCompositeOperation = 'source-over';
    };

    const setToErase = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.lineWidth = 15;
        contextRef.current.globalCompositeOperation = 'destination-out';
    };


    


    const handleGen=()=>{
      let val =  Math.floor(Math.random() * 90+10)

      setDigit(val)
    }
  

  return (

    
    <div className={styles.MainBox}>




        <div className={styles.LeftBox}>
            <SketchPicker color={currColor} onChangeComplete={handleChange}/>
            <button onClick={setToDraw} className={styles.drawBtn}>  Draw  </button>
            <br/>
            <button onClick={setToErase} className={styles.eraseBtn}> Erase </button>
            <br/>
            <button onClick={handleGen} className={styles.genBtn}>GENERATE</button>
      </div>



        <div className={styles.RightBox}>
        <div className={styles.LeftBox2}>
            <SketchPicker color={currColor} onChangeComplete={handleChange}/>
            <button onClick={setToDraw} className={styles.drawBtn}>  Draw  </button>
            <br/>
            <button onClick={setToErase} className={styles.eraseBtn}> Erase </button>
            <br/>
            <button onClick={handleGen} className={styles.genBtn}>GENERATE</button>
      </div>

      
        <p style={{fontSize:"45px" , marginBottom:"-10px"}}>{digit}</p>
    <canvas style={backColor}
     className={styles.CanvasBox} ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}>

    </canvas>

     </div>

    

    </div>
  )
}

export default Canvas
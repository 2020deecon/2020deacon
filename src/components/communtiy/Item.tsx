import React,{useState,useEffect} from "react";
import { motion } from "framer-motion";
// import { LoremIpsum } from "react-lorem-ipsum";
import {useHistory} from "react-router-dom";

interface ItemProps{
  id:string;
  title:string;
  image:string;
  text:string;
  comment:any[];
  type:string;
  write_id:string;
}
export function Item({id,title,image,text,comment,type,write_id}:ItemProps) {
  const history = useHistory();
  console.log(title,image);
    
// alert(contents);
  // const { category, title } = items.find(item => item.id === id.id);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{ pointerEvents: "auto" }}
        className="overlay" 
        onClick={()=>history.replace("/community")}
      >
      </motion.div>
      <div className="fakdsfnlsdinfladifds"> 
      <div className="card-content-container open"
      onClick={(e) =>{alert("test")}}
      // onClick={(e) => e.stopPropagation()}
      >
        <motion.div className="card-content" layoutId={`card-container-${id}`}
        >
          <motion.div
            className="card-image-container"
            layoutId={`card-image-container-${id}`}
          >
            <img className="card-image" src={image} alt="" />
          </motion.div>
          <motion.div
            className="title-container"
            layoutId={`title-container-${id}`}
            
          >
            <span className="category">{text}</span>
            <h2>{title}</h2>
          </motion.div>
          <motion.div className="content-container" animate 
          />
        </motion.div>
      </div>
      </div>
    </>
  );

}

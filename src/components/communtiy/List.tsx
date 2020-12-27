import React, { useState, useEffect } from "react";
import { items } from "./data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Image from "../../lib/images";
import Get from "../../lib/api/get";
interface CardProps{
  id: string;
  title: string;
  category: string;
  theme?:any;
  img:string;
  Written: string;
  isSelected:boolean;
}
function Card({ id, title, category, theme,img,Written,isSelected }:CardProps) {
  // alert(img);
  return (
    <li className={`card ${theme}`}>
      <div className="card-content-container"
      >
        <motion.div className="card-content" layoutId={`card-container-${id}`}>
          <motion.div
            className="card-image-container"
            layoutId={`card-image-container-${id}`}
            style={{display: "flex",
            flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              objectFit: "cover",
            }}
          >
            <img className="card-image" src={img} alt="" />
            <h3>{category}</h3>
          </motion.div>
          <motion.div
            className="title-container"
            layoutId={`title-container-${id}`}
          >
            <span className="category">{Written}</span>
            <h2>{title}</h2>
          </motion.div>
        </motion.div>
      </div>
      <Link to={"/community/"+id} className={`card-open-link`} />
    </li>
  );
}
interface ListProps{
  selectedId: string;
  selectedtext: string;
}
export function List({selectedId,selectedtext}:ListProps) {
  // alert(selectedtext);
  const [Items, setItems] = useState([]);
  useEffect(()=>{
    Get().Getallcommunity().then(res => {
      console.log(res);
      setItems(res);
    }).catch(err => console.log(err));
  },[])
  
  // console.log(selectedtext);
  // alert("");
  return (
    <ul className="card-list">
      {Items.map((card:any) =>( card.title.includes(selectedtext) ? 
        <Card key={card.id} id={card.id} title={card.title} category={card.text} isSelected={card.id===selectedId} img={card.image} Written={card.type}/>
        : ""
      )
      )}
      {/* {items.map(card => (
        <Card key={card.id} {...card} isSelected={card.id === selectedId} img={Image.login}/>
      ))} */}
    </ul>
  );
}

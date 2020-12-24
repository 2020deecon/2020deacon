import React, { useState, useEffect } from "react";
import { items } from "./data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Image from "../../lib/images";
import Get from "../../lib/api/get";
function Card({ id, title, category, theme,img,Written }) {
  return (
    <li className={`card ${theme}`}>
      <div className="card-content-container">
        <motion.div className="card-content" layoutId={`card-container-${id}`}>
          <motion.div
            className="card-image-container"
            layoutId={`card-image-container-${id}`}
          >
            <img className="card-image" src={img} alt="" />
          </motion.div>
          <motion.div
            className="title-container"
            layoutId={`title-container-${id}`}
          >
            <span className="category">{category}</span>
            <h2>{title}</h2>
          </motion.div>
        </motion.div>
      </div>
      <Link to={"/community/"+id} className={`card-open-link`} />
    </li>
  );
}

export function List(selectedId,selectedtext) {
  // alert("test")
  const [Items, setItems] = useState([]);
  Get().Getallcommunity().then(res => {
    console.log(res);
    setItems(res);
  }).catch(err => console.log(err));

  return (
    <ul className="card-list">
      {Items.map(card =>(
        <Card key={card.id} title={card.title} category={card.text} isSelected={card.id===selectedId} img={card.img} Written={card.type}/>
      ))}
      {/* {items.map(card => (
        <Card key={card.id} {...card} isSelected={card.id === selectedId} img={Image.login}/>
      ))} */}
    </ul>
  );
}

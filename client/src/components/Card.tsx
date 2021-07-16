import React from "react";
import '../styles/Card.css';

interface CardProp {
    icon: string;
    altText: string;
    description: string;
}

const Card = (props: CardProp) => {
  return (
      <div className="m-5" id="Card">
          <div className="flex justify-center align-middle p-10 bg-white rounded">
            <img src={props.icon} alt={props.altText} style={{height: 90, width: 90}}/>
          </div>
          <div className="description">
            <div>
              <p className="text-black w-32 md:w-48 lg:w-98">{props.description}</p>
            </div>
          </div>
      </div>
  );
}

export default Card;
import React from "react";
import '../styles/Card.css';

interface CardProp {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    altText: string;
    description: string;
}

const Card = (props: CardProp) => {
  return (
      <div id="Card">
          <div className="align-middle p-10 bg-blue-900 rounded">
            <props.icon style={{height: 100, width: 100}}/>
          </div>
          <div className="description">
            <div>
              <p className="text-black w-10 md:w-48 lg:w-98">{props.description}</p>
            </div>
          </div>
      </div>
  );
}

export default Card;
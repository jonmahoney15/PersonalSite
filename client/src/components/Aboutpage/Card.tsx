import '../../styles/Card.css';

interface CardProp {
    icon: string;
    altText: string;
    description: string;
}

const Card = (props: CardProp) => {
  return (
      <div className="m-5" id="Card">
          <div className="flex justify-center p-10 align-middle bg-white image">
            <img src={props.icon} alt={props.altText} style={{height: 90, width: 90}}/>
          </div>
          <div className="description">
            <div>
              <p className="text-black w-92 md:w-52">{props.description}</p>
            </div>
          </div>
      </div>
  );
}

export default Card;

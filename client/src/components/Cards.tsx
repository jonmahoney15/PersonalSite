import React,{useState,useEffect} from 'react';
import Card from './Card';

interface ICard {
    Id: number;
    Name: string;
    Description: string;
    Path: string;
}

const Cards = () => {

    const [cardData, setCard] = useState([]);
 
    const getCardData = () => {
        fetch('data.json' ,{
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
           console.log(myJson);
           setCard(myJson);
        });
    }
    
    useEffect(()=>{ 
        getCardData()
    },[]);

    return (
        <div className="flex flex-col md:flex-row items-center justify-evenly">
            {
                cardData && cardData.length > 0 && 
                cardData.map((card: ICard) => <Card icon={card.Path} altText={card.Name} description={card.Description} />)
            }
        </div>
    )
}

export default Cards;
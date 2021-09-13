import {useState,useEffect} from 'react';
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
           setCard(myJson);
        });
    }
    
    useEffect(()=>{ 
        getCardData()
    },[]);

    return (
        <div className="flex flex-col items-center md:overflow-hidden md:flex-row justify-evenly">
            {
                cardData && cardData.length > 0 && 
                cardData.map((card: ICard, key: number) => <Card key={key} icon={card.Path} altText={card.Name} description={card.Description} />)
            }
        </div>
    )
}

export default Cards;

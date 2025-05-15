import React, { useEffect, useState } from "react";
import { useToggle } from "../../hooks/toggle/useToggle";
import CardList from "./CardList";
import useStore from "../../../store/zustand/store";

function CardListView({ cards =[] ,onCardSelect, errorPage }: any) {

  const toggle = useToggle();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const setSelectedItem = useStore((state) => state.setSelectedItem);
  useEffect(() => {
    if (selectedId) {
      const selectedCard = cards.find((card: any) => card.id === selectedId);
      if (selectedCard) {
      
      }
    }
  }, [cards, selectedId]);

  const handleCardSelect = (id: string) => {

    setSelectedId(id);
    toggle();

    const selectedCard = cards.find((card: any) => card.id === id);
    if (selectedCard) {
       
      setSelectedItem(selectedCard);
    }
  };

    if (!cards || cards.length === 0) {
    return (
      <div className="flex flex-col gap-[25px] w-full pb-[40px] mt-[25px]">
        {errorPage}
      </div>
    ); 
  }
  return (
    <div className="flex flex-col gap-[25px] w-full pb-[40px] mt-[25px]">
      {cards.map((card: any) => (
        <CardList
          latitude={card.latitude}
          longitude={card.longitude}
          key={card.id}
          id={card.id}
          title={card.title}
          redTitle={card.redTitle}
          firstHead={card.firstHead}
          firstHeadValue={card.firstHeadValue}
          secondHead={card.secondHead}
          secondHeadValue={card.secondHeadValue}
          thirdHead={card.thirdHead}
          thirdHeadValue={card.thirdHeadValue}
          tags={card.tags}
          isSelected={selectedId === card.id}
          onSelect={handleCardSelect}
          fourthHead={card?.fourthHead}
          fourthHeadValue={card?.fourthHeadValue}
          sixthHead={card?.sixthHead}
        />
      ))}
    </div>
  );
}

export default CardListView;

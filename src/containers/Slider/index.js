import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    setTimeout(
      // length = 3 alors que max index = 2
      () => {
        if (data) {
        setIndex(index < byDateDesc.length - 1 ? index + 1 : 0)}
      },
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  if (!data) {
    return <div>Loading ...</div>
  }
  console.log(byDateDesc);
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${event.id} - ${idx}`}
            data-test={`${event.id} - ${idx}`}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((eventDate, radioIdx) => (
                <input
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${event.id} - ${idx} - ${radioIdx}`}
                  data-test={`${event.id} - ${idx} - ${radioIdx}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
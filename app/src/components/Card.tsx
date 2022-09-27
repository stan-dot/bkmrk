import { CardData } from "../types/CardProps";
export function Card(props: CardData): JSX.Element {
  return (
    <div className="card">
      <img src={props.image} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.text}</p>
      </div>
    </div>
  );
};

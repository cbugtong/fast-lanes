import './styles.css';
import { Props } from './types';


const Card = ({ title, onDragStart }: Props) => {
  return (
    <div className="card" draggable onDragStart={() => { onDragStart(title);  }}>
        <p>{title}</p>
    </div>
  );
}

export default Card;

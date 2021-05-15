import { useState } from 'react';
import './styles.css';
import { Props } from './types';
import Card from '../Card';

const Lane = ({ id, title, data, onDragStart, onAdd }: Props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState('');
  return (
    <div className="container">
      <p>{title}</p>
      <div id={id} className="list">
        {data.map((item: { name: string }, i: number) => (
          <Card key={i} title={item.name} onDragStart={onDragStart(id, i - 1)} />
        ))}
        {isAdding && (
          <form className="form" onSubmit={(e: any) => {
            e.preventDefault();
            onAdd(id, value);
            setIsAdding(false);
            }}>
            <textarea
              rows={4}
              placeholder="Enter a title for this card..."
              onChange={(e: any) => { setValue(e.target.value) }}
              required
            />
            <div className="add-actions">
              <input
                type="submit"
                value="Add Card"
              />
              <p
                onClick={() => { setIsAdding(false); }}
              >
                X
              </p>
            </div>
          </form>
        )}
      </div>
      <p className="add-button" onClick={() => { setIsAdding(true) }}>+ Add another card</p>
    </div>
  );
}

export default Lane;

import React, { FC } from 'react';
import Card from 'react-bootstrap/Card';
import { CardProductProps } from '../Types/CardProductProps';
import { Button } from 'react-bootstrap';
import { DEFAULT_IMAGE, NOT_IMAGE } from '../Utils/Constants';
import { PencilSquare, Trash } from 'react-bootstrap-icons';


const CardProduct: FC<CardProductProps> = ({ id, title = "Card Title", imageUrl = DEFAULT_IMAGE, price = "", description, onEdit, onDelete, viewMode }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = NOT_IMAGE; // URL de imagen de respaldo
  };

  return (

    <Card key={id} className={`card-app mb-4 ${viewMode === "list" ? "list-mode" : "grid-mode"}`}>
      <div className="card-box-img">
        <Card.Img variant="top" src={imageUrl} alt={title} className='img-fluid' onError={handleImageError} />
      </div>

      <Card.Body>
        <Card.Title>{title.slice(0, 20) + '...'}</Card.Title>
        <Card.Text>
          {description.slice(0, 50) + '...'}
        </Card.Text>
        <Card.Text>
          <strong>${price}</strong>
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="primary" onClick={() => onEdit(id)}><PencilSquare /></Button>
          <Button variant="danger" onClick={() => onDelete(id)}> <Trash /></Button>
        </div>
      </Card.Body>
    </Card>

  )
};

export default CardProduct;

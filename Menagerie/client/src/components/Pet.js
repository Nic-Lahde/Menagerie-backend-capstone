import React from "react";
import { Card, CardBody, CardTitle, Col } from "reactstrap";

export const Pet = ({ pet, setSelectedPet }) => {


    const handleCardClick = () => {
        setSelectedPet(pet);
    };

    return (
        <Col md="5">
            <Card style={{ width: '40rem' }} onClick={handleCardClick} className="cursor-pointer">
                <CardBody>
                    <CardTitle tag="h5">
                        {pet.name}
                    </CardTitle>
                    <img src={pet.imageUrl} alt="image of pet" className="img-thumbnail" style={{ width: "400px", height: "300px" }} />
                    <p>{pet.speciesCommon}</p>
                    <p>{pet.speciesLatin}</p>
                </CardBody>
            </Card>
        </Col>
    );
};
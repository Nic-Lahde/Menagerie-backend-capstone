import { useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
export const Pet = ({ pet }) => {

    return (
        <Card style={{
            width: '40rem'
        }}>
            <CardBody>
                <CardTitle tag="h5">
                    {pet.name}
                </CardTitle>
                <img src={pet.imageUrl} alt="image of pet" className="img-thumbnail" />
                <p>{pet.speciesCommon}</p>
                <p>{pet.speciesLatin}</p>
            </CardBody>
        </Card>
    )
}
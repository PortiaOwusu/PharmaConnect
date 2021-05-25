import React, { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DescriptionIcon from "@material-ui/icons/Description";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ImageIcon from "@material-ui/icons/Image";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "./Medicine.css";
import InputMed from "./Medicine/InputMed";
import { multipleFilesUpload } from "../helpers/helpers";
const { usePharmacyState } = require("../state/store");

export const Medicine = () => {
  const initValue = {
    title: "",
    genericName: "",
    description: "",
    price: "",
    manufactureDate: "",
    expiryDate: "",
    quantity: "",
    prescription: "",
    image: "",
  };

  const [medicine, setMedicine] = useState(initValue);
  const token = usePharmacyState((state) => state.token);

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setMedicine({ ...medicine, [e.target.name]: reader.result });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(medicine);

    const formData = new FormData();
    formData.append("title", medicine.title);
    formData.append("genericName", medicine.genericName);
    formData.append("description", medicine.description);
    formData.append("price", medicine.price);
    formData.append("manufactureDate", medicine.manufactureDate);
    formData.append("expiryDate", medicine.expiryDate);
    formData.append("quantity", medicine.quantity);
    formData.append("prescription", medicine.prescription);

    formData.append("image", medicine.image);
    await multipleFilesUpload(formData, token);

    alert("Added Successfully");
    setMedicine(initValue);
  };

  return (
    <div className="pharmacycontent  medicine">
      <h2>ADD A PRODUCT</h2>
      <form onSubmit={handleSubmit}>
        <InputMed
          type="text"
          placeholder="Brand Name"
          name="title"
          value={medicine.title}
          onChange={handleChange}
        >
          <AddCircleIcon />
        </InputMed>

        <InputMed
          type="text"
          placeholder="Generic Name"
          name="genericName"
          value={medicine.genericName}
          onChange={handleChange}
        >
          <AddCircleIcon />
        </InputMed>

        <InputMed
          type="text"
          placeholder="Description"
          name="description"
          value={medicine.description}
          onChange={handleChange}
        >
          <DescriptionIcon />
        </InputMed>

        <InputMed
          type="text"
          placeholder="Price"
          name="price"
          value={medicine.price}
          onChange={handleChange}
        >
          <LocalOfferIcon />
        </InputMed>

        <InputMed
          type="date"
          placeholder="Manufacture Date"
          name="manufactureDate"
          value={medicine.manufactureDate}
          onChange={handleChange}
        >
          <EventAvailableIcon />
        </InputMed>

        <InputMed
          type="date"
          placeholder="Expiry Date"
          name="expiryDate"
          value={medicine.expiryDate}
          onChange={handleChange}
        >
          <EventBusyIcon />
        </InputMed>

        <InputMed
          type="Number"
          placeholder="Quantity"
          name="quantity"
          value={medicine.quantity}
          onChange={handleChange}
        >
          <AddShoppingCartIcon />
        </InputMed>

        <div className="prescription">
          <InputMed
            type="radio"
            placeholder="Prescription Base"
            name="prescription"
            value={true}
            onChange={handleChange}
            radio="radioinput"
          >
            <p>Prescription</p>
            <VerifiedUserIcon />
          </InputMed>
          <InputMed
            type="radio"
            name="prescription"
            value={false}
            onChange={handleChange}
            radio="radioinput"
          >
            <p>No Prescription</p>
            <VerifiedUserIcon />
          </InputMed>
        </div>

        <InputMed
          type="file"
          placeholder="Image"
          name="image"
          onChange={handleFileInput}
        >
          <ImageIcon />
        </InputMed>

        <InputMed type="submit" value="ADD" onClick=""></InputMed>
      </form>
    </div>
  );
};

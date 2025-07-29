import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Checkbox,
  Paper,
  Button,
  InputAdornment,
} from "@mui/material";
import { CreditCard as CreditCardIcon, Lock as LockIcon } from "@mui/icons-material";

const PaymentSection = ({ onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    saveCard: false,
  });
  const [errors, setErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;
    let fieldError = "";

    if (name === "cardNumber") {
      if (/\D/.test(value.replace(/\s/g, ""))) {
        fieldError = "Only numbers are allowed in card number.";
      }
      val = value.replace(/\D/g, "").slice(0, 16);
      val = val.replace(/(.{4})/g, "$1 ").trim();
    }

    if (name === "expiry") {
      val = val.replace(/\D/g, "").slice(0, 4);
      if (val.length >= 3) {
        val = `${val.slice(0, 2)}/${val.slice(2)}`;
      }
    }

    if (name === "cvv") {
      if (/\D/.test(value)) {
        fieldError = "Only numbers are allowed in CVV.";
      }
      val = val.replace(/\D/g, "").slice(0, 3);
    }

    setPaymentDetails((prev) => ({ ...prev, [name]: val }));
    setErrors((prevErrors) => {
      const updated = { ...prevErrors };
      if (fieldError) {
        updated[name] = fieldError;
      } else {
        delete updated[name];
      }
      return updated;
    });
  };

  const validate = () => {
    const newErrors = {};
    const { cardHolderName, cardNumber, expiry, cvv } = paymentDetails;

    if (!cardHolderName.trim()) {
      newErrors.cardHolderName = "Card Holder name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(cardHolderName)) {
      newErrors.cardHolderName = "Name must contain only letters.";
    }

    const cleanedCardNumber = cardNumber.replace(/\s+/g, "");
    if (!cleanedCardNumber) {
      newErrors.cardNumber = "Card number is required.";
    } else if (cleanedCardNumber.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    if (!expiry) {
      newErrors.expiry = "Expiration date is required.";
    } else {
      const [monthStr, yearStr] = expiry.split("/");
      const month = parseInt(monthStr, 10);
      const year = parseInt(`20${yearStr}`, 10);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      if (
        !/^\d{2}\/\d{2}$/.test(expiry) ||
        month < 1 ||
        month > 12 ||
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        newErrors.expiry = "Enter a valid future date in MM/YY format.";
      }
    }

    if (!cvv) {
      newErrors.cvv = "CVV is required.";
    } else if (cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setPaymentSuccess(true);
    }
  };

  return (
    <Container sx={{ py: 3 }}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 440,
          mx: "auto",
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fafafa",
        }}
      >
        {paymentSuccess ? (
          <>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Payment Successful!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Thank you! Your payment has been processed.
            </Typography>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 3 }}
              fullWidth
              onClick={onClose}
            >
              Close
            </Button>
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Payment
            </Typography>

            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <FormLabel component="legend" sx={{ mb: 1 }}>
                Pay With:
              </FormLabel>
              <RadioGroup
                row
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Card"
                />
              </RadioGroup>
            </FormControl>

            <TextField
            required
              label="Card Holder Name"
              name="cardHolderName"
              placeholder="John Doe"
              value={paymentDetails.cardHolderName}
              onChange={handleChange}
              error={!!errors.cardHolderName}
              helperText={errors.cardHolderName}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
            required
              label="Card Number"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentDetails.cardNumber}
              onChange={handleChange}
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCardIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Box display="flex" gap={2} mb={2}>
              <TextField
              required
                label="Expiry Date"
                name="expiry"
                placeholder="MM/YY"
                value={paymentDetails.expiry}
                onChange={handleChange}
                error={!!errors.expiry}
                helperText={errors.expiry}
                fullWidth
              />
              <TextField
              required
                label="CVV"
                name="cvv"
                placeholder="***"
                value={paymentDetails.cvv}
                onChange={handleChange}
                error={!!errors.cvv}
                helperText={errors.cvv}
                type="password"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  name="saveCard"
                  checked={paymentDetails.saveCard}
                  onChange={handleChange}
                />
              }
              label="Save card details"
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="error"
              size="large"
              fullWidth
              onClick={handleSubmit}
              sx={{ fontWeight: "bold" }}
            >
              Pay Now
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default PaymentSection;

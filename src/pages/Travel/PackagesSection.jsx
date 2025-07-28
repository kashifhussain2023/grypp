// src/components/PackagesSection.tsx
import { Container, Typography, Grid } from "@mui/material";
import PackageCard from "./PackageCard";

const packages = [
  {
    destination: "Bali, Indonesia",
    duration: "7 Days / 6 Nights",
    price: "$1,299",
    description:
      "Experience the magical island of Bali with its lush jungles, stunning beaches, and vibrant culture. Includes luxury accommodations and guided tours.",
    image:
      "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
  },
  {
    destination: "Santorini, Greece",
    duration: "5 Days / 4 Nights",
    price: "$1,899",
    description:
      "Discover the iconic white-washed buildings and breathtaking sunsets of Santorini. Includes flights, boutique hotel, and island tours.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    destination: "Kyoto, Japan",
    duration: "8 Days / 7 Nights",
    price: "$2,499",
    description:
      "Immerse yourself in traditional Japanese culture with visits to ancient temples, bamboo forests, and authentic tea ceremonies.",
    image:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1530&q=80",
  },
  {
    destination: "Machu Picchu, Peru",
    duration: "10 Days / 9 Nights",
    price: "$2,199",
    description:
      "Trek through the Andes to the ancient Incan city of Machu Picchu. Includes guided hikes, local accommodations, and cultural experiences.",
    image:
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    destination: "Paris, France",
    duration: "6 Days / 5 Nights",
    price: "$1,599",
    description:
      "Fall in love with the City of Lights. Includes Eiffel Tower access, Seine River cruise, Louvre tickets, and charming boutique hotel.",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
  },
  {
    destination: "Maldives",
    duration: "7 Days / 6 Nights",
    price: "$3,299",
    description:
      "Relax in paradise with this all-inclusive overwater bungalow package. Includes snorkeling, spa credits, and private transfers.",
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
  },
];

const PackagesSection = () => {
  return (
    <Container
      component="section"
      sx={{ backgroundColor: "white" }}
      id="packages"
    >
      <Typography
        variant="h2"
        className="section-title"
        align="center"
        padding={4}
      >
        Our Popular Packages
      </Typography>
      <Grid container paddingBottom={4} spacing={4}>
        {packages.map((pkg, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <PackageCard {...pkg} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PackagesSection;

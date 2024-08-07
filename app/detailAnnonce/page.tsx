"use client";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';

interface AnnonceDet {
  title: string;
  description: string;
  price: string;
  location: string;
  images: string[];
  type: string;
  heur: string;
}

export default function DetailAnnonce() {
  const [product, setProduct] = React.useState<AnnonceDet | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const annonceId = '2'; // Replace with the actual ID

  React.useEffect(() => {
    // Set global styles to ensure full height and width
    document.documentElement.style.height = '100%';
    document.documentElement.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.width = '100%';
    document.body.style.margin = '0';
    document.body.style.overflow = 'auto';

    const fetchAnnonceDetail = async () => {
      try {
        const response = await axios.get(`http://163.172.170.136:1337/api/annonces/${annonceId}`);
        const data = response.data.data.attributes;

        const annonceDetail: AnnonceDet = {
          title: data.title,
          description: data.description,
          price: data.price,
          location: data.location,
          images: [
            "https://via.placeholder.com/300?text=Image+1",
            "https://via.placeholder.com/300?text=Image+2",
            "https://via.placeholder.com/300?text=Image+3",
            "https://via.placeholder.com/300?text=Image+4",
          ],
          heur: data.heur || "Unknown",
          type: data.category || "Unknown",
        };

        setProduct(annonceDetail);
        setSelectedImage(annonceDetail.images[0]);
      } catch (error) {
        console.error('Error fetching the annonce detail:', error);
      }
    };

    fetchAnnonceDetail();
  }, [annonceId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen m-0 p-0 bg-white overflow-y-auto scrollbar-none">
      <CssBaseline />
      <Box className="relative flex flex-col p-6 rounded-lg h-full w-full">
        <Box className="absolute top-4 right-4">
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2} className="flex-1 mt-10">
          <Grid item xs={12} md={4} className="pr-4">
            <Box className="flex flex-col items-center p-2">
              <Avatar
                alt="Large Product Image"
                src={selectedImage || "https://via.placeholder.com/300?text=No+Image"}
                className="w-80 h-80 mb-2"
                variant="square"
                sx={{ width: 320, height: 320, marginTop: '25px' }} // Margin for the image
              />
              <Box className="flex flex-row overflow-x-auto">
                {product.images.map((image, index) => (
                  <IconButton
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className="p-1 mx-1"
                  >
                    <Avatar
                      alt={`Thumbnail ${index + 1}`}
                      src={image}
                      className={`w-16 h-16 ${selectedImage === image ? 'ring-2 ring-purple-600' : ''}`}
                      sx={{ width: 64, height: 64, border: selectedImage === image ? '2px solid #6b46c1' : 'none' }}
                    />
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8} className="pl-8">
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography
                variant="h2"
                className="text-purple-600 font-semibold mb-4"
                sx={{ marginTop: '25px' }} // Adjust marginTop to align with the image
              >
                {product.title}
              </Typography>
              <Box className="flex items-center mt-1 mb-4">
                <LocationOnIcon className="mr-2 text-black" sx={{ color: 'black' }} />
                <Typography variant="body2" className="text-black" sx={{ color: 'black' }}>
                  {product.location}
                </Typography>
                <Box className="flex items-center ml-4">
                  <AccessTimeIcon className="mr-2 text-black" sx={{ color: 'black' }} />
                  <Typography variant="body2" className="text-black" sx={{ color: 'black' }}>
                    il y a {product.heur}
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography className="text-black text-2xl" sx={{ color: 'black', fontSize: '1.5rem' }}>
                    {product.price} DH
                  </Typography>
                </Grid>
              </Grid>
              <Typography className="mt-2 text-black text-base" sx={{ color: 'black', fontSize: '1.2rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {product.description}
              </Typography>
              <Box className="mt-2">
                <Typography className="text-black text-sm" sx={{ color: 'black', fontSize: '1rem' }}>
                  <strong>Type :</strong> {product.type}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="flex-end" mt={4}>
                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  className="bg-purple-600 text-white rounded-full hover:bg-purple-700 active:bg-purple-800 w-52 h-10 text-xs"
                  sx={{ backgroundColor: '#6b46c1', color: 'white', borderRadius: '9999px', '&:hover': { backgroundColor: '#553c9a' }, '&:active': { backgroundColor: '#44337a' }, width: '13rem', height: '2.5rem', fontSize: '0.75rem' }}
                >
                  Contactez le vendeur
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

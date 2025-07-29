import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import { useCoBrowseScrollSync } from '../hooks/useCoBrowseScrollSync';

/**
 * Demo component showcasing scroll synchronization across multiple containers
 */
const ScrollSyncDemo = ({ userType = 'agent' }) => {
  const [activeContainer, setActiveContainer] = useState('catalog');

  // Initialize scroll sync for different container types
  const catalogScroll = useCoBrowseScrollSync(userType, true, 'catalog');
  const comparisonScroll = useCoBrowseScrollSync(userType, true, 'comparison');
  const detailsScroll = useCoBrowseScrollSync(userType, true, 'details');
  const modalScroll = useCoBrowseScrollSync(userType, true, 'modal');

  // Generate demo content
  const generateDemoContent = (count = 50) => {
    return Array.from({ length: count }, (_, i) => (
      <Card key={i} sx={{ mb: 2, p: 2 }}>
        <Typography variant="h6">Item {i + 1}</Typography>
        <Typography variant="body2" color="text.secondary">
          This is demo content for scroll synchronization testing. 
          Item {i + 1} contains sample text to demonstrate bi-directional scroll sync.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Chip 
            label={`Demo ${i + 1}`} 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
        </Box>
      </Card>
    ));
  };

  const renderScrollContainer = (scrollHook, containerType, title) => {
    const { scrollRef, isActiveController } = scrollHook;
    
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2, 
          height: '400px',
          border: isActiveController ? '2px solid #4caf50' : '1px solid #e0e0e0',
          transition: 'border-color 0.3s ease'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h6">{title}</Typography>
          {isActiveController && (
            <Chip 
              label="Active Controller" 
              size="small" 
              color="success" 
            />
          )}
          {!isActiveController && (
            <Chip 
              label="Synced" 
              size="small" 
              color="info" 
              variant="outlined"
            />
          )}
        </Box>
        
        <Box
          ref={scrollRef}
          sx={{
            height: '320px',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            border: '1px solid #f0f0f0',
            borderRadius: 1,
            p: 1,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#c1c1c1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#a8a8a8',
            },
          }}
        >
          {generateDemoContent(30)}
        </Box>
      </Paper>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Scroll Synchronization Demo
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        User Type: <Chip label={userType} size="small" color="primary" />
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {renderScrollContainer(catalogScroll, 'catalog', 'Catalog Container')}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderScrollContainer(comparisonScroll, 'comparison', 'Comparison Container')}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderScrollContainer(detailsScroll, 'details', 'Details Container')}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderScrollContainer(modalScroll, 'modal', 'Modal Container')}
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          How to Test
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          1. Open this demo in two browser windows (agent and customer)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          2. Scroll in any container on one side
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          3. Watch the corresponding container sync on the other side
        </Typography>
        <Typography variant="body2" color="text.secondary">
          4. Each container type has independent scroll synchronization
        </Typography>
      </Box>
    </Box>
  );
};

export default ScrollSyncDemo;
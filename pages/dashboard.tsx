import React from 'react';
import { Box, Grid, Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    spacer: {
      flexGrow: 1,
    }
  }));

const Dashboard = () => {
    return (
        <Container maxWidth="xl">
        <Box>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            Grid
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            Grid
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            Grid
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            Grid
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            Grid
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            Grid
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            Grid
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            Grid
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            Grid
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            Grid
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            Grid
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            Grid
          </Grid>
        </Grid>
      </Container>
    )
}

export default Dashboard
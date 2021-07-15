import React, { useEffect, useState } from 'react';
import { Box, Grid, Container, Typography, makeStyles } from '@material-ui/core';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const useStyles = makeStyles((theme) => ({
  spacer: {
    flexGrow: 1,
  }
}));

const Dashboard = () => {
  const options = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  }
  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]
  return (
    <Container maxWidth="xl">
      <Box>
        <Typography variant="h4">Hi, Welcome back</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Chart
            options={options}
            series={series}
            type="bar"
            width="500"
          />
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
'use client'

import { Box, Skeleton, Stack, Typography, Grid } from '@mui/material'

export default function Loading() {
    return (
        <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
            {/* Hero Section */}
            <Skeleton
                variant="rectangular"
                height={300}
                sx={{ borderRadius: 3 }}
                animation="wave"
            />

            {/* Date Pickers and Button */}
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                mt={-4}
                mb={6}
            >
                <Skeleton variant="rectangular" width={140} height={50} />
                <Skeleton variant="rectangular" width={140} height={50} />
                <Skeleton variant="circular" width={50} height={50} />
            </Stack>

            {/* Title for vehicle section */}
            <Box textAlign="center" mb={3}>
                <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} height={40} />
            </Box>

            {/* Vehicle Carousel Simulation */}
            <Grid container spacing={3} justifyContent="center">
                {[1, 2, 3].map((i) => (
                    <Grid item key={i}>
                        <Skeleton
                            variant="rectangular"
                            width={220}
                            height={100}
                            sx={{ borderRadius: 2 }}
                            animation="wave"
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

import { Box, Button, Card, CardMedia, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const Management = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs></Grid>
      <Grid item xs={8}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <h1>사용자 관리</h1>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="contained" color="success" sx={{ color: "white" }}>
              <Link
                to="/register"
                style={{ color: "white", textDecoration: "none" }}
              >
                등록
              </Link>
            </Button>
          </Box>
        </Box>
        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Card sx={{ maxWidth: "100%", display: "flex" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="220"
                  sx={{ maxWidth: "180px" }}
                />
                <Box sx={{ width: "100%", marginLeft: 2, marginRight: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <h2 style={{ color: "#757575" }}>김을지</h2>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Button variant="contained" sx={{ marginRight: 2 }}>
                        수정
                      </Button>
                      <Button variant="contained" color="error">
                        삭제
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: "block" }}>
                    <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                      위치 : 진료실1
                      <br />
                      <br />
                      아이디 : jhkin988
                      <br />
                      <br />
                      생년월일 : 96.11.19
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        color: "#69F0AE",
                      }}
                    >
                      <h3>info@naver.com</h3>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Card sx={{ maxWidth: "100%", display: "flex" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="220"
                  sx={{ maxWidth: "180px" }}
                />
                <Box sx={{ width: "100%", marginLeft: 2, marginRight: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <h2 style={{ color: "#757575" }}>김을지</h2>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Button variant="contained" sx={{ marginRight: 2 }}>
                        수정
                      </Button>
                      <Button variant="contained" color="error">
                        삭제
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: "block" }}>
                    <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                      위치 : 진료실1
                      <br />
                      <br />
                      아이디 : jhkin988
                      <br />
                      <br />
                      생년월일 : 96.11.19
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        color: "#69F0AE",
                      }}
                    >
                      <h3>info@naver.com</h3>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Card sx={{ maxWidth: "100%", display: "flex" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="220"
                  sx={{ maxWidth: "180px" }}
                />
                <Box sx={{ width: "100%", marginLeft: 2, marginRight: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <h2 style={{ color: "#757575" }}>김을지</h2>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Button variant="contained" sx={{ marginRight: 2 }}>
                        수정
                      </Button>
                      <Button variant="contained" color="error">
                        삭제
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: "block" }}>
                    <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                      위치 : 진료실1
                      <br />
                      <br />
                      아이디 : jhkin988
                      <br />
                      <br />
                      생년월일 : 96.11.19
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        color: "#69F0AE",
                      }}
                    >
                      <h3>info@naver.com</h3>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Card sx={{ maxWidth: "100%", display: "flex" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="220"
                  sx={{ maxWidth: "180px" }}
                />
                <Box sx={{ width: "100%", marginLeft: 2, marginRight: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <h2 style={{ color: "#757575" }}>김을지</h2>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Button variant="contained" sx={{ marginRight: 2 }}>
                        수정
                      </Button>
                      <Button variant="contained" color="error">
                        삭제
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: "block" }}>
                    <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                      위치 : 진료실1
                      <br />
                      <br />
                      아이디 : jhkin988
                      <br />
                      <br />
                      생년월일 : 96.11.19
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        color: "#69F0AE",
                      }}
                    >
                      <h3>info@naver.com</h3>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Card sx={{ maxWidth: "100%", display: "flex" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="220"
                  sx={{ maxWidth: "180px" }}
                />
                <Box sx={{ width: "100%", marginLeft: 2, marginRight: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <h2 style={{ color: "#757575" }}>김을지</h2>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Button variant="contained" sx={{ marginRight: 2 }}>
                        수정
                      </Button>
                      <Button variant="contained" color="error">
                        삭제
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: "block" }}>
                    <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                      위치 : 진료실1
                      <br />
                      <br />
                      아이디 : jhkin988
                      <br />
                      <br />
                      생년월일 : 96.11.19
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        color: "#69F0AE",
                      }}
                    >
                      <h3>info@naver.com</h3>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default Management;

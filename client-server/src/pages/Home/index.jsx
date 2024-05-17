import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import {
  useGetAllMenuQuery,
  useDeleteMenuByIdMutation,
  usePostMenuMutation,
} from "../../services/menuApi";
import styles from "../Home/home.module.scss";

const Home = () => {
  const { data: menu, isLoading, refetch } = useGetAllMenuQuery();
  const [deleteMenuById] = useDeleteMenuByIdMutation();

  const [category, setCategory] = useState("main");
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.home}>
        <h1>Tasty & Delicious Food</h1>
        <button className={styles.btnTable}>Book a Table</button>
      </div>
      <div className={styles.sect2}>
        <div className={styles.imgContainer}>
          <img
            src="https://preview.colorlib.com/theme/tasty/images/about-2.jpg"
            alt=""
          />
        </div>
        <div className={styles.textCenter}>
          <p>About Tasty</p>
          <h5>Our chef cooks the most delicious food for you</h5>
          <p>
            Far far away, behind the word mountains, far from the countries{" "}
            <br />
            Vokalia and Consonantia, there live the blind texts. Separated they{" "}
            <br />
            live in Bookmarksgrove right at the coast of the Semantics, a large{" "}
            <br />
            language ocean.
          </p>
          <p>
            A small river named Duden flows by their place and supplies it with{" "}
            <br />
            the necessary regelialia. It is a paradisematic country, in which{" "}
            <br />
            roasted parts of sentences fly into your mouth. <br />
          </p>
        </div>
      </div>

      <div className={styles.sect3} style={{ padding: 100 }}>
        <h3>Discover Our Exclusive Menu</h3>
        <div className={styles.btnSect}>
          <button className={styles.btnMenu}
            onClick={() => {
              setCategory("main");
            }}
          >
            Main
          </button>
          <button  className={styles.btnMenu}
            onClick={() => {
              setCategory("desserts");
            }}
          >
            Desserts
          </button>
          <button  className={styles.btnMenu}
            onClick={() => {
              setCategory("drinks");
            }}
          >
            Drinks
          </button>
        </div>

        <Grid container spacing={2}>
        {menu &&
          menu.data
            .filter((q) => q.category === category)
            .map((m) => (
              <Grid item ls={12}  md={3}>
              <Card sx={{ maxWidth: 345 }} key={m.id}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" style={{width:100,height:100,backgroundPosition:"center",backgroundSize:'cover'}}>
                    <img src={m.src} alt="" style={{width:100}}/>
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={m.title}
                subheader={m.price}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {m.bio}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <Button
                  style={{ color: "black" }}
                  onClick={async () => {
                    await deleteMenuById(m._id);
                    refetch();
                  }}
                >
                  <DeleteIcon />
                </Button>
              </CardActions>
            </Card>
            </Grid>
              
            ))}
            </Grid>
      </div>
    </>
  );
};

export default Home;

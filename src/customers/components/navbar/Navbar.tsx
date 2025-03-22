import React from "react";
import { Box, Icon, IconButton, Button, Avatar, useMediaQuery, useTheme } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import { AddShoppingCart, FavoriteBorder, Storefront } from "@mui/icons-material";
import CategorySheet from "./CategorySheet";

const Navbar = () => {
    const theme = useTheme();
    const isLarge=useMediaQuery(theme.breakpoints.up("lg"))


  return (
    <Box className='sticky top-0 left-0 right-0 bg-white' sx={{zIndex:2}}>
      <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-2">
            {!isLarge && <Icon>
              <ListIcon></ListIcon>
            </Icon>}
            <h1 className="logo cursor-pointer text-lg mf:text-2xl text-primary-color">
              Alpha PetStore
            </h1>
          </div>

        <ul className="flex items-center font-medium text-gray-800">
            {["Food","Clothing","Meds","Others"].map((item)=> <li className="mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center">
                {item}
            </li>)}
            <li>

            </li>
        </ul>


        </div>
        <div className="flex gap-1 lg:gap-6 items-center">
          <IconButton>
            <SearchIcon></SearchIcon>
          </IconButton>

          {true ? <Button className="flex items-center gap-2">
            <Avatar sx={{width: 30, height: 30}} src="https://lh3.googleusercontent.com/a/ACg8ocKNFWEfPQlS9n7osdAUHJgv27ktLQV13Th56qqKDqbGNRdZ4GyCSw=s96-c-rg-br100"></Avatar>
            <h1 className="font-semibold hidden lg:block">Tanmoy</h1>
            </Button> : <Button variant="contained">Login</Button>}
            <IconButton>
                <FavoriteBorder sx={{fontSize:30}}></FavoriteBorder>
            </IconButton>
            <IconButton>
                <AddShoppingCart className="text-gray-700" sx={{fontSize:30}}></AddShoppingCart>
            </IconButton>
            {isLarge && <Button startIcon={<Storefront></Storefront>} variant="outlined">
                Become Seller
            </Button>}
        </div>
      </div>
      <div className="categorySheet absolute top-[4.41rem] left-20 right-20 border">
        <CategorySheet></CategorySheet>
      </div>
    </Box>
  );
};

export default Navbar;

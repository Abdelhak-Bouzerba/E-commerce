import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../context/Auth/AuthContext";
import { Badge, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";


function Navbar() {
    const { username, isAuthenticated , logOut } = useAuth();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const toLogin = () => {
        navigate("/login");
    }
    const handleLogOut = () => {
        logOut();
        navigate("/");
        handleCloseUserMenu();
    }
    const handleCart = () => {
        navigate("/cart");
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", width: "100%" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <AdbIcon sx={{ display: "flex", mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                }}
                            >
                                Tech Hub
                            </Typography>
                        </Box>
                        <Box sx={{display:'flex',flexDirection:'row',gap:4,alignItems:'center',justifyContent:'center',flexGrow: 0}}>
                            <IconButton aria-label="cart" onClick={handleCart}>
                            <Badge badgeContent={4} color="secondary">
                            <ShoppingCart sx={{color:'white'}} />
                            </Badge>
                            </IconButton>
                            {isAuthenticated ? (
                                <>
                                <Tooltip title="Open settings">
                                <Grid container sx={{alignItems:'center', justifyContent:'center' , gap:2}}>
                                    <Grid item>
                                        <Typography>{username}</Typography>
                                    </Grid>
                                    <Grid item>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={username || ''} src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: "center" }}>Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogOut}>
                                    <Typography sx={{ textAlign: "center" }}>Log Out</Typography>
                                </MenuItem>
                            </Menu>
                                </>
                            ):(<Button variant="contained" color="success" onClick={toLogin}>Login</Button>)}
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;

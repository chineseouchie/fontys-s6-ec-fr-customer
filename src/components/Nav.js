import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import AccountNav from "./AccountNav"
import { Link } from "react-router-dom"
import CartMenu from "./CartMenu"

const pages = [{title:"Products", link:"products"}, {title:"Categories", link:"categories"}, {title:"Product add", link:"products/add"}]

export default function Nav() {
	
	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Link to="/">
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ mr: 2, display: { xs: "none", md: "flex" } }} >
						LOGO
						</Typography>
					</Link>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit" >
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{vertical: "bottom",horizontal: "left"}}
							keepMounted
							transformOrigin={{vertical: "top",horizontal: "left"}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{display: { xs: "block", md: "none" }}} >
							{pages.map((page) => (
								<Link key={page.title} to={page.link}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography textAlign="center">{page.title}</Typography>
									</MenuItem>
								</Link>
							))}
						</Menu>
					</Box>
					<Link to="/">
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} >
							LOGO
						</Typography>
					</Link>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Link key={page.title} to={page.link}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "white", display: "block" }} >
									{page.title}
								</Button>
							</Link>
						))}
					</Box>

					{/* ACCOUNT */}
					<AccountNav/>
					<CartMenu />
				</Toolbar>
			</Container>
		</AppBar>
	);
}

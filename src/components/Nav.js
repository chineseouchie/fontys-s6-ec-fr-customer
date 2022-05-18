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
import { useContext, useEffect, useState } from "react"
import AccountNav from "./AccountNav"
import { Link } from "react-router-dom"
import CartMenu from "./CartMenu"
import { UserContext } from "../providers/UserProvider"
import jwtDecode from "jwt-decode"

const pages = [
	{title:"Products", link:"products", roles: ["CUSTOMER"]},
	{title:"Categories", link:"categories", roles: ["CUSTOMER"]},
	{title:"Product add", link:"products/add", roles: ["ADMIN", "PRODUCT_MANAGER"]}
]

export default function Nav() {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const { user } = useContext(UserContext)
	const [roles, setRoles] = useState([])
	
	useEffect(() => {
		const roles = user.jwt ? jwtDecode(user.jwt).roles : []
		setRoles(roles)
		
	}, [user.jwt])
	
	const visiblePages = []
	pages.forEach(page => {
		let z = 0
		page.roles.forEach(role => {
			if (role === "CUSTOMER" || roles.includes(role)) {
				z++
				
			}
		})
		if (z > 0) {
			visiblePages.push(page)
		}
		// console.log(a)
	})
	console.log(visiblePages)


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
							{visiblePages.map((page) => (
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
						{visiblePages.map((page) => (
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

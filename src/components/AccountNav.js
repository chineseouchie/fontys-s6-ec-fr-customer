import {
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography
} from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
const settings = ["Account", "Dashboard", "Logout"];

export default function AccountNav() {
	const { user, logout } = useContext(UserContext)
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleUserMenu = (e) => {
		setAnchorElUser(null);
		console.log(e)
		if (e === "Logout") {
			logout()
		}
	};

	return(
		<>
			{user.jwt ?
				<Box sx={{ flexGrow: 0 }}>
					<Tooltip title="Open settings">
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
							<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
						</IconButton>
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
						onClose={handleCloseUserMenu} >
						{settings.map((setting) => (
							<MenuItem key={setting} onClick={() => handleUserMenu(setting)}>
								<Typography textAlign="center">{setting}</Typography>
							</MenuItem>
						))}
					</Menu>
				</Box>
				:
				<>
					<Link to="/login">
						<MenuItem>
							<Typography textAlign="center">
										Login
							</Typography>
						</MenuItem>
					</Link>
					<Link to="/register">
						<MenuItem>
							<Typography textAlign="center">
										Register
							</Typography>
						</MenuItem>
					</Link>

				</>
			}
		</>
	)
}

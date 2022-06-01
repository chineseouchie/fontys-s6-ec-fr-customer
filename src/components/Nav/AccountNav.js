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
import { UserContext } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const settings = ["Account", "Dashboard", "Logout"];

export default function AccountNav() {
	const { user, logout } = useContext(UserContext)
	const [anchorElUser, setAnchorElUser] = useState(null);
	const navigate = useNavigate()

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleUserMenu = (e) => {
		setAnchorElUser(null);

		switch (e) {
		case "Logout":
			logout()
			break;
		case "Admin":
			navigate("/admin")
			break;
		default:
			break;
		}
	};

	return(
		<>
			{user.jwt ?
				<Box sx={{ flexGrow: 0 }}>
					<Tooltip title="Open settings">
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
							<Avatar alt="Remy Sharp"> S</Avatar>
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
						{user.isAdmin && (
							<MenuItem onClick={() => handleUserMenu("Admin")}>
								<Typography textAlign="center">Admin</Typography>
							</MenuItem>
						)}
						
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

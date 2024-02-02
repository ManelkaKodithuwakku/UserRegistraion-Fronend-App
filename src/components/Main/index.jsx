import styles from "./styles.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Main = () => {

    const [userData, setUserData] = useState({
        username: "",
        email: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
            
            const response = await axios.get("http://localhost:8080/api/user/details", {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 200) {
                const data = response.data;
                setUserData({
                    email: data.email,
                    username: data.username
                });
            } else {
                console.error("Failed to fetch user details");
            }
            } catch (error) {
                console.error("Error fetching user details", error);
            }
        };

        fetchData();
    }, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
        window.location = "/";
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>User details</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
            <div className={styles.bottom}>
					<form className={styles.form_container}>
                        <input
							type="username"
							placeholder="Username"
							name="username"
							value={userData.username}
							className={styles.input}
                            readOnly
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							value={userData.email}
							readOnly
							className={styles.input}
						/>
					</form>
				</div>
		</div>
	);
};

export default Main;
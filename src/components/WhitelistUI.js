import React from "react";
import getClassName from "../utils/getClassName";

function WhitelistUI() {
    return (
        <div className={getClassName("WhitelistUI")}>
            <h1>Join the whitelist</h1>
            <div id="with-sta-email">
                <h3>If you have a St. Andrews email</h3>
            <form action="http://localhost:8080/send-sta" method="post">
                <label htmlFor="email">St. Andrews email (prefix only):</label>
                <input type="text" id="email" name="email" />
                <label htmlFor="minecraft_username">Minecraft username:</label>
                <input type="text" name="minecraft_username" />
                <input type="submit" value="Submit" />
            </form>
            </div>
            <div id="without-sta-email">
            <h3>If you don't</h3>
            <form action="http://localhost:8080/send-written" method="post">
                <label htmlFor="minecraft_username">Minecraft username:</label>
                <input type="text" name="minecraft_username" />
                <label htmlFor="email">Email (full; prefix@domain):</label>
                <input type="text" name="email" />
                <label htmlFor="reason">Reason for joining:</label>
                <textarea name="reason" id="reason" cols="30" rows="10"></textarea>
                <input type="submit" value="Submit" />
            </form>
            </div>
        </div>
    );
}

export default WhitelistUI;
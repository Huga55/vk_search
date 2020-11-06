import React from "react";
import css from "./User.module.css";

const User = (props) => {
    return(
        <div className={css.info}>
            <div className={css.left}>
                <img src={props.photo_100} alt="" className={css.avatar}/>
            </div>
            <div className={css.right}>
                <div>{props.first_name} {props.last_name}</div>
            </div>
        </div>
    );
}

export default User;
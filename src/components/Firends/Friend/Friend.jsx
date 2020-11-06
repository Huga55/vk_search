import React from "react";
import css from "./Friend.module.css";

const Friend = (props) => {
    return(
        <div className={css.wrapper}>
            <div className={css.left}>
                <img src={props.info.photo_100} alt="" className={css.avatar}/>
            </div>
            <div className={css.right}>
                <div>{props.info.first_name} {props.info.last_name}</div>
                <div>{props.info.bdate}</div>
            </div>
        </div>
    );
}

export default Friend;
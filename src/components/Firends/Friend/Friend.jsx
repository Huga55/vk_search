import React from "react";
import css from "./Friend.module.css";
import {getAgFromDate} from "../Friends";

const Friend = (props) => {
    return(
        <div className={css.wrapper}>
            <div className={css.left}>
                <img src={props.info.photo_100} alt="" className={css.avatar}/>
            </div>
            <div className={css.right}>
                <div>{props.info.first_name} {props.info.last_name}</div>
                <div>Возраст: {getAgFromDate(props.info.bdate)}</div>
                <div>Пол: {props.info.sex === 2? "Муж" : "Жен"}</div>
            </div>
        </div>
    );
}

export default Friend;
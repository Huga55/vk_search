import React from "react";
import css from "./User.module.css";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderContent from "@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";

const User = (props) => {
    return(
        <PanelHeader>
            <PanelHeaderContent
                status="Статус"
                before={<Avatar size={50} src={props.photo_100} />}
            >
                {props.first_name} {props.last_name}
            </PanelHeaderContent>
        </PanelHeader>
    );
}

export default User;
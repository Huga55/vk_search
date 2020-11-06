import React, {useState, useEffect} from "react";
import css from "./Friends.module.css";
import Friend from "./Friend/Friend";
import {Button} from "@vkontakte/vkui";

export let getAgFromDate = (date) => {
    //получем возраст по дате рождения
    if(date !== undefined && date.length > 7) {
        return Math.floor((new Date().getTime() - new Date(date.replace(/(\d+).(\d+).(\d+)/, '$3-$2-$1')))/(24 * 3600 * 365.25 * 1000));
    }else {
        return "Возраст не указан";
    }

}

const Friends = (props) => {
    const [countFriendsVisible, setCountFriendsVisible] = useState(100);
    const [firstFriend, setFirstFriend] = useState(0);

    const [search, setSearch] = useState({
        lastname: "",
        firstname: "",
        age: "",
        sex: 0,
        isImportantAge: false,
    });
    const [arrayOfFriends, setArrayOfFriends] = useState(props.friends);

    useEffect(() => {
        setCountFriendsVisible(100);

        let name = props.propSearch.name;
        let value = props.propSearch.value;
        setSearch(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }, [props.propSearch, props.friends]);

    let addResultOfFriends = (e) => {
        let height = e.currentTarget.scrollHeight - e.currentTarget.clientHeight;
        let scrollElement = e.currentTarget.scrollTop;
        if(height - scrollElement < 500 && countFriendsVisible !== arrayOfFriends.length) {
            setCountFriendsVisible(countFriendsVisible + 100);
        }
    }

    useEffect(() => {
        setArrayOfFriends(props.friends.filter(f => {
            if( (search.lastname === "" || f.last_name.toLowerCase().includes(search.lastname) ) &&
                (search.firstname === "" || f.first_name.toLowerCase().includes(search.firstname)) &&
                (+search.sex === 0 || f.sex === +search.sex) &&
                (   (search.age === "") ||
                    (search.isImportantAge && (f.bdate === undefined || f.bdate.length < 8)) ||
                    (f.bdate !== undefined && f.bdate.length > 7 && +search.age === getAgFromDate(f.bdate))   )) {
                return f;
            }
        }));
    }, [search]);

    return(
        <div>
            <div>По вашему запросу найдено: {arrayOfFriends.length}</div>
            <div className={css.friends} onScroll={addResultOfFriends}>
                {arrayOfFriends.map((f, index) => {
                    if(index >= countFriendsVisible) {
                        return;
                    }
                    return <Friend info={f} key={index}/>;
                })}
            </div>
        </div>
    );
}

export default Friends;
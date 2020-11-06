import React, {useState, useEffect} from "react";
import css from "./Friends.module.css";
import Friend from "./Friend/Friend";

const Friends = (props) => {
    const [search, setSearch] = useState({
        lastname: "",
        firstname: "",
        age: "",
        sex: 0,
        isImportantAge: false,
    });
    const [arrayOfFriends, setArrayOfFriends] = useState(props.friends);

    useEffect(() => {
        let name = props.propSearch.name;
        let value = props.propSearch.value;
        setSearch(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }, [props.propSearch, props.friends]);


    useEffect(() => {

        let getAgFromDate = (date) => {
            //получем возраст по дате рождения
            return Math.floor((new Date().getTime() - new Date(date.replace(/(\d+).(\d+).(\d+)/, '$3-$2-$1')))/(24 * 3600 * 365.25 * 1000));
        }

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
        <div className={css.friends}>
            {arrayOfFriends.map((f, index) => <Friend info={f} key={index}/>)}
        </div>
    );
}

export default Friends;
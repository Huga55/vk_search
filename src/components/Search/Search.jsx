import React, {useState, useEffect} from "react";
import css from "./Search.module.css";
import {Input, Radio} from "@vkontakte/vkui";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";

const Search = (props) => {

    let setNewOption = (e, value = e.currentTarget.value.toLowerCase()) => {
        props.setPropsSearch({name: e.currentTarget.name, value: value.trim()});
    }

    return(
        <form className={css.search}>
            <div className={css.subtitle}>
                Поиск по друзьям и их друзьям
            </div>
            <div>
                <Input type="text" name="lastname" onChange={setNewOption} placeholder="Фамилия" className={css.input}/>
            </div>
            <div>
                <Input type="text" name="firstname" onChange={setNewOption} placeholder="Имя" className={css.input}/>
            </div>
            <div>
                <Input type="text" name="age" onChange={setNewOption} placeholder="Возраст" className={css.input}/>
                <Checkbox name="isImportantAge" onChange={(e) => setNewOption(e, e.currentTarget.checked)} >Учитывать в результатах поиска друзей без даты рождения</Checkbox>
            </div>
            <div>
                Пол
                <Radio  name="sex" value="2" onChange={setNewOption}>Мужской</Radio>
                <Radio  name="sex" value="1" onChange={setNewOption}>Женский</Radio>
                <Radio  name="sex" value="0" onChange={setNewOption} defaultChecked>Любой</Radio>
            </div>

        </form>
    );
}

export default Search;
import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import User from "./components/User/User";
import Friends from "./components/Firends/Friends";
import Search from "./components/Search/Search";
import {Div, Panel} from "@vkontakte/vkui";
import {Button} from "@vkontakte/vkui/dist/es6";
import iconSearch from "./img/search.jpg";
import spinner from "./img/spnner.gif";
import fetchJsonp from "fetch-jsonp";


const App = (props) => {
	const [necesseryCount, setNecesseryCount] = useState(10000);//для разработчика, исходное количество друзей
	const [token, setToken] = useState(null);// токен для запросов на API
	const [userInfo, setUserInfo] = useState(null);// информация текущего пользователя
	const [friendsList, setFriendsList] = useState([]);//информация о друзьях пользователя и друзей друзей
	const [friendsCount, setFriendsCount] = useState(necesseryCount);//остаток друзей для получения от API
	const [currentFriend, setCurrentFriend] = useState(-1);//текущий друг для получения его друзей
	const [activeScreen, setActiveScreen] = useState("entry");//id активного экрана приложения
	const [propSearch, setPropSearch] = useState({name: "lastname", value: ""});//измененный параметр поиска (динамический)

	useEffect(() => {
		async function getUserInfo() {
			const userToken = await bridge.send('VKWebAppGetAuthToken', {"app_id": 7651090,"scope": "friends"});
			setToken(userToken["access_token"]);
			const user = await bridge.send("VKWebAppGetUserInfo");
			setUserInfo(user);
		}
		getUserInfo();
	}, []);

	useEffect(() => {
		if(token && userInfo) {
			getFriends();
		}
	}, [token, userInfo]);

	useEffect(() => {
		if(friendsCount < necesseryCount && friendsCount > 0) {
			if(friendsList[currentFriend]["can_access_closed"]) {
				getFriends(friendsList[currentFriend].id);
			}else {
				setCurrentFriend(currentFriend + 1);
			}
		}
	}, [currentFriend]);

	let getFriends = async (idUser = userInfo.id) => {
		const response = await fetchJsonp(`https://api.vk.com/method/friends.get?user_id=${idUser}&count=${friendsCount}&fields=can_write_private_message,photo_100,bdate,sex&access_token=${token}&v=5.124.jsonp`, {
			method: "GET",
			typeData: "JSONP",
		});

		if(response.ok) {
			const json = await response.json();
			if(!json.error) {
				setFriendsList([...friendsList, ...json.response.items]);
				setFriendsCount(friendsCount - json.response.count);
				setCurrentFriend(currentFriend + 1);
			}else {
				getFriends(friendsList[currentFriend].id);//если vk api выдал ошибку о превышении количества запросов
			}
		}
	}

	const tokenAdd = "efdf21bfc941ae22fbf244dad9ba5d4f3ecea89e53519a71213f3d68984b0e86eb059aca38274c1eeda88";

	return (
		<View activePanel={activeScreen} className="App">
			<Panel id="entry">
				<div className="section-entry">
					<img alt="search" src={iconSearch} className="main-icon"/>
					<Button className="button-entry" mode="primary" onClick={() => setActiveScreen("main")}>Начать
						работу</Button>
				</div>
			</Panel>
			<Panel id="main">

				{friendsList.length === necesseryCount ?
					<Div>
						<User {...userInfo}/>
						<Search setPropsSearch={setPropSearch}/>
						<Friends friends={friendsList} propSearch={propSearch}/>
					</Div> :
					<div className="section-wait">
						Друзей найдено: {friendsList.length}
						<img alt="spinner" src={spinner} className="spinner"/>
						<span className="spinner-text">Ищем всех всех ваших друзей..</span>
					</div>
				}
			</Panel>
		</View>
	);
}

export default App;


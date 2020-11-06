import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import User from "./components/User/User";
import Friends from "./components/Firends/Friends";
import Search from "./components/Search/Search";
import {Group, Panel} from "@vkontakte/vkui";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import {Button} from "@vkontakte/vkui/dist/es6";


const App = (props) => {
	const [token, setToken] = useState(null);// токен для запросов на API
	const [userInfo, setUserInfo] = useState(null);// информация текущего пользователя
	const [friendsList, setFriendsList] = useState([]);//информация о друзьях пользователя и друзей друзей
	const [friendsCount, setFriendsCount] = useState(10);//остаток друзей для получения от API
	const [currentFriend, setCurrentFriend] = useState(-1);//текущий друг для получения его друзей
	const [activeScreen, setActiveScreen] = useState("main");//id активного экрана приложения
	const [propSearch, setPropSearch] = useState({name: "lastname", value: ""});

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
		if(friendsCount < 10 && friendsCount > 0) {
			if(friendsList[currentFriend]["can_access_closed"]) {
				getFriends(friendsList[currentFriend].id);
			}else {
				setCurrentFriend(currentFriend + 1);
			}
		}else {
			console.log(friendsList);
		}
	}, [currentFriend]);

	let getFriends = async (idUser = userInfo.id) => {
		const response = await fetch(`http://localhost:8010/proxy/method/friends.get?user_id=${idUser}&count=${friendsCount}&fields=can_write_private_message,photo_100,bdate,sex&access_token=${token}&v=5.124`, {
			method: "GET",
		});
		if(response.ok) {
			const json = await response.json();
			setFriendsList([...friendsList, ...json.response.items]);
			setFriendsCount(friendsCount - json.response.count);
			setCurrentFriend(currentFriend + 1);
		}
	}

	const tokenAdd = "efdf21bfc941ae22fbf244dad9ba5d4f3ecea89e53519a71213f3d68984b0e86eb059aca38274c1eeda88";

	return (
		<View activePanel={activeScreen} className="App">
			<Panel id="entry">
				<div className="section-entry">
					<Button className="button-entry" mode="primary" onClick={() => setActiveScreen("main")}>Начать работу</Button>
				</div>
			</Panel>
			<Panel id="main">
				<Group >
					<PanelHeader>Поиск пользователей</PanelHeader>
					<User {...userInfo}/>
					<Search setPropsSearch={setPropSearch} />
					<Friends friends={friendsList} propSearch={propSearch}/>
				</Group>
			</Panel>
		</View>
	);
}

export default App;


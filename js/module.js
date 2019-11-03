/** 二点間の距離を計算する関数
 * 
 * @param { Number } lat1 
 * @param { Number } lng1 
 * @param { Number } lat2 
 * @param { Number } lng2 
 */

const getDistance = (lat1, lng1, lat2, lng2) => {
    lat1 *= Math.PI / 180;
    lng1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    lng2 *= Math.PI / 180;
    return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
}


/**周りの男の位置を取得する関数
 * 
 * @param { Object } myPosition 
 *      - lat 緯度
 *      - lng 経度
 */

const getAroundMenPosition = async (myPosition) => {
    const myLat = myPosition.lat;
    const myLng = myPosition.lng;

    // 全員の男を取得
    let allMenPosition = [];
    try {
        const allMenPositionJsonData = await fetch('./js/resources/users.json', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'X-Cybozu-API-Token': 'aFHeAP0UUn3QzdPgzPCZ0ekPuSpgi8ahzu7WdGWk'
            }
        });
        allMenPosition = await allMenPositionJsonData.json();
        allMenPosition = allMenPosition.users;
    } catch (e) {
        console.log('error =>', e);
    }

    // 1km以内の100人まで男を取得
    const menBelow100 = [];
    for (let i = 0; i < allMenPosition.length; i++) {
        console.log(getDistance(myLat, myLng, allMenPosition[i].lat, allMenPosition[i].lng))
        if (getDistance(myLat, myLng, allMenPosition[i].lat, allMenPosition[i].lng) < 10000) {
            menBelow100.push(allMenPosition[i]);
        }
        // 100人以上いたら終わり
        if (menBelow100.length >= 100) break;
    }
    return menBelow100;
}

/** 
 * 
 * @param { Object } userInfo ユーザの情報、DOM操作で取ってくる
 * 
 */
// 登録する
const registerUser = async () => {
    const name = document.getElementById('name').value,
          mail = document.getElementById('mail').value,
          pass = document.getElementById('pass').value,
          is_announcer = document.getElementById('is_announcer').value;

    // Firebase create user
    let uid;
    try {
        const data = await firebase.auth().createUserWithEmailAndPassword(mail, pass);
        uid = data.user.uid;
    } catch (e) {
        alert('ユーザの登録に失敗しました');
        return false;
    }

    // POST
    try {
        await fetch('https://moumoon.cybozu.com/k/v1/record.json?app=5', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Host': 'localhost:3000',
                'X-Cybozu-Authorization': 'aFHeAP0UUn3QzdPgzPCZ0ekPuSpgi8ahzu7WdGWk',
                'Authorization': 'Basic aFHeAP0UUn3QzdPgzPCZ0ekPuSpgi8ahzu7WdGWk',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_announcer: is_announcer,
                name: name,
                uid: uid
            })
        });
    } catch (e) {
        throw e;
    }
}

// ログインする
const loginUser = async (userInfo) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(userInfo.mail, userInfo.pass);
    } catch (e) {
        alert('ログインに失敗しました');
        return false;
    }
}

// 自分のユーザを取得
const getMyUser = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                alert('ログインしてください！');
                reject();
            }
            const uid = user.uid;
            const loggedInUser = await fetch('https://moumoon.cybozu.com/k/v1/record.json?app=5&uid=' + uid, {
                headers: {
                    'Host': 'localhost:3000',
                    'X-Cybozu-Authorization': 'aFHeAP0UUn3QzdPgzPCZ0ekPuSpgi8ahzu7WdGWk',
                    'Authorization': 'Basic aFHeAP0UUn3QzdPgzPCZ0ekPuSpgi8ahzu7WdGWk'
                }
            })
            resolve(loggedInUser);
        })
    })
}
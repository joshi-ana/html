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
    const { myLat, myLng } = myPosition;

    // 全員の男を取得
    const allMenPosition = await fetch('http://dstn1.kumoko.club/dataspider/trigger/users');

    // 1km以内の100人まで男を取得
    const menBelow100 = [];
    for (let i = 0; i < allMenPosition.length; i++) {
        if (getDistance(myLat, myLng, allMenPosition[i].lat, allMenPosition[i].lng) <= 1) {
            menBelow100.push(man);
        }
        // 100人以上いたら終わり
        if (menBelow100.length >= 100) break;
    }
    return menBelow100;
}

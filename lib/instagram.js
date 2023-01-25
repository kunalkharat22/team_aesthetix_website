import axios from 'axios'
import localStorage from 'localstorage-memory'

let feed = null

const refreshToken = async () => {
  let token = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  if(expiresAt && expiresAt < Date.now()){
    // Refresh token
    const refreshRes = await axios.get(
      `https://graph.instagram.com/access_token?grant_type=ig_refresh_token&access_token=${token}&client_secret=${process.env.REACT_APP_INSTAGRAM_APP_SECRET}`
    );
    token = refreshRes.data.access_token;
    expiresAt = Date.now() + refreshRes.data.expires_in * 1000;
    // Store the token and expiry time
    localStorage.setItem('access_token', token);
    localStorage.setItem('expires_at', expiresAt);
  }
  return token
}

export const getFeed = async () => {
  if (!feed) {
    const token = await refreshToken()
    const res = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${token}`
    );
    feed = res.data.data
  }
  return feed
}

const tweets = document.querySelector('.tweets')
const main = document.querySelector('.main')

let offset = 0

// 一進入頁面及索取資料 (offset = 0)
getTweets(offset, tweets)

main.addEventListener('scroll', async (event) => {
  const target = event.target
  const clientHeight = target.clientHeight // 取得螢幕高
  const scrollHeight = target.scrollHeight // 取得卷軸全高
  const scrollTop = target.scrollTop // 取得目前卷軸高
  // 當卷軸到底時，scrollTop + clientHeight = scrollHeight

  if (scrollTop > scrollHeight - 2 * clientHeight ) {
    // 當剩餘一頁就到底部時，請求新資料
    offset += 1
    await getTweets(offset, tweets)
  }
})

function getTweets(offset, node) {
  new Promise((resolve,reject) => {
    axios.get(`${location.origin}/api/page/${offset}`)
      .then(response => {
        if (response.status !== 200) {
          reject(new Error('unable to get tweets'))
        }
        resolve(renderTweets(response.data, node))
      })
  })
}

function renderTweets(tweets, node) {
  if (!tweets.length) { return null }
  tweets.forEach(element => {
    let div = document.createElement('div')
    div.classList.add('tweet')

    div.innerHTML = `
        <a href="/users/${element.User.id}}/tweets">
          <img class="thumbnail" src="${element.User.avatar}" alt="${element.User.name} avatar">
        </a>
        <div class="postcontent">
          <a class="postuser" href="/users/${element.User.id}/tweets">
            <span class="name ellipsis">${element.User.name}</span>
            <span class="at-name ellipsis">@${element.User.account}</span>
            <span class="timer ellipsis">${element.createdAt}</span>
          </a>
          <a href="/tweets/${element.id}" class="content">
            ${element.description}
          </a>
          <div class="action">
            <button type="button" class="commenting" data-user-id="{{loginUser.id}}" data-tweet-id="${element.id}">
              <i class='comment commenting'></i>
              ${element.replyCount}
            </button>

            <form action="/tweets/${element.id}/${element.isLiked ? 'unlike' : 'like'}" method="post">
              <button type="submit" class="liking">
                <i class='like ${element.isLiked ? 'active' : ''}'></i>
                ${element.likeCount}
              </button>
            </form>
          </div>
        </div>
    `

    node.append(div)
  })
}
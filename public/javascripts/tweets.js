const tweets = document.querySelector('.tweets')
const main = document.querySelector('.main')

const userId = document.querySelector('input[name="userId"]').value

let TweetsOffset = 0

// 一進入頁面及索取資料 (offset = 0)
getTweets(TweetsOffset, tweets)

main.addEventListener('scroll', async event => {
  const target = event.target
  const clientHeight = target.clientHeight // 取得螢幕高
  const scrollHeight = target.scrollHeight // 取得卷軸全高
  const scrollTop = target.scrollTop // 取得目前卷軸高
  // 當卷軸到底時，scrollTop + clientHeight = scrollHeight

  if (scrollTop > scrollHeight - 2 * clientHeight) {
    // 當剩餘一頁就到底部時，請求新資料
    TweetsOffset += 1
    await getTweets(TweetsOffset, tweets)
  }
})

async function getTweets (offset, node) {
  try {
    const response = await window.axios.get(
      `${window.location.origin}/api/tweets/pages/${offset}`
    )
    return renderTweets(response.data, node)
  } catch (err) {
    console.error(err)
  }
}

function renderTweets (tweets, node) {
  // 已無資料時
  if (!tweets.length) {
    return null
  }

  tweets.forEach(element => {
    const div = document.createElement('div')
    div.classList.add('tweet')

    div.innerHTML = `
        <a href="/users/${element.User.id}/tweets">
          <img class="thumbnail" src="${element.User.avatar}" alt="${element.User.name} avatar">
        </a>
        <div class="post-content">
          <a class="post-user" href="/users/${element.User.id}/tweets">
            <span class="name ellipsis">${element.User.name}</span>
            <span class="at-name ellipsis">@${element.User.account}</span>
            <span class="timer ellipsis">${element.createdAt}</span>
          </a>
          <a href="/tweets/${element.id}" class="content">
            ${element.description}
          </a>
          <div class="action">
            <button type="button" class="commenting" data-user-id="${userId}" data-tweet-id="${element.id}">
              <i class="comment commenting"></i>
              <span class="comment-count">${element.replyCount}</span>
            </button>

            <button type="button" class="liking">
              <i class="like ${element.isLiked ? 'active' : ''}" data-tweet-id="${element.id}"></i>
              <sapn class="like-count">${element.likeCount}</span>
            </button>
          </div>
        </div>
    `

    node.append(div)
  })
}

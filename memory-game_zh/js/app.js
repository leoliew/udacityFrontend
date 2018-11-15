/*
 * 创建一个包含所有卡片的数组
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */
let card = document.getElementsByClassName('card')
let cards = [...card]

let deck = document.getElementById('card-deck')

let matchedCard = document.getElementsByClassName('match')

let moves = 0
let counter = document.querySelector('.moves')

const stars = document.querySelectorAll('.fa-star')

let closeButton = document.querySelector('.close')

let modal = document.getElementById('finish-popup')

// 设置计时器
let second = 0
let minute = 0
let hour = 0
let timer = document.querySelector('.timer')
let interval

// 已经打开的card
let openedCards = []

function startPlay () {
    cards = shuffle(cards)
    for (let i = 0; i < cards.length; i++) {
        deck.innerHTML = ''
        cards.forEach(item => {
            deck.appendChild(item)
        })
        cards[i].classList.remove('show', 'open', 'match', 'disabled')
    }
    // 1.重置步数为0
    moves = 0
    counter.innerHTML = moves
    // 2.重置星星数为三颗
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = '#FFD700'
        stars[i].style.visibility = 'visible'
    }
    // 3.重置时间
    second = 0
    minute = 0
    hour = 0
    let timer = document.querySelector('.timer')
    timer.innerHTML = '0 minutes 0 seconds'
    clearInterval(interval)
}

document.body.onload = startPlay()

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle (array) {
    let currentIndex = array.length, temporaryValue, randomIndex
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
}

// 显示卡片
let displayCard = function () {
    this.classList.toggle('open')
    this.classList.toggle('show')
    this.classList.toggle('disabled')
}

// 匹配卡片，同时检查是否已经全部匹配
let isMatch = function () {
    openedCards[0].classList.add('match', 'disabled')
    openedCards[1].classList.add('match', 'disabled')
    openedCards[0].classList.remove('show', 'open', 'no-event')
    openedCards[1].classList.remove('show', 'open', 'no-event')
    openedCards = []
    if (matchedCard.length === 16) {
        clearInterval(interval)
        let finalTime = timer.innerHTML
        modal.classList.add('show')
        let starRating = document.querySelector('.stars').innerHTML
        document.getElementById('finalMove').innerHTML = moves
        document.getElementById('starRating').innerHTML = starRating
        document.getElementById('totalTime').innerHTML = finalTime
        closeModal()
    }
}

// 关闭庆祝框
function closeModal () {
    closeButton.addEventListener('click', function (e) {
        modal.classList.remove('show')
        startPlay()
    })
}

// 计算总步数
let countMoveStep = function () {
    moves++
    counter.innerHTML = moves
    if (moves === 1) {
        second = 0
        minute = 0
        hour = 0
        startTimer()
    }
    if (moves > 8 && moves < 12) {
        for (let i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = 'collapse'
            }
        }
    }
    else if (moves > 13) {
        for (let i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = 'collapse'
            }
        }
    }
}

// 开始计时
function startTimer () {
    interval = setInterval(function () {
        timer.innerHTML = minute + ' minutes ' + second % 60 + ' seconds'
        second++
        minute = parseInt(second / 60)
    }, 1000)
}

// 卡片不匹配执行
let notMatch = function () {
    openedCards[0].classList.add('unmatched')
    openedCards[1].classList.add('unmatched')
    disableAllCard()
    setTimeout(function () {
        openedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched')
        openedCards[1].classList.remove('show', 'open', 'no-event', 'unmatched')
        enable()
        openedCards = []
    }, 1100)

}

// 把所有的卡片设置为不能点击
let disableAllCard = function () {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled')
    })
}

// 把剩余未匹配的卡片设置为可点击
function enable () {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled')
        for (let i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add('disabled')
        }
    })
}

// 打开卡片,在第一次进行匹配的时候开始计数器
let cardOpen = function () {
    openedCards.push(this)
    if (openedCards.length === 2) {
        countMoveStep()
        if (openedCards[0].title === openedCards[1].title) {
            isMatch()
        } else {
            console.log('not match')
            notMatch()
        }

    }
}

// 再次进行游戏
let playAgain = function () {
    modal.classList.remove('show')
    startPlay()
}

// 绑定事件
for (let i = 0; i < cards.length; i++) {
    card = cards[i]
    card.addEventListener('click', displayCard)
    card.addEventListener('click', cardOpen)
}

/*
 * 创建一个包含所有卡片的数组
 */
let card = document.querySelectorAll('.card')

let cards = [...card]

let deck = document.querySelector('.deck')

// 已经打开的card
let openedCards = []

function initData () {
    // console.log(deck)
    cards = shuffle(cards)
    // remove all exisiting classes from each card
    for (let i = 0; i < cards.length; i++) {
        deck.innerHTML = ''
        cards.forEach(item => {
            deck.appendChild(item)
        })
        cards[i].classList.remove('show', 'open', 'match', 'disabled')
    }

    // reset moves
    // moves = 0;
    // counter.innerHTML = moves;
    // reset rating
    // for (var i= 0; i < stars.length; i++){
    //     stars[i].style.color = "#FFD700";
    //     stars[i].style.visibility = "visible";
    // }
    //reset timer
    // second = 0;
    // minute = 0;
    // hour = 0;
    // var timer = document.querySelector(".timer");
    // timer.innerHTML = "0 mins 0 secs";
    // clearInterval(interval);
}

document.body.onload = initData()

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle (array) {
    var currentIndex = array.length, temporaryValue, randomIndex

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}

/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

// TODO: 开始进行游戏函数

// @description toggles open and show class to display cards
let displayCard = function () {
    this.classList.toggle('open')
    this.classList.toggle('show')
}

let isMatch = function () {

    // TODO: isMatch 将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）

    // TODO:  isMatch 函数顺带检查是否全匹配 , 显示最终分数

}

let countMoveStep = function () {

}

let notMatch = function () {

    //TODO : is NotMatch 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）

}

let cardOpen = function () {
    openedCards.push(this)
    if (openedCards.length === 2) {

        countMoveStep()
        //TODO： 在打开第一张卡片的时候开始计数器
        if (openedCards[0].title === openedCards[1].title) {
            isMatch()
        } else {
            notMatch()
        }

    }
}

// TODO: 再次进行游戏 1.把卡片设置为关闭 2.时间重置
let playAgain = function () {

}

// loop to add event listeners to each card
for (let i = 0; i < cards.length; i++) {
    card = cards[i]
    card.addEventListener('click', displayCard)
    card.addEventListener('click', cardOpen)
    // card.addEventListener("click",congratulations);
}

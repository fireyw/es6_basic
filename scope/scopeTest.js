function countSeconds(howMany) {
    for (let i = 1; i <= howMany; i++) {
        setTimeout(function () {
            cconsole.log(i)
        }, i * 1000);
    }
}

countSeconds(4);



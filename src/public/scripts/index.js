$(function(){
    $(".dropdown-menu li a").click(function(){
        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val(convertToSlug($(this).text()));
    });
    attachInvokeAPIListener();
    attachSocket();
});


function attachSocket() {
    const url = window.location;
    const webSocket = new WebSocket('ws://' + url.host + '/api/logger/socket');
    webSocket.onmessage = (event) => {
        const log = $('#log');
        log.val(log.val() + '\n' + event.data)
    }

}

function convertToSlug(value) {
    return value
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}

function disableInvokeButton() {
    $('#invoke').prop('disabled', true);
}
function enableInvokeButton() {
    $('#invoke').prop('disabled', false);
}

function validateAndGetInput() {
    const symbol = $('#symbol').val();
    if (!symbol) {
        alert('Please enter a symbol.');
        enableInvokeButton();
        return
    }
    const api = $('#api').val()
    if (!api) {
        alert('Please select an API.');
        enableInvokeButton();
        return
    }
    const bypassCache = $('#bypassCache').is(':checked');
    return { symbol, api, bypassCache }
}

function updateTimeTaken(startTime) {
    const timeTakenMs = Date.now() - startTime;
    let cssClass = 'text-success';
    if (timeTakenMs > 1000) {
        cssClass = 'text-danger'
    }
    const timeTakenString = `Response time: <p class="${cssClass}" style="font-weight: bold;display:inline">${timeTakenMs} ms</p>`;
    $('#timeTaken').html(timeTakenString);
}

function attachInvokeAPIListener() {
    $('#invoke').click(async (e) => {
        disableInvokeButton();
        const {symbol, api, bypassCache} = validateAndGetInput()
        let response;
        const startTime = Date.now();
        if (api === 'get-analysis') {
            response = await fetch('/api/finance/get/analysis?symbol=' + symbol + '&bypassCache=' + bypassCache)
        } else if (api === 'get-news') {
            response = await fetch('/api/finance/get/news?symbol=' + symbol + '&bypassCache=' + bypassCache)
        }
        const jsonResponse = JSON.parse(await response.text());
        updateTimeTaken(startTime);
        $('#response').val(JSON.stringify(jsonResponse, null, 3));
        enableInvokeButton()
    })
}

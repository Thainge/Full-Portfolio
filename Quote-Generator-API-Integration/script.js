const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//show new quote
function newQuote() {
    loading();
//pick random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //replace null author with unkown
    if (!quote.author) {
        authorText.textContent = "unkown";
    } else {
        authorText.textContent = quote.author;
    }
    //check quote length to determine size of text
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //finish loading
    quoteText.textContent = quote.text;
    complete();
}

// Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //catch error here
    }
}

//tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//share on facebook
function facebookQuote() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?text=${quoteText.textContent} - ${authorText.TextContent}`;
    window.open(facebookUrl, '_blank');
}

//listen for buttons
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
facebookBtn.addEventListener('click', facebookQuote);

//on web load
getQuotes();
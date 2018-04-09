export default {
    COMPANY_URL: inputVal => `https://api.iextrading.com/1.0/stock/${inputVal}/company`,
    PRICE_URL: inputVal => `https://api.iextrading.com/1.0/stock/${inputVal}/price`,
}

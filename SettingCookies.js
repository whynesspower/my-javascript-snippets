//    GOOGLE_REVIEW_URL: "https://www.google.com/search?q=edyoda&rlz=1C1UEAD_enIN991IN991&oq=edyoda&aqs=chrome..69i57j46i131i175i199i433i512j69i60l3j69i65j69i60l2.2244j0j7&sourceid=chrome&ie=UTF-8#lrd=0x3bae12256340d8a7:0xc9c6dfb48a7eeadd,3,,,,",
//    GOOGLE_REVIEW_DATA: 'grd',


// this function takes values two values:-
// grd and true, which searchs for cookie of if the google review form as been filled or not

const getCookieValue = (cname, forGoogle) => {
    if (cname !== undefined && cname !== null && cname !== "null" && cname.length > 0) {
        if (document.cookie.split(';').some((item) => item.trim().startsWith(cname + '='))) {
            var data = document.cookie.split(';').filter((item) => item.trim().startsWith(cname + '='));
            if (!IsListEmpty(data)) {
                var parsedDataString = data[0].split('ksd=')[1];
                var parsedDataString = forGoogle !== true ? data[0].split('ksd=')[1] : data[0].split('grd=')[1];
                var parsedData = !IsStringEmpty(parsedDataString) ? JSON.parse(parsedDataString) : null;
                return (parsedData !== null ? parsedData : false);
            }
            return false
        } else {
            return false
        }
    }
    return false;
}


// inserts a cookie with name, value and expiry day of ex days
const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


// function to call to ask customer to fill google customer review rating form
 showReviewPopup = () => {
        setTimeout(() => {
            console.log("Date 2 ", new Date())
            this.setState({ showReviewPopup: true });
        }, 15000);
    }

handleGoogleReviewPopup = () => {
        let googleCookie = getCookieValue(Constants.GOOGLE_REVIEW_DATA, true);
        const subscriptionActive = !isAccessDenied();
        // console.log("Date 1 ", new Date(), googleCookie, subscriptionActive)
        if (subscriptionActive) {
            if (googleCookie !== false) {
                if (googleCookie.reviewed !== true && googleCookie.date < Date.now()) {
                    this.showReviewPopup();
                }
            } else if (googleCookie === false) {
                this.showReviewPopup();
            }
        } else {
            this.setState({ showReviewPopup: false });
        }
    }


// if review later is clicked, google we set it in cookies
// pop up will comes after 60 seconds
reveiwLaterClicked = () => {
    setCookie(Constants.GOOGLE_REVIEW_DATA, JSON.stringify({ 'reviewed': false, 'date': Date.now() + 60 * 1000 }), 30);
    this.setState({ showReviewPopup: false });
}

// sets cookie value to true and send you to the review page url
reviewNowClicked = () => {
    this.setState({ showReviewPopup: false });
    setCookie(Constants.GOOGLE_REVIEW_DATA, JSON.stringify({ 'reviewed': true, 'date': Date.now() }), 30);
    window.open(Constants.GOOGLE_REVIEW_URL, '_blank');
}



{
    this.state.showReviewPopup
        ? <GoogleReviewPopup
            show={this.state.showReviewPopup}
            reveiwLaterClicked={this.reveiwLaterClicked}
            reviewNowClicked={this.reviewNowClicked}
            />
            : null
}


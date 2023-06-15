//  FIREBASE_GOOGLE_REVIEW_POPUP_LOGS_URL: 'https://<company>-subacriptions-default-rtdb.asia-southeast1.firebasedatabase.app/google-review-popup-logs.json',
// add data to the realtime firebase database for Customer success 

logDataOnFirebase = (action) => {
        let data = {};
        data['Email'] = GetFromLocalStorage(Constants.KEY_EMAIL);
        data['Contact'] = GetFromLocalStorage(Constants.KEY_PHONE_NUMBER);
        data['Action'] = action;
        data['Date'] = new Date().toString();
        data['PageURL'] = window.location.pathname;
        data['Device'] = this.deviceType();
        Axios.post(Constants.FIREBASE_GOOGLE_REVIEW_POPUP_LOGS_URL, data);
}

// get device type of the user
deviceType = () => {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "Tablet";
        }
        else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return "Mobile";
        }
        return "Desktop";
};


reveiwLaterClicked = (action) => {
        this.logDataOnFirebase(action);
        setCookie(Constants.GOOGLE_REVIEW_DATA, JSON.stringify({ 'reviewed': false, 'date': Date.now() + 60 * 1000 }), 30);
        this.setState({ showReviewPopup: false });
    }

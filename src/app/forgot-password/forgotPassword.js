"use client"
import Script from "next/script";
import { useEffect } from "react";
import { API_ROOT, BRAND_WCB, COMPANY_ID, COUNTRY_US, FORGOT_PASSWORD_POLICY_ID, METHOD_GET, PING_RUN_FLOW, SK_API_KEY, SK_GET_TOKEN_URL } from "@/util/constant";

export default function ForgotPassword(props) {
    useEffect(function () {

        //*** Add the API Key from your DaVinci application. ***/
        var headers = new Headers();
        headers.append("X-SK-API-KEY", SK_API_KEY);

        const requestOptions = {
            method: METHOD_GET,
            headers: headers,
            redirect: "follow",
        };

        //*** Get URL string parameters***/
        let queryString = window.location.search.trim().length > 0 ? decodeURIComponent(window.location.search) : "";

        //*** Ensure if query string has return url if not redirect back to account ***/
        queryString = queryString.indexOf("/") >= 0 ? queryString.substr(queryString.indexOf("=") + 1) : "/account";

        //queryString
        console.log(`queryString = ${queryString}`);

        //*** Retrieve SK Token ***/
        fetch(SK_GET_TOKEN_URL, requestOptions)
            .then((response) => response.json())
            .then((responseData) => {
                var props = {
                    config: {
                        method: PING_RUN_FLOW,
                        apiRoot: API_ROOT,
                        accessToken: responseData.access_token,
                        companyId: COMPANY_ID,
                        policyId: FORGOT_PASSWORD_POLICY_ID,
                        parameters: {
                            "redirectUrl": queryString,
                            "brand": BRAND_WCB,
                            "country": COUNTRY_US
                        }
                    },
                    useModal: false,
                    successCallback,
                    errorCallback,
                    onCloseModal,
                };
                /*** Invoke the Widget ****/
                // console.log(props);
                setTimeout(function () {
                    document.getElementById("loader").style.display = 'none';
                }, 1500);

                if (davinci) {
                    davinci.skRenderScreen(
                        document.getElementsByClassName("skWidget")[0],
                        props
                    );
                }
            })
            .catch((error) => {
                console.log('error while running flow ', error);
                if (error && error.errorMessage === "Unauthorized!" || (error && error.httpResponseCode === 401)) {
                    window.location.reload();
                }
            });

        function successCallback(response) {
            console.log(response, "additional properties");
            let multipassURL = response?.additionalProperties?.multipassURL;
            setTimeout(() => {
                window.location.href = multipassURL;
            }, 100);
        }

        function errorCallback(error) {
            console.log('error while running flow ', error);
            if (error && error.httpResponseCode === 401 && error.errorMessage === "Unauthorized!") {
                window.location.reload();
            }
        }

        function onCloseModal() {
            console.log("onCloseModal");
        }
    })
    return (
        <div id="ping-container">
            <Script type="text/javascript" src="https://assets.pingone.com/davinci/latest/davinci.js" />
            <div className="loader" id="loader"></div>
            <div id="widget" className="skWidget"></div>
        </div>
    );
}

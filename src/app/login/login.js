"use client"
import Script from "next/script";
import { useEffect } from "react";
import { apiRoot, companyId, login_policyId, method_GET,skApiKey, skGetTokenUrl } from "@/util/constant";

export default function Login(props) {

  useEffect(() => {
    //*** Add the API Key from your DaVinci application. ***/
    var headers = new Headers();
    headers.append("X-SK-API-KEY", skApiKey);

    const requestOptions = {
      method:  method_GET,
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
    fetch(skGetTokenUrl, requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(`responseData : ${responseData}`);
        var props = {
          config: {
            method: "runFlow",
            apiRoot: apiRoot,
            accessToken: responseData.access_token,
            companyId: companyId,
            policyId: login_policyId,
            parameters: {
              "redirectUrl": queryString,
              "brand": "WCB",
              "country": "US"
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

        davinci.skRenderScreen(
          document.getElementsByClassName("skWidget")[0],
          props
        )
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

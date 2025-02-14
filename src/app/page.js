"use client"
import Script from "next/script";
import { useEffect } from "react";

export default function Home() {
  //*** Populate the parameters below from your DaVinci environment ***/
  const companyId = "2422107b-7011-48bb-8366-735e927271f2";

  const skApiKey =
    "67325a24e28d69f37f5c49a66cfe4771d5ad368e0a7641c20b099418f69fcc28bfaf7bd2e0d2c0ef5f0eb42e722efd2354b2b4d6ef67c1f5426dc39ba3af8180b5e8ef2007e596822ce0d31a037baa0b674c7468e7a1ed7628cfdfecb8ecce5db58597dbab62944c0f431ef8fe94797f9968f0980678bd610973d25df2e34c13";

  //*** Build the get SK Token URL. ***/
  const skGetTokenUrl =
    `https://orchestrate-api.pingone.com/v1/company/${companyId}/sdktoken`;


  //*** Add the API Key from your DaVinci application. ***/
  var headers = new Headers();
  headers.append("X-SK-API-KEY", skApiKey);

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  let queryString = "";
  //queryString
  console.log(`queryString = ${queryString}`);

  useEffect(() => {
    fetch(skGetTokenUrl, requestOptions).then((response) => response.json)
      .then((responseData) => {
        const props = {
          config: {
            method: "runFlow",
            apiRoot: "https://auth.pingone.com/",
            accessToken: responseData.access_token,
            companyId: companyId,
            policyId: "eaaacbd2b5dc514e3bedb6e1b3e4e571",
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
        setTimeout(function () {
          document.getElementById("loader").style.display = 'none';
        }, 1500);

        davinci.skRenderScreen(
          document.getElementsByClassName("skWidget")[0],
          props
        );
      })
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
      <h2>ping container</h2>
      <Script type="text/javascript" src="https://assets.pingone.com/davinci/latest/davinci.js" />
      <div className="loader" id="loader"></div>
      <div id="widget" className="skWidget"></div>
    </div>
  );
}

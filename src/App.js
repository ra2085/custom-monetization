/**
 * Created by Looker Data Applications Team
 * 2021
 */
import React, { useState, useEffect } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ComponentsProvider, Heading, Span } from "@looker/components";
import { SDK } from "./pblsession";
import "./styles.css";

const base_url = "https://dat.dev.looker.com:19999";
const token_endpoint =
  "https://us-central1-pbl-demo-2020-281322.cloudfunctions.net/retrieve-access-token-node-data-dev-looker";

let sdk = SDK({ base_url, token_endpoint });

export default function App() {
  return (
    <div id="App">
      <ComponentsProvider>
        <Heading>Looker Embed</Heading>
        <Embed />
      </ComponentsProvider>
    </div>
  );
}

function Embed() {
  const [dashboardEmbedded, setDashboardEmbedded] = useState(false);
  useEffect(() => {
    createUrlAndEmbedDashboard();
  }, []); //onload

  let createUrlAndEmbedDashboard = async () => {
    const embed_url = await sdk.ok(
      sdk.create_embed_url_as_me({
        target_url: `https://dat.dev.looker.com/embed/dashboards-next/8?embed_domain=${document.location.origin}&sdk=2`
      })
    );

    LookerEmbedSDK.init("https://dat.dev.looker.com");
    LookerEmbedSDK.createDashboardWithUrl(embed_url.url)
      .appendTo(document.getElementById("App"))
      .withClassName("embeddedDashboard")
      .on("look:run:complete", () => console.log("hey!!"))
      .build()
      .connect()
      .then((dashboard) => {
        setDashboardEmbedded(true);
      });
  };
  return <div id="EmbedContainer"></div>;
}

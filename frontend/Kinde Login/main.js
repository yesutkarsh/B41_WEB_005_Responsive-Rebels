import createKindeClient from "https://cdn.jsdelivr.net/npm/@kinde-oss/kinde-auth-pkce-js/dist/kinde-auth-pkce-js.esm.js";

const initKinde = async () => {
  const kinde = await createKindeClient({
    client_id: "1765f537fd0c46ebb3068101b575046e",
    domain: "https://algovision.kinde.com",
    redirect_uri: window.location.origin,
  });

  document.getElementById("register").addEventListener("click", async () => {
    await kinde.register();
    console.log("Registered");
  });
};

initKinde();

import React from "react";
import { ConnectButton, useCurrentAccount } from "@iota/dapp-kit";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ConnectButton />
      </header>
      <ConnectedAccount />
    </div>
  );
}
function ConnectedAccount() {
  const account = useCurrentAccount();

  if (!account) {
    return null;
  }

  return <div>Connected to {account.address}</div>;
}

export default App;

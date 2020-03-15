const appRoot = document.getElementById("app");

let toggled = false;
const onToggle = () => {
   toggled = !toggled;
   renderApp();
};

const renderApp = () => {
   const jsx = (
      <div>
         <h1>Visibility Toggle</h1>
         <button onClick={onToggle}>
            {toggled ? "Hide details" : "Show details"}
         </button>
         {toggled && <p>Hey, These are some details you can now see!</p>}
      </div>
   );

   ReactDOM.render(jsx, appRoot);
};

renderApp();

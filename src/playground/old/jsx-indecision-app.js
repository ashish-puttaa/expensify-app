console.log("App.js is up and running!");

// JSX - JavaScript XML

const app = {
   title: "Indecistion Application",
   subtitle: "This is my JSX Temporary Subtitle !!",
   options: []
};

const onFormSubmit = e => {
   e.preventDefault();

   const option = e.target.elements.option.value;

   if (option) {
      app.options.push(option);
      e.target.elements.option.value = "";
      renderApp();
   }
};

const onMakeDecision = () => {
   const randomNum = Math.floor(Math.random() * app.options.length);
   const option = app.options[randomNum];

   alert(option);
};

const onRemoveAll = () => {
   app.options = [];
   renderApp();
};

const appRoot = document.getElementById("app");

const renderApp = () => {
   const templateJSX = (
      <div>
         <h1 id="headingOne">{app.title}</h1>
         {app.subtitle && <p>Subtitle: {app.subtitle}</p>}
         <p>
            {(app.options && app.options.length) > 0
               ? "Here are your options"
               : "No options available"}
         </p>
         <button disabled={app.options.length === 0} onClick={onMakeDecision}>
            What should I do?
         </button>
         <button onClick={onRemoveAll}>Remove All</button>
         <ol>
            {app.options.map(option => (
               <li key={option}>{option}</li>
            ))}
         </ol>
         <form onSubmit={onFormSubmit}>
            <input type="text" name="option" />
            <button>Add Option</button>
         </form>
      </div>
   );

   ReactDOM.render(templateJSX, appRoot);
};

renderApp();

class IndecisionApp extends React.Component {
   constructor(props) {
      super(props);

      this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
      this.handlePick = this.handlePick.bind(this);
      this.handleAddOption = this.handleAddOption.bind(this);

      this.state = {
         options: []
      };
   }

   handleDeleteOptions() {
      this.setState(() => {
         return {
            options: []
         };
      });
   }

   handleAddOption(option) {
      if (!option) {
         return 'Enter valid value to Add Item!';
      } else if (this.state.options.indexOf(option) > -1) {
         return 'Item already exists!';
      }

      this.setState(prevState => {
         return {
            options: prevState.options.concat(option)
         };
      });
   }

   handlePick() {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];
      alert(option);
   }

   render() {
      const title = 'Indecision';
      const subtitle = 'Put your life in the hands of a computer.';

      return (
         <div>
            <Header title={title} subtitle={subtitle} />
            <Action
               hasOptions={this.state.options.length > 0}
               handlePick={this.handlePick}
            />
            <Options
               options={this.state.options}
               handleDeleteOptions={this.handleDeleteOptions}
            />
            <AddOption handleAddOption={this.handleAddOption} />
         </div>
      );
   }
}

class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>{this.props.title}</h1>
            <h2>{this.props.subtitle}</h2>
         </div>
      );
   }
}

class Action extends React.Component {
   handlePick() {
      alert('handlePick fired!');
   }

   render() {
      return (
         <div>
            <button
               onClick={this.props.handlePick}
               disabled={!this.props.hasOptions}
            >
               What should I do?
            </button>
         </div>
      );
   }
}

class Options extends React.Component {
   render() {
      return (
         <div>
            <p>
               {this.props.options.length > 0
                  ? 'Here are your options!'
                  : 'No options available.'}
            </p>
            <button onClick={this.props.handleDeleteOptions}>Remove All</button>
            {this.props.options.map(option => (
               <Option key={option} optionText={option} />
            ))}
         </div>
      );
   }
}

class Option extends React.Component {
   render() {
      return <div>{this.props.optionText}</div>;
   }
}

class AddOption extends React.Component {
   constructor(props) {
      super(props);
      this.handleAddOption = this.handleAddOption.bind(this);

      this.state = {
         error: undefined
      };
   }
   handleAddOption(e) {
      e.preventDefault();

      const option = e.target.elements.option.value;

      const error = this.props.handleAddOption(option);

      this.setState(() => {
         return { error };
      });

      e.target.elements.option.value = '';
   }

   render() {
      return (
         <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.handleAddOption}>
               <input type="text" name="option" />
               <button>Add Option</button>
            </form>
         </div>
      );
   }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

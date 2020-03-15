class VisibilityToggle extends React.Component {
   constructor(props) {
      super(props);

      this.handleToggle = this.handleToggle.bind(this);

      this.state = {
         toggled: false
      };
   }

   handleToggle() {
      this.setState(prevState => {
         return {
            toggled: !prevState.toggled
         };
      });
   }

   render() {
      return (
         <div>
            <h1>Visibility Toggle</h1>
            <button onClick={this.handleToggle}>
               {true ? 'Hide Details' : 'Show details'}
            </button>
            {this.state.toggled && (
               <p>Hey, These are some details you can see!</p>
            )}
         </div>
      );
   }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));

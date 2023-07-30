

class LiveSessionsDetails extends PureComponent {

// this this ref tag at the top when you just create tehe 
  sectionRef = React.createRef();
  handleItemClick = () => {
    window.scrollTo({ top: this.sectionRef.current.offsetTop-80, behavior: "smooth" })
    // this.sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }; 

  this.handleItemClick();


   <div ref={this.sectionRef} className={classes.ContentSection}>
           
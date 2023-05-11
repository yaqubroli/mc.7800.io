const getClassName = (elementName, mode, characteristics, tendencies) => {
    let className = elementName + " " + elementName + "-" + mode;
    if (characteristics) {
      className += " " + elementName + "-characteristics";
    }
    if (tendencies) {
      className += " " + elementName + "-tendencies";
    }
    return className;
  };
  
export default getClassName;
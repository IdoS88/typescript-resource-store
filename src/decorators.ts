function isAnInteger(target: any, name: string | Symbol, position: number) {
        if(!Number.isInteger(target))
            throw new Error("index must be an integer");
  }
  function isUndefined(target: any, name: string | Symbol, position: number) {
    if(target == "undefined")
        throw new Error("borrowed amount cannot be undefined");
}
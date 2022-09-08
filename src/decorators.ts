function isAnInteger(target: any, name: string | Symbol, position: number) {
        if(!Number.isInteger(target))
            throw new Error("index must be an integer");
  }